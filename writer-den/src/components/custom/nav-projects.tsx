import * as React from "react";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
  SidebarMenuAction,
} from "../ui/sidebar";
import { FileText, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { useToast } from "@/hooks/use-toast";

import { EditProjectForm } from "./edit-project-form";
import { Project } from "@/types/project";
import { useDeleteProjectMutation } from "@/redux/features/projectApiSlice";

interface NavProjectsProps {
  projects: Project[];
  onUpdateProject: (updatedProject: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

function NavProjects({
  projects,
  onUpdateProject,
  onDeleteProject,
}: NavProjectsProps) {
  const [editDialogOpen, setEditDialogOpen] = React.useState<string | null>(
    null
  );

  const { toast } = useToast();
  const [deleteProject] = useDeleteProjectMutation();

  React.useEffect(() => {}, [editDialogOpen]);

  async function onClickDelete(unique_id: string) {
    try {
      await deleteProject(unique_id).unwrap();

      toast({
        description: "Your project has been deleted.",
      });
      onDeleteProject(unique_id);
    } catch (error) {
      toast({
        description: "Failed to delete project. Try again.",
      });
    }
  }

  return (
    <SidebarMenu>
      {projects.map((project) => (
        <SidebarMenuItem key={project.unique_id}>
          <SidebarMenuButton asChild tooltip={project.name || project.message}>
            <Link href={`/projects/${project.unique_id}`}>
              <FileText />
              <span>{project.name || project.message}</span>
            </Link>
          </SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction>
                <MoreHorizontal />
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side='right'
              className='p-2 rounded-md border border-slate-600 bg-slate-950 text-slate-50 text-sm'
            >
              <DropdownMenuItem
                onClick={() => {
                  setEditDialogOpen(project.unique_id);
                }}
                className='cursor-default focus:bg-slate-700 focus:text-slate-50 outline-none rounded-sm px-2 py-1.5 transition-colors'
              >
                <span>Edit Project</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onClickDelete(project.unique_id)}
                className='cursor-default focus:bg-slate-700 focus:text-slate-50 outline-none rounded-sm px-2 py-1.5 transition-colors'
              >
                <span>Delete Project</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditProjectForm
            projectId={project.unique_id}
            isOpen={editDialogOpen === project.unique_id}
            onClose={() => {
              setEditDialogOpen(null);
            }}
            onUpdateProject={onUpdateProject}
          />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

function NavProjectsSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export { NavProjects, NavProjectsSkeleton };
