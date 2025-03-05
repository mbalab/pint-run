// Utility to help with ad placement
export const shouldRenderAd = (index: number, frequency = 8): boolean => {
  return index > 0 && index % frequency === 0
}

