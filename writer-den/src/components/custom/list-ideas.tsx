import React, { useState, useEffect } from "react";

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

import { useThrottle } from "@/hooks/use-throttle";
import { Content } from "@tiptap/react";

interface Idea {
  unique_id: string;
  content: string;
  title: string;
  category: string;
  project: string;
  message?: string;
}

interface IdeasListProps {
  projectId: string;
}

const truncateText = (text: string, limit: number) =>
  text.length > limit ? `${text.slice(0, limit)}...` : text;

function IdeasList({ projectId }: IdeasListProps) {
  const { toast } = useToast();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
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

  const throttledUpdateIdea = React.useCallback(
    useThrottle(async (unique_id: string, ideaData: any) => {
      console.log("Throttled update called");
      try {
        const response = await editIdea(unique_id, ideaData);
        if (response.ok) {
          toast({
            description: "Idea updated successfully",
          });
        }
      } catch (error) {
        toast({
          description: "Failed to update idea",
        });
      }
    }, 1000),
    [toast]
  );

  const handleIdeaChange = React.useCallback(
    (idea: Idea) => (content: Content) => {
      console.log("onChange called");
      throttledUpdateIdea(idea.unique_id, {
        content: JSON.stringify(content),
        category: idea.category,
        projectId: idea.project,
      });
    },
    [throttledUpdateIdea]
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
            <IdeaInputChat
              value={idea.content}
              project={idea.project}
              category={idea.category}
              isEditing={true}
              onChange={handleIdeaChange(idea)}
            />
          </CollapsibleContent>
        </Collapsible>
      ))}
    </>
  );
}

export default IdeasList;
