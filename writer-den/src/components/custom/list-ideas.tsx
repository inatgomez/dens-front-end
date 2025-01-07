import React, { useState, useEffect } from "react";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { IdeaEditorProps } from "./idea-input-chat";
import { IdeaInputChat } from "./idea-input-chat";

import { getIdeas } from "@/services/ideaService";

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
export default function IdeasList({ projectId }: IdeasListProps) {
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

  if (loading) return <p className='text-base text-slate-50'>Loading...</p>;

  return (
    <>
      {ideas.map((idea) => (
        <Collapsible
          open={isCollapsed}
          onOpenChange={setIsCollapsed}
          className='my-8 bg-slate-600 shadow-sm shadow-slate-700 rounded-sm w-[80%]'
          key={idea.unique_id}
        >
          <div className='flex items-center justify-between gap-6 mx-auto p-4 sm:px-4 xl:gap-8'>
            <h2 className='text-xl text-slate-50'>{idea.title}</h2>
            <CollapsibleTrigger asChild>
              <Button variant='default' size='icon'>
                <ChevronDownIcon className='w-4 h-4' />
                <span className='sr-only'>Expand</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className='space-y-2 w-full'>
            <IdeaInputChat />
          </CollapsibleContent>
        </Collapsible>
      ))}
    </>
  );
}
