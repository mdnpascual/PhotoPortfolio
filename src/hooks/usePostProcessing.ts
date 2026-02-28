import postData from "../data/post-processing.json";
import type { PostProcessingTab } from "../types/post-processing";

export function usePostProcessingTabs(): PostProcessingTab[] {
  return postData as PostProcessingTab[];
}

export function usePostProcessingTab(slug: string): PostProcessingTab | undefined {
  return (postData as PostProcessingTab[]).find(t => t.slug === slug);
}
