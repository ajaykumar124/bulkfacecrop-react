import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import DropZone from '../components/DropZone';
import StatusArea from '../components/StatusArea';
import ActionBar from '../components/ActionBar';
import PreviewGrid from '../components/PreviewGrid';

export default function A4Fit() {
  const [processedFiles, setProcessedFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  
  const currentZipRef = useRef(null);
  const currentZipNameRef = useRef("a4_fitted_photos.zip");

  const handleFilesSelected = async (files) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      alert("No valid image files found.");
      return;
    }

    if (!currentZipRef.current) {
      currentZipRef.current = new JSZip();
      currentZipNameRef.current = "a4_fitted_photos.zip";
      if (imageFiles[0].webkitRelativePath) {
        const parts = imageFiles[0].webkitRelativePath.split('/');
        if (parts.length > 1) {
          currentZipNameRef.current = `Multi_Folders_A4.zip`;
        }
      }
    }

    setIsProcessing(true);
    setHasProcessed(false);
    setProgress(0);
    setStatusText(`Processing 0 of ${imageFiles.length} (Batch)...`);

    const newProcessedFiles = [...processedFiles];

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const blob = await processImage(file);
      
      if (blob) {
        newProcessedFiles.push({ name: file.name, blob });
        currentZipRef.current.file(file.name, blob);
      }
      
      setProgress(((i + 1) / imageFiles.length) * 100);
      setStatusText(`Processing ${i + 1} of ${imageFiles.length}...`);
      
      setProcessedFiles([...newProcessedFiles]);
    }

    setStatusText(`Successfully processed ${newProcessedFiles.length} images!`);
    setIsProcessing(false);
    setHasProcessed(true);
  };

  const processImage = async (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = async () => {
        let resultBlob = null;
        try {
          resultBlob = await fitToA4(img);
        } catch (err) {
          console.error(`Error processing ${file.name}:`, err);
        }
        URL.revokeObjectURL(img.src);
        resolve(resultBlob);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const fitToA4 = async (img) => {
    return new Promise((resolve) => {
      const a4Width = 2480;
      const a4Height = 3508;
      
      const canvas = document.createElement('canvas');
      canvas.width = a4Width;
      canvas.height = a4Height;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, a4Width, a4Height);
      
      const scaleX = a4Width / img.width;
      const scaleY = a4Height / img.height;
      const scale = Math.min(scaleX, scaleY);
      
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      
      const x = (a4Width - scaledWidth) / 2;
      const y = (a4Height - scaledHeight) / 2;
      
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
      
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.95);
    });
  };

  const handleClear = () => {
    setProcessedFiles([]);
    currentZipRef.current = null;
    currentZipNameRef.current = "a4_fitted_photos.zip";
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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">A4 Fit Utility</h1>
        <p className="text-text-muted text-[1.1rem]">Instantly center and pad your images onto a standard A4 canvas for printing.</p>
      </header>

      <section className="bg-panel-bg backdrop-blur-[16px] border border-panel-border rounded-3xl p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex flex-col gap-5 animate-fade-in-up">
        <DropZone onFilesSelected={handleFilesSelected} />

        <StatusArea 
          isHidden={!isProcessing && !hasProcessed} 
          progress={progress} 
          statusText={statusText} 
        />

        <ActionBar 
          isHidden={!hasProcessed} 
          onClear={handleClear} 
          onDownload={handleDownload} 
        />
      </section>

      <PreviewGrid 
        isHidden={processedFiles.length === 0} 
        processedFiles={processedFiles} 
      />
    </>
  );
}
