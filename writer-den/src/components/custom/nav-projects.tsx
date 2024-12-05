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

interface Project {
  unique_id: string;
  name: string;
  message?: string;
}

function NavProjects() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [editDialogOpen, setEditDialogOpen] = React.useState<string | null>(
    null
  );

  const { toast } = useToast();

  React.useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  async function onClickDelete(unique_id: string) {
    try {
      const response = await deleteProject(unique_id);
      if (response.ok) {
        toast({
          description: "Your project has been deleted.",
        });
        setProjects((prev) => prev.filter((p) => p.unique_id !== unique_id));
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
                onClick={() => setEditDialogOpen(project.unique_id)}
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
            onClose={() => setEditDialogOpen(null)}
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
