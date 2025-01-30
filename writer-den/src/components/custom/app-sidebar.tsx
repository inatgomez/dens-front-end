import * as React from "react";
import { useRouter } from "next/router";
import {
  SquarePen,
  Webhook,
  BotMessageSquare,
  Search,
  Plus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { NavProjects, NavProjectsSkeleton } from "./nav-projects";

import { ChevronUp, User2 } from "lucide-react";
import { CreateNewProjectForm } from "./create-project-form";
import { Project } from "./nav-projects";
import { getProjects } from "@/services/projectService";
import { SearchIdeas } from "./search-ideas";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { logout as setLogout } from "@/redux/features/authSlice";

const items = [
  {
    title: "New idea",
    url: "/dashboard",
    icon: SquarePen,
  },
  //  {
  //    title: "Get connections",
  //    url: "#",
  //    icon: Webhook,
  //  },
  // {
  //   title: "Recommendations",
  //   url: "#",
  //   icon: BotMessageSquare,
  // },
  {
    title: "Search",
    component: SearchIdeas,
    icon: Search,
  },
];

export function AppSidebar() {
  const [projects, setProjects] = React.useState<Project[]>([]);

  const router = useRouter();

  const { data: user, isLoading, isFetching } = useRetrieveUserQuery();

  const userName = `${user?.first_name} + ' ' + ${user?.first_name}`;

  if (isLoading || isFetching) {
    return (
      <div className='flex justify-center my-8'>
        <span>Loading user details</span>
      </div>
    );
  }

  const dispatch = useAppDispatch();

  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
        router.push("/");
      });
  };

  React.useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
    }

    fetchProjects();
  }, []);

  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [...prev, newProject]);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.unique_id === updatedProject.unique_id
          ? updatedProject
          : project
      )
    );
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) =>
      prev.filter((project) => project.unique_id !== projectId)
    );
  };
  return (
    <Sidebar variant='inset' collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    {item.component ? (
                      <item.component />
                    ) : (
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <CreateNewProjectForm onAddProject={handleAddProject}>
            <SidebarGroupAction title='New Project'>
              <Plus /> <span className='sr-only'>New Project</span>
            </SidebarGroupAction>
          </CreateNewProjectForm>
          <SidebarGroupContent>
            <React.Suspense fallback={<NavProjectsSkeleton />}>
              <NavProjects
                projects={projects}
                onUpdateProject={handleUpdateProject}
                onDeleteProject={handleDeleteProject}
              />
            </React.Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton tooltip='Account'>
                  <User2 /> {userName}
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='top'
                className='w-[--radix-popper-anchor-width]'
              >
                <DropdownMenuItem onClick={handleLogout}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
