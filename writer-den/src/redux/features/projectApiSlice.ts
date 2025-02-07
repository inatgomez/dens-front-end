import { apiSlice } from "../services/apiSlice";
import { Project } from "@/types/project";

export interface ProjectData {
  name?: string;
  main_genre?: string;
  mix_genre?: string;
}

const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => ({
        url: "/notes/projects/",
      }),
      providesTags: (result = [], error, arg) => [
        ...result.map((project) => ({
          type: "Project" as const,
          id: project.unique_id,
        })),
        { type: "Project", id: "LIST" },
      ],
    }),
    getProject: builder.query<Project, string>({
      query: (unique_id) => ({
        url: `/notes/projects/${unique_id}`,
      }),
      providesTags: (result, error, unique_id) => [
        { type: "Project", id: unique_id },
      ],
    }),
    createProject: builder.mutation<Project, ProjectData>({
      query: (projectData) => ({
        url: "/notes/projects/",
        method: "POST",
        body: projectData,
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
    editProject: builder.mutation<
      Project,
      { unique_id: string; projectData: ProjectData }
    >({
      query: ({ unique_id, projectData }) => ({
        url: `/notes/projects/${unique_id}`,
        method: "PATCH",
        body: projectData,
      }),
      invalidatesTags: (result, error, { unique_id }) => [
        { type: "Project", id: unique_id },
      ],
    }),
    deleteProject: builder.mutation<{ success: boolean }, string>({
      query: (unique_id) => ({
        url: `/notes/projects/${unique_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, unique_id) => [
        { type: "Project", id: unique_id },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
} = projectApiSlice;
