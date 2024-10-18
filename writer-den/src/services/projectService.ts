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

export async function createProject(projectData: {
  name: string;
  main_genre: string;
  mix_genre: string;
}) {
  try {
    const response = await fetch(
      "http://localhost:8000/ideasrecording/projects",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to create project.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}
