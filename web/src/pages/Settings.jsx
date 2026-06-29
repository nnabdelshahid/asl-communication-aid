import React, { useState } from 'react';

export default function Settings() {
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [confidence, setConfidence] = useState(70);

  return (
    <section className="tool-page" aria-labelledby="settings-title">
      <div className="page-heading">
        <p className="eyebrow">Preferences</p>
        <h1 id="settings-title">Settings</h1>
        <p>Adjust demo preferences for future recognition and speech output behavior.</p>
      </div>

      <div className="settings-grid">
        <label className="toggle-row">
          <span>
            Speech output
            <small>Prepare recognized text for spoken feedback.</small>
          </span>
          <input type="checkbox" checked={speechEnabled} onChange={(event) => setSpeechEnabled(event.target.checked)} />
        </label>

        <label>
          Confidence threshold: {confidence}%
          <input
            type="range"
            min="40"
            max="95"
            value={confidence}
            onChange={(event) => setConfidence(event.target.value)}
          />
        </label>

        <div className="settings-summary">
          <h2>Current setup</h2>
          <p>Speech is {speechEnabled ? 'enabled' : 'disabled'}.</p>
          <p>Recognition confidence target is {confidence}%.</p>
        </div>
      </div>
    </section>
  );
}
