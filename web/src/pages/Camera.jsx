import React, { useRef, useState, useEffect } from 'react';
import { useASLRecognition } from '../hooks/useASLRecognition';

export default function Camera() {
  const videoRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const { prediction, sentence } = useASLRecognition(videoRef, isActive);

  useEffect(() => {
    // Request camera permission on mount
    const requestCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (error) {
        console.error('Camera access denied:', error);
        setHasPermission(false);
      }
    };

    requestCamera();

    return () => {
      // Cleanup stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const toggleRecognition = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <h2>Camera - ASL Recognition</h2>
      <p>Point your camera at your hand to recognize ASL letters (demo supports A, L, V).</p>

      {!hasPermission && (
        <p style={{ color: 'red' }}>Camera permission required. Please allow camera access.</p>
      )}

      <div style={{ position: 'relative', width: '100%', maxWidth: 640, margin: '20px 0' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: 8,
            background: '#000'
          }}
        />
        {isActive && (
          <div style={{
            position: 'absolute',
            top: 10,
            left: 10,
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: 4,
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            Detected: {prediction}
          </div>
        )}
      </div>

      <div style={{ marginBottom: 20 }}>
        <button
          onClick={toggleRecognition}
          disabled={!hasPermission}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            background: isActive ? '#ff4444' : '#44aa44',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          {isActive ? 'Stop Recognition' : 'Start ASL Recognition'}
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Recognized Text:</h3>
        <div style={{
          minHeight: 50,
          padding: 10,
          border: '1px solid #ccc',
          borderRadius: 4,
          background: '#f9f9f9',
          fontSize: '18px',
          wordWrap: 'break-word'
        }}>
          {sentence || 'Start recognition to see text here...'}
        </div>
        <button
          onClick={() => setSentence('')}
          style={{
            marginTop: 10,
            padding: '5px 10px',
            background: '#666',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Clear Text
        </button>
      </div>

      <div style={{ marginTop: 20, fontSize: '14px', color: '#666' }}>
        <p><strong>Note:</strong> This is an MVP demo using rule-based recognition for letters A, L, V. For full alphabet recognition, a trained ML model is needed.</p>
        <p>To train a model: Download ASL Alphabet dataset from Kaggle, extract MediaPipe landmarks, train a Keras model, and convert to TensorFlow.js.</p>
      </div>
    </div>
  );
}