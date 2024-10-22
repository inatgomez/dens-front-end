export async function getIdeas(projectId: string) {
  try {
    const response = await fetch(
      `http://localhost:8000/ideasrecording/ideas/${projectId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fecth ideas.");
    }

    const data = await response.json();
    return data.length > 0
      ? data
      : [{ message: "You'll see your ideas soon!" }];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [{ message: "Failed to load ideas. Please try again later" }];
  }
}

export async function createIdea(ideaData: {
  title: string;
  content: string;
  category: string;
  project_id: string;
}) {
  try {
    const response = await fetch(
      "http://localhost:8000/ideasrecording/ideas/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ideaData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to create idea.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating idea:", error);
    throw error;
  }
}
