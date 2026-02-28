export interface GearItem {
  id: string;
  name: string;
  category: "camera" | "lens" | "accessory" | "tripod" | "filter" | "other";
  image: string;
  description: string;
}
