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

interface Project {
  unique_id: string;
  name: string;
  message?: string;
}

function NavProjects() {
  const [projects, setProjects] = React.useState<Project[]>([]);

  React.useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
    }
    fetchProjects();
  }, []);

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
            <DropdownMenuContent side='right' align='start'>
              <DropdownMenuItem>
                <span>Edit Project</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Delete Project</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
