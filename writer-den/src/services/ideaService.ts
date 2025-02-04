export async function getIdeas(projectId: string) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/notes/ideas/${projectId}/ideas`
    );
    if (!response.ok) {
      throw new Error("Failed to fecth ideas.");
    }

    const data = await response.json();
    return data.length > 0
      ? data
      : [{ message: "You'll see your ideas soon!" }];
  } catch (error) {
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
      `http://localhost:8000/api/notes/ideas/${projectId}/ideas`,
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
      `http://localhost:8000/api/notes/ideas/${unique_id}`,
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
    throw error;
  }
}

export async function deleteIdea(unique_id: string) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/notes/ideas/${unique_id}`,
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
      `http://localhost:8000/api/notes/ideas/search?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to search ideas.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
