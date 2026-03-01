/**
 * Wallpaper options for Desktop. Add images to public/wallpapers/ and register here.
 * Use type: "gradient" for built-in CSS gradient; type: "image" for files in /wallpapers/.
 */
export const WALLPAPER_STORAGE_KEY = "macos-portfolio-wallpaper";

export const wallpapers = [
  {
    id: "gradient",
    label: "Default",
    type: "gradient",
  },
  {
    id: "macos-ventura",
    label: "Ventura",
    type: "image",
    src: "/wallpapers/ventura.jpg",
  },
  {
    id: "macos-sonoma",
    label: "Sonoma",
    type: "image",
    src: "/wallpapers/sonoma.jpg",
  },
];
