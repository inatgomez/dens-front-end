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
    }),
    getProject: builder.query<Project, string>({
      query: (unique_id) => ({
        url: `/notes/projects/${unique_id}`,
      }),
    }),
    createProject: builder.mutation<Project, ProjectData>({
      query: (projectData) => ({
        url: "/notes/projects/",
        method: "POST",
        body: projectData,
      }),
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
    }),
    deleteProject: builder.mutation<{ success: boolean }, string>({
      query: (unique_id) => ({
        url: `/notes/projects/${unique_id}`,
        method: "DELETE",
      }),
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
