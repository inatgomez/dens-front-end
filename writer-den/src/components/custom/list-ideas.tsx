import * as React from "react";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDown, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Send } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

import { EditIdeaChat } from "./edit-idea-chat";

import { getIdeas, deleteIdea, editIdea } from "@/services/ideaService";
import { getProjects } from "@/services/projectService";

interface Idea {
  unique_id: string;
  content: string;
  title: string;
  category: string;
  project: string;
  message?: string;
}

interface Project {
  unique_id: string;
  name: string;
}

interface IdeasListProps {
  projectId: string;
}

const CATEGORY_OPTIONS = [
  "PLOT",
  "CHARACTER",
  "THEME",
  "SETTING",
  "RESEARCH",
  "RANDOM",
];

const truncateText = (text: string, limit: number) =>
  text.length > limit ? `${text.slice(0, limit)}...` : text;

function IdeasList({ projectId }: IdeasListProps) {
  const [ideas, setIdeas] = React.useState<Idea[]>([]);
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    async function fetchProjects() {
      const projectsData = await getProjects();
      setProjects(projectsData);
    }
    fetchProjects();
  }, []);

  React.useEffect(() => {
    async function fetchIdeas() {
      const data = await getIdeas(projectId);
      setIdeas(data);
      setLoading(false);
    }
    fetchIdeas();
  }, [projectId]);

  async function handleDeleteIdea(unique_id: string) {
    try {
      const response = await deleteIdea(unique_id);
      if (response.ok) {
        toast({
          description: "Idea deleted successfully",
        });
        setIdeas((prev) => prev.filter((idea) => idea.unique_id !== unique_id));
      }
    } catch (error) {
      toast({
        description: "Failed to delete idea",
      });
      console.error("Failed to delete idea:", error);
    }
    console.log("Idea id:", unique_id);
  }

  const handleUpdateIdea = React.useCallback(
    async (
      idea: Idea,
      updates: {
        content?: string;
        category?: string;
        projectId?: string;
      }
    ) => {
      try {
        const response = await editIdea(idea.unique_id, {
          content: updates.content || idea.content,
          category: updates.category || idea.category,
          projectId: updates.projectId || idea.project,
        });

        if (response.ok) {
          setIdeas((prev) =>
            prev.map((i) =>
              i.unique_id === idea.unique_id ? { ...i, ...updates } : i
            )
          );
          toast({
            description: "Idea updated successfully",
          });
        }
      } catch (error) {
        toast({ description: "Failed to update idea" });
      }
    },
    [toast]
  );

  if (loading) return <p className='text-base text-slate-50'>Loading...</p>;

  return (
    <>
      {ideas.map((idea) => (
        <Collapsible
          open={isCollapsed}
          onOpenChange={setIsCollapsed}
          className='mt-8 mb-4 bg-slate-600 shadow-sm shadow-slate-700 rounded-sm w-[80%]'
          key={idea.unique_id}
        >
          <div className='flex items-center justify-between gap-2 mx-auto p-4 sm:px-4 xl:gap-8'>
            <h2 className='text-xl text-slate-50'>
              {truncateText(idea.content, 30)}
            </h2>
            <div className='flex items-center self-end gap-2'>
              <CollapsibleTrigger asChild>
                <Button variant='default' size='icon'>
                  <ChevronDown className='w-4 h-4' />
                  <span className='sr-only'>Expand</span>
                </Button>
              </CollapsibleTrigger>
              <Button
                variant='default'
                size='icon'
                onClick={() => {
                  handleDeleteIdea(idea.unique_id);
                }}
              >
                <TrashIcon className='w-4 h-4' />
                <span className='sr-only'>Delete</span>
              </Button>
            </div>
          </div>
          <CollapsibleContent className='space-y-2 w-full'>
            <EditIdeaChat
              value={idea.content}
              onChange={(content) =>
                handleUpdateIdea(idea, { content: JSON.stringify(content) })
              }
            />
            <div className='flex items-center justify-end gap-1 px-6 my-4'>
              <Select
                defaultValue={idea.project}
                onValueChange={(value) =>
                  handleUpdateIdea(idea, { projectId: value })
                }
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select Project' />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem
                      key={project.unique_id}
                      value={project.unique_id}
                    >
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                defaultValue={idea.category}
                onValueChange={(value) =>
                  handleUpdateIdea(idea, { category: value })
                }
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select Category' />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant='default'
                size='icon'
                onClick={() => handleUpdateIdea(idea, {})}
              >
                <Send />
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </>
  );
}

export default IdeasList;
