import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useFaceDetector } from '../hooks/useFaceDetector';
import SettingsBar from '../components/SettingsBar';
import DropZone from '../components/DropZone';
import StatusArea from '../components/StatusArea';
import ActionBar from '../components/ActionBar';
import PreviewGrid from '../components/PreviewGrid';
import Toast from '../components/Toast';

const TARGET_ASPECT_RATIO = 7 / 9;

export default function Home() {
  const { faceDetector, isDetectorLoaded, error } = useFaceDetector();
  
  const [mode, setMode] = useState('crop');
  const [targetKb, setTargetKb] = useState(50);
  const [format, setFormat] = useState('0.7777');
  const [padding, setPadding] = useState(40);
  
  const [processedFiles, setProcessedFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Loading AI Model...");
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [eta, setEta] = useState(undefined);
  const [toast, setToast] = useState({ message: '', type: 'error' });
  
  const currentZipRef = useRef(null);
  const currentZipNameRef = useRef("cropped_photos.zip");

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
  };

  const handleFilesSelected = async (files) => {
    if (!isDetectorLoaded) {
      showToast("Please wait for the AI model to finish loading.");
      return;
    }

    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      showToast("No valid image files found.");
      return;
    }

    if (!currentZipRef.current) {
      currentZipRef.current = new JSZip();
      currentZipNameRef.current = "cropped_photos.zip";
      if (imageFiles[0].webkitRelativePath) {
        const parts = imageFiles[0].webkitRelativePath.split('/');
        if (parts.length > 1) {
          currentZipNameRef.current = `Multi_Folders_Cropped.zip`;
        }
      }
    }

    setIsProcessing(true);
    setHasProcessed(false);
    setProgress(0);
    setEta(undefined);
    setStatusText(`Processing 0 of ${imageFiles.length} (Batch)...`);

    const newProcessedFiles = [...processedFiles];
    const startTime = Date.now();

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const result = await processImage(file);
      
      if (result) {
        newProcessedFiles.push(result);
        currentZipRef.current.file(result.name, result.blob);
      }
      
      setProgress(((i + 1) / imageFiles.length) * 100);
      
      // Calculate ETA
      const elapsed = Date.now() - startTime;
      const avgTimePerImage = elapsed / (i + 1);
      const remainingImages = imageFiles.length - (i + 1);
      const etaSeconds = Math.ceil((avgTimePerImage * remainingImages) / 1000);
      setEta(etaSeconds);

      setStatusText(`Processing ${i + 1} of ${imageFiles.length}...`);
      
      // Update state incrementally for preview grid
      setProcessedFiles([...newProcessedFiles]);
    }

    setStatusText(`Successfully processed ${newProcessedFiles.length} images!`);
    setIsProcessing(false);
    setHasProcessed(true);
    showToast(`Successfully processed ${newProcessedFiles.length} images!`, 'success');
  };

  const processImage = async (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = async () => {
        let resultBlob = null;
        try {
          if (mode === 'compress') {
            resultBlob = await compressImage(img, targetKb);
          } else {
            const detections = faceDetector.detect(img);
            if (detections.detections.length > 0) {
              const face = detections.detections[0];
              resultBlob = await cropFace(img, face.boundingBox, mode === 'both' ? targetKb : null);
            } else {
              showToast(`No face detected in ${file.name}`);
            }
          }
        } catch (err) {
          console.error(`Error processing ${file.name}:`, err);
        }
        URL.revokeObjectURL(img.src);
        
        if (resultBlob) {
          const sizeKb = (resultBlob.size / 1024).toFixed(1);
          resolve({
            name: file.name,
            blob: resultBlob,
            originalBlob: file,
            sizeKb
          });
        } else {
          resolve(null);
        }
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const compressToTargetKb = async (canvas, targetKb) => {
    if (!targetKb) {
      return new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.95));
    }

    const targetBytes = targetKb * 1024;
    const getBlob = (quality) => new Promise(res => canvas.toBlob(res, 'image/jpeg', quality));
    
    const initialBlob = await getBlob(0.95);
    if (initialBlob.size <= targetBytes) return initialBlob;

    let minQ = 0.05;
    let maxQ = 0.95;
    let bestValidBlob = null;
    
    for (let i = 0; i < 7; i++) {
      const q = (minQ + maxQ) / 2;
      const blob = await getBlob(q);
      
      if (blob.size <= targetBytes) {
        bestValidBlob = blob;
        minQ = q;
      } else {
        maxQ = q;
      }
    }
    
    return bestValidBlob || await getBlob(0.05);
  };

  const compressImage = async (img, targetKb) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    return await compressToTargetKb(canvas, targetKb);
  };

  const cropFace = async (img, bbox, targetKb) => {
    const paddingFactor = padding / 100;
    const targetAspectRatio = parseFloat(format);
    
    const faceCenterX = bbox.originX + (bbox.width / 2);
    const faceCenterY = bbox.originY + (bbox.height / 2);
    const faceSize = Math.max(bbox.width, bbox.height);
    
    const scale = 1.5 + (paddingFactor * 2.5); 
    let cropHeight = faceSize * scale;
    let cropWidth = cropHeight * targetAspectRatio;
      
      const cropCenterY = faceCenterY - (faceSize * 0.2);
      const sourceX = faceCenterX - (cropWidth / 2);
      const sourceY = cropCenterY - (cropHeight / 2);

      const canvas = document.createElement('canvas');
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.drawImage(
        img,
        sourceX, sourceY, cropWidth, cropHeight,
        0, 0, cropWidth, cropHeight
      );
      
      return await compressToTargetKb(canvas, targetKb);
  };

  const handleClear = () => {
    setProcessedFiles([]);
    currentZipRef.current = null;
    currentZipNameRef.current = "cropped_photos.zip";
    setIsProcessing(false);
    setHasProcessed(false);
  };

  const handleDownload = () => {
    if (currentZipRef.current && processedFiles.length > 0) {
      currentZipRef.current.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, currentZipNameRef.current);
      });
    }
  };

  return (
    <>
      <header className="text-center animate-fade-in-up">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">Face Crop AI</h1>
        <p className="text-text-muted text-sm md:text-base">The fastest way to bulk process your photos. 100% on-device for maximum privacy.</p>
      </header>

      <section className="bg-panel-bg backdrop-blur-[16px] border border-panel-border rounded-3xl p-4 md:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex flex-col md:flex-row gap-6 items-stretch animate-fade-in-up">
        
        {/* Left Column: Settings Sidebar */}
        <div className="w-full md:w-[320px] shrink-0 flex flex-col">
          <SettingsBar 
            mode={mode} setMode={setMode}
            targetKb={targetKb} setTargetKb={setTargetKb}
            format={format} setFormat={setFormat} 
            padding={padding} setPadding={setPadding} 
          />
        </div>

        {/* Right Column: Action Area */}
        <div className="flex-1 flex flex-col gap-4 h-full">
          {(!isProcessing && !hasProcessed) && (
            <DropZone onFilesSelected={handleFilesSelected} />
          )}

          <StatusArea 
            isHidden={!isProcessing && !hasProcessed} 
            progress={progress} 
            statusText={statusText} 
            eta={eta}
          />

          <ActionBar 
            isHidden={!hasProcessed} 
            onClear={handleClear} 
            onDownload={handleDownload} 
          />
          
          <PreviewGrid 
            isHidden={processedFiles.length === 0} 
            processedFiles={processedFiles} 
          />
        </div>
      </section>

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'error' })} 
      />
    </>
  );
}
