# ASL Communication Aid

An accessibility-oriented web prototype exploring camera-assisted American
Sign Language recognition, readable text, and avatar-based practice.

[Open the GitHub Pages demo](https://nnabdelshahid.github.io/asl-communication-aid/)

## Current capabilities

- Browser camera flow using MediaPipe hand landmarks
- Rule-based recognition demo for the letters A, L, and V
- On-screen recognized-letter and sentence state
- Settings and avatar-practice routes
- Responsive web interface deployed through GitHub Actions

This is a limited prototype, not a complete ASL translator. It does not yet
model ASL grammar, facial expressions, motion sequences, or the full alphabet,
and it is not a replacement for a qualified interpreter.

## Architecture

```text
Camera → MediaPipe hand landmarks → local rule classifier → text state
                                                     └──> avatar practice UI
```

The React/Vite application lives in `web/`. Hand-landmark inference and the
demo classifier run in the browser. MediaPipe runtime/model assets are loaded
from their configured public CDNs; camera frames are not uploaded by this
repository's application code.

## Local setup

Requirements: Node.js 20+, npm, a supported browser, and a camera for the live
recognition route.

```bash
cd web
npm ci
npm run dev
```

Allow camera access only when testing recognition. Other pages remain usable
without camera permission.

## Build and deployment

```bash
cd web
npm run build
npm run preview
```

`.github/workflows/deploy.yml` builds `web/dist` and publishes it with the
official GitHub Pages artifact workflow on pushes to `main`.

## Accessibility purpose

The project is intended as a learning and prototyping aid for more inclusive
communication. Future work should be designed and evaluated with Deaf and ASL
communities, include keyboard and screen-reader testing, measure recognition
quality across diverse users and environments, and communicate limitations
clearly.

## Testing status

The production build is automated. A dedicated unit/accessibility test suite
has not yet been added; classifier tests, keyboard-navigation checks, and
browser accessibility audits are planned.

## Research notes

Background research and project notes are in `docs/`. Research claims should
be verified against their linked primary sources before external publication.

## License

MIT.
