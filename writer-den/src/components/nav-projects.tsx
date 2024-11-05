import * as React from "react";
import { getProjects } from "@/services/projectService";
import Link from "next/link";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { FileText } from "lucide-react";

interface Project {
  unique_id: string;
  name: string;
  message?: string;
}

export default function NavProjects() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading) return <p className='text-base text-slate-50'>Loading...</p>;

  return (
    <SidebarMenu>
      {projects.map((project) => (
        <SidebarMenuItem key={project.unique_id}>
          <SidebarMenuButton asChild>
            <Link
              key={project.unique_id || project.message}
              href={`/projects/${project.unique_id}`}
            >
              <FileText />
              <span>{project.name || project.message}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
