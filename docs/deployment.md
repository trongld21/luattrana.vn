# GitHub → Vercel

## Current setup

- Existing Vercel project: `tranalaw`, team `gotech-devweb`.
- Production URL: https://tranalaw.vercel.app
- GitHub repository connection: pending repository URL.
- `.github/workflows/ci.yml`: validates Prisma and builds on pushes and pull requests, using Node.js 22 and the npm lockfile. No production secrets required.
- `vercel.json`: explicitly selects Next.js, `npm ci`, `npm run build`, and `.next` output.

## Activate after the GitHub repository is available

Connect the existing project from this linked directory:

```sh
vercel git connect https://github.com/OWNER/REPOSITORY --yes
```

The Vercel GitHub app must have access to that repository. In Vercel → tranalaw → Settings → Git, confirm the connected repository and set Production Branch to `main` (or the repository's actual release branch). Keep Root Directory at the repository root.

Push the application source, package-lock.json, vercel.json, and workflow to GitHub. Never commit `.env`, `.vercel`, generated build directories, or node_modules.

Vercel's native integration builds and deploys production-branch pushes; other branches receive preview deployments. GitHub CI runs independently: it does not gate Vercel deployments. Configure branch protection requiring `Production build` before merge if CI must pass before changes reach the production branch.

Keep runtime `DATABASE_URL` in Vercel environment settings. The CI database URL is only a schema/build placeholder. Database migrations are not performed by this workflow.

## Verify activation

1. Push a commit to the production branch.
2. Confirm GitHub Actions → CI → Production build succeeds.
3. Confirm Vercel shows a Git-triggered deployment for the same commit SHA.
4. Open the production URL and verify the updated page.

Reference: https://vercel.com/docs/git/vercel-for-github
