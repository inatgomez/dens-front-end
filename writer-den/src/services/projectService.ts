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
    console.error("Error fetching projects:", error);
    return [{ message: "Failed to load projects. Please try again later" }];
  }
}

export async function getProject(unique_id: string) {
  try {
    const response = await fetch(
      `http://localhost:8000/ideasrecording/projects/${unique_id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch project.");
    }
    const data = await response.json();

    return data.length > 0
      ? data[0]
      : {
          name: "Untitled",
          main_genre: "",
          mix_genre: "",
          message: "You'll see your project soon.",
        };
  } catch (error) {
    console.error("Error fetching project:", error);
    return {
      name: "Untitled",
      main_genre: "",
      mix_genre: "",
      message: "Failed to load project. Please try again later",
    };
  }
}

export async function createProject(projectData: {
  name?: string;
  main_genre?: string;
  mix_genre?: string;
}) {
  try {
    const response = await fetch(
      "http://localhost:8000/ideasrecording/projects/",
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

export async function editProject(
  unique_id: string,
  projectData: {
    name?: string;
    main_genre?: string;
    mix_genre?: string;
  }
) {
  try {
    const response = await fetch(
      `http://localhost:8000/ideasrecording/projects/${unique_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to edit project.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error editing project:", error);
    throw error;
  }
}

export async function deleteProject(unique_id: string) {
  try {
    const response = await fetch(
      `http://localhost:8000/ideasrecording/projects/${unique_id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to delete project.");
    }

    return response;
  } catch (error) {
    console.error("Error deleting the project:", error);
    throw error;
  }
}
