import React, { useEffect, useRef, useState } from 'react';
import { useASLRecognition } from '../hooks/useASLRecognition';

export default function Camera() {
  const videoRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [permissionState, setPermissionState] = useState('pending');
  const { clearSentence, prediction, sentence } = useASLRecognition(videoRef, isActive);

  useEffect(() => {
    let stream;

    const requestCamera = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissionState('unsupported');
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setPermissionState('granted');
      } catch (error) {
        setPermissionState('denied');
      }
    };

    requestCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const canUseCamera = permissionState === 'granted';

  return (
    <section className="tool-page" aria-labelledby="camera-title">
      <div className="page-heading">
        <p className="eyebrow">Live recognition</p>
        <h1 id="camera-title">Camera</h1>
        <p>Point your hand at the camera to test the current A, L, and V recognition demo.</p>
      </div>

      <div className="camera-layout">
        <div className="camera-panel">
          <video ref={videoRef} autoPlay playsInline muted aria-label="Camera preview" />
          {isActive && <span className="detected-badge">Detected: {prediction}</span>}
        </div>

        <aside className="recognition-panel" aria-live="polite">
          <h2>Recognized text</h2>
          <div className="sentence-box">{sentence || 'Start recognition to build text here.'}</div>
          <div className="button-row">
            <button type="button" onClick={() => setIsActive((active) => !active)} disabled={!canUseCamera}>
              {isActive ? 'Stop recognition' : 'Start recognition'}
            </button>
            <button type="button" className="secondary-button" onClick={clearSentence} disabled={!sentence}>
              Clear text
            </button>
          </div>
          {permissionState === 'denied' && (
            <p className="notice notice--error">Camera permission is blocked. Allow camera access to test recognition.</p>
          )}
          {permissionState === 'unsupported' && (
            <p className="notice notice--error">This browser does not support camera access.</p>
          )}
          {permissionState === 'pending' && <p className="notice">Waiting for camera permission...</p>}
        </aside>
      </div>
    </section>
  );
}
