/** Preloads an array of image URLs so the browser caches them before display. */
export function preloadImages(urls: string[]): void {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}
