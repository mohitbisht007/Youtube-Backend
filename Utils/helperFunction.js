//function to convert youtube URL to embedURL
export function convertToEmbedUrl(url) {
  try {
    const urlObj = new URL(url);

    // Case 1: Standard YouTube link ?v=VIDEOID
    let videoId = urlObj.searchParams.get("v");

    // Case 2: Shortened youtu.be link
    if (!videoId && urlObj.hostname.includes("youtu.be")) {
      videoId = urlObj.pathname.slice(1); // remove leading '/'
      // also strip any extra params like ?si=
      if (videoId.includes("?")) {
        videoId = videoId.split("?")[0];
      }
    }

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
