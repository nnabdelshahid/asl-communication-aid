import React, { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations, Html } from '@react-three/drei'

function ModelPlayer({ src = '/models/avatar.glb' }) {
  const group = useRef()
  const { scene, animations } = useGLTF(src)
  const { actions, names, mixer } = useAnimations(animations, group)
  const [current, setCurrent] = useState(names[0] || null)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  useEffect(() => {
    if (!current || !actions) return
    // stop all then play selected
    Object.values(actions).forEach(a => a.stop())
    const action = actions[current]
    if (action) {
      action.reset()
      action.play()
      action.timeScale = speed
      setPlaying(true)
    }
    return () => {
      // cleanup
    }
  }, [current])

  useEffect(() => {
    if (!names || !actions) return
    if (current && actions[current]) actions[current].timeScale = speed
  }, [speed])

  useEffect(() => {
    // pause/play toggle
    if (!current || !actions) return
    if (playing) actions[current].play()
    else actions[current].paused = true
  }, [playing])

  useEffect(() => {
    return () => {
      // dispose mixer when unmounting
      if (mixer) mixer.stopAllAction()
    }
  }, [])

  return (
    <div style={{ width: '100%', height: 600, borderRadius: 8, overflow: 'hidden', background: '#111' }}>
      <Canvas camera={{ position: [0, 1.6, 3], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 7]} intensity={1} />
        <group ref={group} dispose={null}>
          <primitive object={scene} />
        </group>
        <OrbitControls />
      </Canvas>

      <div style={{ padding: 12, background: '#fff', display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontWeight: 600 }}>Animation</label>
          <select
            value={current || ''}
            onChange={e => setCurrent(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: 6 }}
          >
            <option value="">-- none --</option>
            {names && names.map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600 }}>Speed</label>
          <input
            type="range"
            min="0.25"
            max="2"
            step="0.05"
            value={speed}
            onChange={e => setSpeed(parseFloat(e.target.value))}
          />
          <div style={{ fontSize: 12 }}>{speed.toFixed(2)}x</div>
        </div>

        <div>
          <button
            onClick={() => setPlaying(p => !p)}
            style={{ padding: '8px 12px', marginTop: 18 }}
            disabled={!current}
          >
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Avatar3D(props) {
  return (
    <div>
      <h2>3D Avatar</h2>
      <p>Load a rigged GLB at <code>/public/models/avatar.glb</code>. If the model contains animation clips they will appear below.</p>
      <ModelPlayer {...props} />
    </div>
  )
}
