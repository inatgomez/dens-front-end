import * as React from "react";
import { getProjects } from "@/services/projectService";
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

import { deleteProject } from "@/services/projectService";
import { useToast } from "@/hooks/use-toast";

import { EditProjectForm } from "./edit-project-form";

export interface Project {
  unique_id: string;
  name: string;
  message?: string;
}

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

  React.useEffect(() => {
    console.log("State changed: editDialogOpen =", editDialogOpen);
  }, [editDialogOpen]);

  async function onClickDelete(unique_id: string) {
    try {
      const response = await deleteProject(unique_id);
      if (response.ok) {
        toast({
          description: "Your project has been deleted.",
        });
        onDeleteProject(unique_id);
      }
    } catch (error) {
      toast({
        description: "Failed to delete project. Try again.",
      });
      console.error("Failed to delete project:", error);
    }
    console.log("Project id:", unique_id);
  }

  return (
    <SidebarMenu>
      {projects.map((project) => (
        <SidebarMenuItem key={project.unique_id}>
          <SidebarMenuButton asChild>
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
                  console.log(
                    "Dropdown item clicked, current state:",
                    "editDialogOpen:",
                    editDialogOpen,
                    "project.unique_id:",
                    project.unique_id
                  );
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
              console.log("Closing dialog, resetting editDialogOpen to null.");
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
