import * as React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

import type { Content } from "@tiptap/react";
import type { UseMinimalTiptapEditorProps } from "../../hooks/use-minimal-tiptap";
import { EditorContent } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { useMinimalTiptapEditor } from "../../hooks/use-minimal-tiptap";
import { MeasuredContainer } from "../minimal-tiptap/measured-container";
import { Send } from "lucide-react";

import { createIdea } from "@/services/ideaService";
import { getProjects } from "@/services/projectService";

export interface IdeaEditorProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

interface Project {
  name: string;
  unique_id: string;
}

export const IdeaInputChat = React.forwardRef<HTMLDivElement, IdeaEditorProps>(
  ({ value, onChange, className, editorContentClassName, ...props }, ref) => {
    const editor = useMinimalTiptapEditor({
      value,
      onUpdate: onChange,
      ...props,
    });

    const [projects, setProjects] = React.useState<Project[]>([]);
    const [category, setCategory] = React.useState([
      "Plot",
      "Character",
      "Theme",
      "Setting",
      "Research",
      "None",
    ]);
    const [selectedProject, setSelectedProject] = React.useState<string | null>(
      null
    );
    const [selectedCategory, setSelectedCategory] = React.useState<
      string | null
    >(null);

    React.useEffect(() => {
      async function fetchProjects() {
        const projectsData = await getProjects();
        setProjects(projectsData);
      }
      fetchProjects();
    }, []);

    const handleSaveIdea = async () => {
      if (!editor) return;

      if (!selectedProject) {
        alert("Please select a project.");
        return;
      }

      if (!selectedCategory) {
        alert("Please select a category.");
        return;
      }

      const content = editor.getHTML();

      const ideaData = {
        title: "Untitled",
        content,
        category: selectedCategory,
        project_id: selectedProject,
      };

      try {
        const result = await createIdea(selectedProject, ideaData);
        console.log("Idea saved successfully:", result);
      } catch (error) {
        console.error("Failed to save idea:", error);
      }
    };

    if (!editor) {
      return null;
    }

    return (
      <MeasuredContainer
        as='div'
        name='editor'
        ref={ref}
        className={cn(
          "flex max-h-96 w-8/12 rounded-xl shadow-md bg-slate-600",
          className
        )}
      >
        <ScrollArea className='w-full'>
          <EditorContent
            editor={editor}
            className={cn(
              "text-foreground rounded-[inherit] min-h-10 p-6",
              editorContentClassName
            )}
          />
        </ScrollArea>
        <div className='flex items-end justify-end p-4 mt-4'>
          <Select onValueChange={setSelectedProject}>
            <SelectTrigger>
              <SelectValue placeholder='Select Project' />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.unique_id} value={project.name}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder='Select Category' />
            </SelectTrigger>
            <SelectContent>
              {category.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant='default' size='icon' onClick={handleSaveIdea}>
            <Send />
          </Button>
        </div>
      </MeasuredContainer>
    );
  }
);

IdeaInputChat.displayName = "IdeaInputChat";

export default IdeaInputChat;
