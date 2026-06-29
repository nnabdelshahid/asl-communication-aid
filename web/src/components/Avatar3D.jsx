import React, { useState } from 'react';

const phrases = {
  hello: ['wave', 'open hand', 'smile'],
  help: ['hand lift', 'support', 'thank you'],
  thanks: ['chin tap', 'forward hand', 'smile'],
};

export default function Avatar3D() {
  const [phrase, setPhrase] = useState('hello');

  return (
    <section className="avatar-demo" aria-label="Signing avatar demo">
      <div className={`avatar-figure avatar-figure--${phrase}`} aria-hidden="true">
        <span className="avatar-head" />
        <span className="avatar-body" />
        <span className="avatar-arm avatar-arm--left" />
        <span className="avatar-arm avatar-arm--right" />
      </div>

      <div className="avatar-controls">
        <h2>Practice phrase</h2>
        <div className="button-row">
          {Object.keys(phrases).map((key) => (
            <button
              type="button"
              key={key}
              className={phrase === key ? 'is-active' : ''}
              onClick={() => setPhrase(key)}
            >
              {key}
            </button>
          ))}
        </div>
        <ol>
          {phrases[phrase].map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
