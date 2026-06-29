import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  ['Camera recognition', 'Detects supported ASL hand shapes and builds text as signs are recognized.'],
  ['Speech-ready text', 'Keeps recognized text in a clear panel so it can be copied or spoken aloud later.'],
  ['Avatar practice', 'Includes an avatar area for demonstrating signed phrases and future retargeting.'],
];

export default function Home() {
  return (
    <section className="hero-page" aria-labelledby="home-title">
      <div className="hero-copy">
        <p className="eyebrow">Accessible communication</p>
        <h1 id="home-title">ASL Communication Aid</h1>
        <p>
          A web demo for turning supported ASL gestures into readable text, with room for speech
          output and avatar-assisted practice.
        </p>
        <div className="hero-actions">
          <Link className="primary-link" to="/camera">
            Open camera
          </Link>
          <Link className="secondary-link" to="/avatar">
            View avatar
          </Link>
        </div>
      </div>

      <div className="feature-grid">
        {features.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
