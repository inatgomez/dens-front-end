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
