import gearData from "../data/gear.json";
import type { GearItem } from "../types/gear";

export function useGear(): GearItem[] {
  return gearData as GearItem[];
}
