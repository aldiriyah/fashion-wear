const api = process.env.NEXT_PUBLIC_API_URL;

export const fetchContent = async (slug: string) => {
  try {
    const response = await fetch(`${api}/api/v1/content/${slug}`, {
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      // Fallback or error handling
      console.error(`Failed to fetch content for ${slug}`);
      return null;
    }

    const data = await response.json();
    if (data.success) {
      return data.data.content;
    }
    return null;
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
};
