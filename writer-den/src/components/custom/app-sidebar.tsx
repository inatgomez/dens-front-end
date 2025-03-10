import * as React from "react";
import { useRouter } from "next/router";
import { SquarePen, Search, Plus } from "lucide-react";

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
import { Project } from "@/types/project";
import { SearchIdeas } from "./search-ideas";

import { useGetProjectsQuery } from "@/redux/features/projectApiSlice";
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
  {
    title: "Search",
    component: SearchIdeas,
    icon: Search,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: projects = [], isLoading: projectsLoading } =
    useGetProjectsQuery();

  const {
    data: user,
    isLoading: userLoading,
    isFetching: userFetching,
  } = useRetrieveUserQuery();

  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
        router.push("/");
      });
  };

  const userName = user ? `${user?.first_name}` : "User";

  if (userLoading || userFetching || projectsLoading) {
    return (
      <div className='flex justify-center my-8'>
        <span>Loading user details...</span>
      </div>
    );
  }

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
          <CreateNewProjectForm>
            <SidebarGroupAction title='New Project'>
              <Plus /> <span className='sr-only'>New Project</span>
            </SidebarGroupAction>
          </CreateNewProjectForm>
          <SidebarGroupContent>
            <React.Suspense fallback={<NavProjectsSkeleton />}>
              <NavProjects projects={projects} />
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
                  <User2 />
                  <span className='ml-2'>{userName}</span>
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
