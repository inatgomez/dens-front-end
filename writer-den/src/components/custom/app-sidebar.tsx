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
import * as React from "react";
import CreateNewProjectForm from "./create-project-form";

const items = [
  {
    title: "New idea",
    url: "/",
    icon: SquarePen,
  },
  {
    title: "Get connections",
    url: "#",
    icon: Webhook,
  },
  {
    title: "Recommendations",
    url: "#",
    icon: BotMessageSquare,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
];

const ACTIONS = {
  ADD_PROJECT: "add_project",
  EDIT_PROJECT: "edit_project",
  DELETE_PROJECT: "delete_project",
};

function projectReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_PROJECT:
      return { ...state, projects: [...state.projects, action.payload] };
    case ACTIONS.EDIT_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project
        ),
      };
    case ACTIONS.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const initialState = {
  projects: [],
};

export function AppSidebar() {
  const [state, dispatch] = React.useReducer(projectReducer, initialState);

  function addProject(newProject: string[]) {
    dispatch({ type: ACTIONS.ADD_PROJECT, payload: newProject });
  }

  function editProject(updatedProject: string[]) {
    dispatch({ type: ACTIONS.EDIT_PROJECT, payload: updatedProject });
  }

  function deleteProject(projectId: string) {
    dispatch({ type: ACTIONS.DELETE_PROJECT, payload: projectId });
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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Favorites</SidebarGroupLabel>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <CreateNewProjectForm onSubmit={(project) => addProject(project)}>
            <SidebarGroupAction title='New Project'>
              <Plus /> <span className='sr-only'>New Project</span>
            </SidebarGroupAction>
          </CreateNewProjectForm>
          <SidebarGroupContent>
            <React.Suspense fallback={<NavProjectsSkeleton />}>
              <NavProjects />
            </React.Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='top'
                className='w-[--radix-popper-anchor-width]'
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
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
