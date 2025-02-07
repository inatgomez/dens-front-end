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
import { useMinimalTiptapEditor, limit } from "../../hooks/use-minimal-tiptap";
import { MeasuredContainer } from "../minimal-tiptap/measured-container";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { useGetProjectsQuery } from "@/redux/features/projectApiSlice";
import { useCreateIdeaMutation } from "@/redux/features/ideaApiSlice";

export interface IdeaEditorProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

const CATEGORY_OPTIONS = [
  "PLOT",
  "CHARACTER",
  "THEME",
  "SETTING",
  "RESEARCH",
  "RANDOM",
];

export const IdeaInputChat = React.forwardRef<HTMLDivElement, IdeaEditorProps>(
  ({ value, onChange, className, editorContentClassName, ...props }, ref) => {
    const editor = useMinimalTiptapEditor({
      value,
      onUpdate: onChange,
      ...props,
    });

    const { data: projects = [] } = useGetProjectsQuery();
    const [selectedProject, setSelectedProject] = React.useState<string | null>(
      null
    );
    const [selectedCategory, setSelectedCategory] = React.useState<
      string | null
    >(null);

    const { toast } = useToast();

    const [createIdea] = useCreateIdeaMutation();

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
        await createIdea({ projectId: selectedProject, ideaData }).unwrap();

        editor.commands.clearContent();
        setSelectedProject(null);
        setSelectedCategory(null);
        toast({
          description: "Success! Your idea was saved.",
        });
      } catch (error) {
        toast({
          description: "Failed to save the idea. Try again.",
        });
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
          "flex flex-col max-h-96 w-8/12 rounded-xl shadow-md bg-slate-600",
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
        <div className='flex items-center justify-end text-sm text-foreground gap-2 px-6'>
          {editor.storage.characterCount.characters()} / {limit}
        </div>
        <div className='flex items-center justify-end gap-1 px-6 my-4'>
          <Select onValueChange={setSelectedProject}>
            <SelectTrigger>
              <SelectValue placeholder='Select Project' />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.unique_id} value={project.unique_id}>
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
              {CATEGORY_OPTIONS.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() +
                    category.slice(1).toLowerCase()}
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
