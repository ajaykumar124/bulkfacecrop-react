import { useState, useEffect } from 'react';
import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision';

export function useFaceDetector() {
  const [faceDetector, setFaceDetector] = useState(null);
  const [isDetectorLoaded, setIsDetectorLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let detector = null;
    let isMounted = true;

    async function initializeFaceDetector() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        
        detector = await FaceDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
            delegate: "GPU"
          },
          runningMode: "IMAGE"
        });
        
        if (isMounted) {
          setFaceDetector(detector);
          setIsDetectorLoaded(true);
        }
      } catch (err) {
        console.error("Error loading Face Detector:", err);
        if (isMounted) {
          setError("Error loading AI model. Check console.");
        }
      }
    }

    initializeFaceDetector();

    return () => {
      isMounted = false;
      if (detector) {
        detector.close();
      }
    };
  }, []);

  return { faceDetector, isDetectorLoaded, error };
}
