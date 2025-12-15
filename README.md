# ASL Communication Aid

This repository hosts a web and mobile app to help translate ASL into text and speech and to show an avatar.

Web demo (will be available after deployment): https://nnabdelshahid.github.io/asl-communication-aid/

## Local web dev:

```bash
cd web
npm ci
npm run dev
```

## Code

Notes and post-merge actions

After merging the PR:
- GitHub Actions will run the deploy workflow. The workflow publishes from the artifact created from `web/dist`.
- If Pages does not become active automatically, open Settings → Pages and set Build and deployment → Source to "GitHub Actions".
- If you want me to perform the PR creation + merge for you, invite me as a collaborator (grant write access) or tell me when it's been granted — I'll create and merge the PR and confirm the Pages URL for you.

## License
This project is licensed under the MIT License.

---

*Empowering communication through technology.*