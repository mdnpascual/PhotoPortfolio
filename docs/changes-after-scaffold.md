# Changes after scaffold

While running `npm create vite@latest . -- --template react-ts`, I got asked "Select a variant", I chose Typescript + SWC

On block 12 when I ran npm run dev for the first time and went to the localurl, an error saying `[postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration.`

I had to add `npm install -D @tailwindcss/postcss` on install, change `postcss.config.js` to
```
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

and change `src/index.css` to just a single line of `@import "tailwindcss";`