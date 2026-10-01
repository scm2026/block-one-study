# Block One — study tool

Live: https://scm2026.github.io/block-one-study/
Preview: https://scm2026.github.io/block-one-study/preview/

## How this repo is organized

- `/` (this folder) is the **live** build — only changes that have been tested and approved land here.
- `/preview/` is where new changes go first. Claude writes candidate builds there; check the preview link before anything gets promoted to live.
- When a preview build is approved, Claude copies the same files up to the root in the next update — no branch switching needed.

## Publishing a change

After Claude writes updated files into this folder (root and/or `preview/`), run from this folder:

```
git add -A
git commit -m "describe the change"
git push
```

GitHub Pages redeploys automatically within about a minute.
