//function to convert youtube URL to embedURL
export function convertToEmbedUrl(url) {
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");

    if (!videoId) return null; // Invalid URL or no video ID found

    return `https://www.youtube.com/embed/${videoId}`;
  } catch (error) {
    return null; // Invalid URL format
  }
}

//function to get thumbnail from embedURL
export function getYoutubeThumbnail(embedUrl) {
  // Extract videoId from embed URL
  const match = embedUrl.match(/embed\/([^?&]+)/);
  if (!match) return null;
  const videoId = match[1];
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
