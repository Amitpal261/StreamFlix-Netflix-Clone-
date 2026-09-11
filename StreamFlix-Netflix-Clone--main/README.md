# StreamFlix — Production Streaming UI

A modern streaming discovery app built with React, Vite, Tailwind CSS, Redux Toolkit, Firebase Authentication, Framer Motion and TMDB.

## Features

- Cinematic landing page
- Authenticated browse experience
- Movies + TV catalog with genre/sort filters
- Debounced global search
- Movie/TV detail pages with credits and similar titles
- My List persisted in local storage
- In-app trailer player using an embedded YouTube player (no page navigation)
- Optional licensed direct video URL support via `VITE_VIDEO_URL`
- AI-style recommendation assistant with voice input and real TMDB result cards
- Responsive desktop/tablet/mobile UI
- Accessible buttons, labels and reduced-motion support

## Setup

1. `npm install`
2. Copy `.env.example` to `.env`
3. Add your TMDB and Firebase Web App values.
4. In Firebase Console enable Email/Password authentication.
5. `npm run dev`
6. `npm run lint && npm run build`

### Video note

StreamFlix does not ship copyrighted full movies or unauthorized streams. The built-in player embeds trailers inside the app. For full-length playback, set `VITE_VIDEO_URL` to a video asset you own or are licensed to stream. For production HLS/DASH, use a licensed CDN and a proper player/DRM stack.

### Production security

Never expose private API secrets in a Vite client bundle. TMDB's browser key is expected to be public; any AI provider secret must be moved behind a server-side API/Cloud Function before production deployment.

## AI production deployment

The AI assistant calls the `/api/recommend` Firebase Function so the OpenRouter secret is never bundled into the browser. Before deploying, set the Firebase secret:

`firebase functions:secrets:set OPENROUTER_API_KEY`

Then deploy with your Firebase project selected:

`firebase deploy --only functions,hosting`

The local Vite dev server proxies `/api` to the Firebase Functions emulator on port 5001.

## Real video playback

The player is designed for media you own or are licensed to distribute. Set `VITE_VIDEO_URL` to an MP4/WebM/HLS manifest. YouTube trailers remain embedded inside the StreamFlix UI as a fallback when no licensed asset is configured.

## OpenRouter free AI setup

The AI Assistant uses OpenRouter server-side so the API key is never shipped to the browser. The default model is `openrouter/free`, which routes to an available free model.

1. Create an OpenRouter API key.
2. Store it in Firebase Secret Manager: `firebase functions:secrets:set OPENROUTER_API_KEY`
3. Optionally configure the model with the Firebase parameter `OPENROUTER_MODEL` (default: `openrouter/free`).
4. Deploy functions: `firebase deploy --only functions`

Never put the OpenRouter key in `.env` as a `VITE_*` variable and never commit the real key to Git.
