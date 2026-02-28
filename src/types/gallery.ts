export interface GalleryImage {
  id: string;
  category: "birds" | "wildlife" | "landscape" | "people";
  title: string;
  aspectRatio: string;
  editedLandscape: string;
  editedPortrait: string;
  originalLandscape: string;
  originalPortrait: string;
}
