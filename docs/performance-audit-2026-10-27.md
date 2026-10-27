# Homepage performance — 27 October 2026

## Findings

The supplied Lighthouse 13.4.1 mobile reports scored 40 in Opera and 74 in Chrome. TBT fell from 3,040 ms to 150 ms between those runs; the Chrome report still showed LCP at 7.1 s. The first report included a video toolbar extension, and the Chrome report included Adobe extension resources. The reports do not establish which individual extension caused the difference.

The homepage attached all video sources during server rendering and used `preload="metadata"`. IntersectionObserver controlled playback, but did not defer source loading. Its main heading also started transparent during a reveal animation. Posters and small thumbnails were delivered at their original dimensions because the site uses a static export with the Next image optimizer disabled.

## Changes

- Video sources are attached only when at least 25% of the video enters the viewport. Videos pause outside the viewport and when the document is hidden.
- Reduced motion prevents automatic media downloads and playback. Explicit play/pause controls still work; a manual pause persists after scrolling.
- Responsive `<picture>` sources deliver generated WebP posters and thumbnails while retaining `next/image` dimensions, loading behavior and fallbacks. The video retains its last frame when paused.
- The main homepage heading is visible immediately.
- Hero videos have separate desktop and mobile encodes at 24 fps, without changing the sequence or playback speed. The two original files total 5,186,151 bytes; the mobile versions total 1,387,125 bytes, about 73% smaller.
- Cloudflare `_headers` caches hashed Next assets and generated images for a year; videos have a one-day browser lifetime because they may be replaced at the same URL. This follows the [Cloudflare static asset header configuration](https://developers.cloudflare.com/workers/static-assets/headers/).

Regenerate media after changing sources with `npm run optimize:images` and `npm run optimize:hero` (the latter requires ffmpeg).

## Validation

Final local Lighthouse 13.5.0 audit: mobile emulation, simulated slow network / 4× CPU slowdown, fresh browser without extensions, production static export, locally served with Brotli compression:

| Metric | Result |
| --- | --- |
| Performance | 86 |
| FCP | 1.1 s |
| LCP | 3.9 s |
| TBT | 80 ms |
| Speed Index | 4.1 s |
| CLS | 0 |
| Transferred resources | 1,821 KiB |

The local result and the supplied live-site score are different test environments and Lighthouse versions, not a controlled before/after measurement. Early local reports used an uncompressed development test server and should not be used for a numerical comparison. The raw final report is kept locally at `exports/performance/lighthouse-final-mobile.json`.

Browser checks cover Romanian mobile (412×823), English desktop (1440×1000), deferred project video requests, playback on entry, pause on exit, reduced motion, explicit playback and persistent manual pause. Screenshots are kept locally in `exports/performance/`.

Required release checks: production build, TypeScript and ESLint.

## Remaining measurement

LCP is improved but remains above the 2.5 s target in the local simulation. Re-run the same mobile audit on the published site after deployment to measure the actual hosting, compression and caching behavior. The scores above were measured locally before publication.

Publication uses the existing GitHub → Cloudflare Workers Builds integration (`origin/main`, check `Workers Builds: dcubev1`). It does not require a new local Wrangler login. `public/.assetsignore` keeps source Remotion recordings out of the deployed assets.
