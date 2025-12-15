import React from 'react'
import Avatar3D from '../components/Avatar3D'

export default function AvatarPage() {
  return (
    <div>
      <h1>Avatar</h1>
      <p>Advanced 3D avatar demo. Use the controls below to play pre-authored animations. Camera retargeting coming in Phase 2.</p>
      <Avatar3D />
    </div>
  )
}