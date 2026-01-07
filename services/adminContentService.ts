const api = process.env.NEXT_PUBLIC_API_URL;

export const fetchContent = async (slug: string) => {
  try {
    const response = await fetch(`${api}/api/v1/content/${slug}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
};

export const updateContent = async (slug: string, content: any) => {
  try {
    const response = await fetch(`${api}/api/v1/content/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating content:", error);
    return { success: false, message: "Network error" };
  }
};
