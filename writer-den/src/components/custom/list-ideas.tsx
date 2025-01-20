import * as React from "react";
import { useState } from "react";

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

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import { useToast } from "@/hooks/use-toast";

import { EditIdeaChat } from "./edit-idea-chat";

import { getIdeas, deleteIdea, editIdea } from "@/services/ideaService";
import { getProjects } from "@/services/projectService";
import { Content } from "@tiptap/react";
import { string } from "zod";

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

const stripHtmlTags = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

function IdeasList({ projectId }: IdeasListProps) {
  const [ideas, setIdeas] = React.useState<Idea[]>([]);
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] =
    React.useState(false);
  const [ideaToCollapse, setIdeaToCollapse] = React.useState<string | null>(
    null
  );
  const [collapsedStates, setCollapsedStates] = React.useState<{
    [key: string]: boolean;
  }>({});
  const { toast } = useToast();
  const [editedContent, setEditedContent] = useState<{ [key: string]: string }>(
    {}
  );

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

  const handleContentChange = (ideaId: string, content: Content) => {
    const contentValue =
      typeof content === "string" ? content : JSON.stringify(content);
    setEditedContent((prev) => ({
      ...prev,
      [ideaId]: contentValue,
    }));
  };

  const handleSaveIdea = async (idea: Idea) => {
    const newContent = editedContent[idea.unique_id];
    if (!newContent) return;

    try {
      const contentToSend = newContent.replace(/^"|"$/g, "");

      await handleUpdateIdea(idea, { content: contentToSend });

      setIdeas((prev) =>
        prev.map((i) =>
          i.unique_id === idea.unique_id ? { ...idea, content: newContent } : i
        )
      );

      setEditedContent((prev) => {
        const updated = { ...prev };
        delete updated[idea.unique_id];
        return updated;
      });

      toast({
        description: "Idea updated successfully",
      });
    } catch (error) {
      toast({ description: "Failed to update idea" });
    }
  };

  const hasUnsavedChanges = (ideaId: string) => {
    return Boolean(editedContent[ideaId]);
  };

  const handleCollapsibleChange = (ideaId: string, isOpen: boolean) => {
    if (!isOpen && hasUnsavedChanges(ideaId)) {
      setShowUnsavedChangesDialog(true);
      setIdeaToCollapse(ideaId);
    } else {
      setCollapsedStates((prev) => ({
        ...prev,
        [ideaId]: isOpen,
      }));
    }
  };

  const handleDiscardChanges = () => {
    setEditedContent((prev) => {
      const updated = { ...prev };
      if (ideaToCollapse) {
        delete updated[ideaToCollapse];
      }
      return updated;
    });
    if (ideaToCollapse) {
      setCollapsedStates((prev) => ({
        ...prev,
        [ideaToCollapse]: false,
      }));
    }
    setShowUnsavedChangesDialog(false);
    setIdeaToCollapse(null);
  };

  if (loading) return <p className='text-base text-slate-50'>Loading...</p>;

  return (
    <>
      {ideas.map((idea) => (
        <Collapsible
          key={idea.unique_id}
          open={collapsedStates[idea.unique_id]}
          onOpenChange={(isOpen) =>
            handleCollapsibleChange(idea.unique_id, isOpen)
          }
          className='my-2 bg-slate-600 shadow-sm shadow-slate-700 rounded-sm w-[80%]'
        >
          <div className='flex items-center justify-between gap-2 mx-auto p-4 sm:px-4 xl:gap-8'>
            <h2 className='text-xl text-slate-50'>
              {truncateText(stripHtmlTags(idea.content), 50)}
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
          <CollapsibleContent className='space-y-4 w-full p-4'>
            <EditIdeaChat
              value={idea.content}
              onChange={(content) =>
                handleContentChange(idea.unique_id, content)
              }
            />
            <div className='flex items-center justify-end gap-2'>
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
                      {category.charAt(0).toUpperCase() +
                        category.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant='default'
                size='icon'
                onClick={() => handleSaveIdea(idea)}
              >
                <Send />
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}

      <Dialog
        open={showUnsavedChangesDialog}
        onOpenChange={setShowUnsavedChangesDialog}
      >
        <DialogContent className='flex flex-col items-center justify-center w-[350px] p-6'>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription className='text-slate-300 text-center p-4'>
              You have unsaved changes. Do you want to save them before closing?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex gap-2'>
            <Button
              variant='outline'
              onClick={() => {
                if (ideaToCollapse) {
                  const idea = ideas.find(
                    (idea) => idea.unique_id === ideaToCollapse
                  );
                  if (idea) {
                    handleSaveIdea(idea);
                    setCollapsedStates((prev) => ({
                      ...prev,
                      [ideaToCollapse]: false,
                    }));
                  }
                }
                setShowUnsavedChangesDialog(false);
                setIdeaToCollapse(null);
              }}
            >
              Save Changes
            </Button>
            <Button variant='destructive' onClick={handleDiscardChanges}>
              Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default IdeasList;
