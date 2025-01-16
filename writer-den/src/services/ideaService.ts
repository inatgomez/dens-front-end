export async function getIdeas(projectId: string) {
  try {
    const response = await fetch(
      `http://localhost:8000/ideasrecording/ideas/${projectId}/ideas`
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

export async function createIdea(
  projectId: string,
  ideaData: {
    title: string;
    content: string;
    category: string;
  }
) {
  try {
    const response = await fetch(
      `http://localhost:8000/ideasrecording/ideas/${projectId}/ideas`,
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

export async function editIdea(
  unique_id: string,
  ideaData: {
    content: string;
    category: string;
    projectId: string;
  }
) {
  try {
    const response = await fetch(
      `http://localhost:8000/ideasrecording/ideas/${unique_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ideaData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to edit idea.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error editing idea:", error);
    throw error;
  }
}

export async function deleteIdea(unique_id: string) {
  try {
    const response = await fetch(
      `http://localhost:8000/ideasrecording/ideas/${unique_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to delete idea.");
    }

    return response;
  } catch (error) {
    console.error("Error deleting idea:", error);
    throw error;
  }
}

export async function searchIdeas(query: string, category?: string) {
  const params = new URLSearchParams({
    q: query,
    ...(category && { category }),
  });
  try {
    const response = await fetch(
      `http://localhost:8000/ideasrecording/ideas/search?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to search ideas.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching ideas:", error);
    throw error;
  }
}
