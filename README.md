# Northellas.eyes – new site

A rebuild of https://northellaseyes.blogspot.com/ as a fast static site (vanilla HTML/CSS/JS, Greek with an English toggle).
Static site served at the root of its own domain (Cloudflare Pages, no build step, output directory `/`).

## Changing the domain

The site's own address appears only in three tags at the top of `index.html` (`canonical`, `og:url`, `og:image`). Replace `https://northhellas-eyes.pages.dev/` there with the real domain; everything else uses relative paths.

## Files

- `index.html` – page structure
- `styles.css` – design
- `cams.js` – the 27 cameras (names, descriptions, hosts, stream sources)
- `app.js` – grid, filters, search, live player, viewer, language toggle

## How each camera is shown

| Source | What the visitor gets | Cameras |
| --- | --- | --- |
| `hls` (alphastream playlist) | Live video inside the page (hls.js, native HLS on iPhone) | Litochoro, Alexandroupoli port, Kastania, Nestorio, Old Agios Athanasios, Ouranoupoli, Fotina |
| `windy` id | Snapshot that refreshes every minute + Windy day time-lapse player | the other 20, plus most of the above |
| `meteo` slug | Link to the meteolive.gr page with its own live player | all 27 |

The Fotina playlist (`mediacp.alphastream.eu/foteina/index.m3u8`) is inferred from its `embed.html` page; if it does not play, the viewer falls back to the time-lapse automatically.

## Making the other 20 cameras play live video in the page

Their live streams run on alphastream.eu through meteolive.gr, but the playlist names are not published on the blog.
For each camera, add the playlist URL as `hls` in `cams.js`, e.g.

```js
hls: 'https://mediawp.alphastream.eu/<name>/<name>/playlist.m3u8'
```

The stream must allow cross-origin requests (CORS) from the site's domain for Chrome/Android; Safari plays HLS natively either way.
