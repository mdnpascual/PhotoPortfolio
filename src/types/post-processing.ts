export interface PostFrame {
  index: number;
  landscape: string;
  portrait: string;
}

export interface SliderKeyframe {
  label: string;
  start: number;
  end: number;
  min: number;
  max: number;
}

export interface PostProcessingTab {
  id: string;
  slug: "lightroom" | "photoshop-nik" | "aiartist";
  title: string;
  placeholder: boolean;
  frames: PostFrame[];
  sliders: SliderKeyframe[];
}
