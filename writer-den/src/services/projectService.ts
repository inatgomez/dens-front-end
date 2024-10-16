export async function getProjects() {
  try {
    const response = await fetch(
      "http://localhost:8000/ideasrecording/projects/"
    );
    if (!response.ok) {
      throw new Error("Failed to fecth projects.");
    }

    const data = await response.json();
    return data.length > 0
      ? data
      : [{ message: "You'll see your projects soon!" }];
  } catch (error) {
    console.error("Error fetchin projects:", error);
    return [{ message: "Failed to load projects. Please try again later" }];
  }
}
