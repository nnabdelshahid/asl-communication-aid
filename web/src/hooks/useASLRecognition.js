import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

export const useASLRecognition = (videoRef, isActive) => {
  const [prediction, setPrediction] = useState('None');
  const [sentence, setSentence] = useState('');
  const modelRef = useRef(null);
  const detectorRef = useRef(null);
  const lastPredictionRef = useRef('');
  const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'space', 'delete', 'nothing'];

  useEffect(() => {
    const loadModels = async () => {
      try {
        // For MVP, we'll use a simple rule-based classifier for a few letters
        // In production, load a trained TF.js model: modelRef.current = await tf.loadLayersModel('/model/model.json');
        console.log('ASL Recognition: Using rule-based classifier for demo (A, L, V)');

        // Load MediaPipe HandLandmarker
        const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm');
        detectorRef.current = await HandLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task' },
          numHands: 1,
          runningMode: 'VIDEO'
        });
      } catch (error) {
        console.error('Error loading ASL recognition models:', error);
      }
    };
    loadModels();
  }, []);

  // Simple rule-based classifier for demo (can recognize A, L, V)
  const classifyGesture = (landmarks) => {
    if (!landmarks || landmarks.length < 21) return 'nothing';

    // Extract key points
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];
    const wrist = landmarks[0];

    // Simple heuristics
    // A: All fingers closed, thumb to side
    const fingersClosed = indexTip.y > landmarks[6].y && middleTip.y > landmarks[10].y && ringTip.y > landmarks[14].y && pinkyTip.y > landmarks[18].y;
    const thumbSide = thumbTip.x < wrist.x + 0.1;
    if (fingersClosed && thumbSide) return 'A';

    // L: Index and thumb extended, others closed
    const indexExtended = indexTip.y < landmarks[6].y;
    const middleClosed = middleTip.y > landmarks[10].y;
    const thumbExtended = thumbTip.x > wrist.x;
    if (indexExtended && middleClosed && thumbExtended) return 'L';

    // V: Index and middle extended, others closed
    const middleExtended = middleTip.y < landmarks[10].y;
    const ringClosed = ringTip.y > landmarks[14].y;
    if (indexExtended && middleExtended && ringClosed) return 'V';

    return 'nothing';
  };

  useEffect(() => {
    if (!isActive || !videoRef.current || !detectorRef.current) return;

    let animationId;
    const predictLoop = async () => {
      try {
        const results = await detectorRef.current.detectForVideo(videoRef.current, performance.now());
        if (results.landmarks && results.landmarks.length > 0) {
          const landmarks = results.landmarks[0];
          let letter;

          if (modelRef.current) {
            // TF.js model inference (when available)
            const flat = landmarks.flatMap(p => [p.x, p.y, p.z]);
            const input = tf.tensor([flat]);
            const pred = modelRef.current.predict(input);
            const index = pred.argMax(-1).dataSync()[0];
            letter = labels[index];
            input.dispose();
            pred.dispose();
          } else {
            // Rule-based for demo
            letter = classifyGesture(landmarks);
          }

          setPrediction(letter);

          // Build sentence (avoid rapid repeats)
          if (letter !== lastPredictionRef.current && letter !== 'nothing') {
            setSentence(prev => prev + letter);
            lastPredictionRef.current = letter;
          }
        } else {
          setPrediction('No hand detected');
        }
      } catch (error) {
        console.error('Prediction error:', error);
      }

      if (isActive) {
        animationId = requestAnimationFrame(predictLoop);
      }
    };

    predictLoop();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isActive]);

  return { prediction, sentence };
};