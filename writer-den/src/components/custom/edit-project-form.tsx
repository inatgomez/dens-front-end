import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getProject, editProject } from "@/services/projectService";
import { Project } from "./nav-projects";

interface EditProjectFormProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProject: (updatedProject: Project) => void;
}

const GENRES = [
  "ROMANCE",
  "MISTERY",
  "SCI-FI",
  "FANTASY",
  "ACTION",
  "DRAMA",
  "DETECTIVE",
  "HORROR",
  "COMING OF AGE",
  "COMEDY",
];

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(100),
  main_genre: z.string().min(1, {
    message: "Main genre is required.",
  }),
  mix_genre: z.string().optional(),
});

const EditProjectForm: React.FC<EditProjectFormProps> = ({
  projectId,
  isOpen,
  onClose,
  onUpdateProject,
}) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Untitled",
      main_genre: "",
      mix_genre: "",
    },
  });

  React.useEffect(() => {
    async function fetchProject() {
      if (!isOpen || !projectId) {
        console.log("Early return - conditions not met");
        return;
      }

      try {
        const project = await getProject(projectId);

        form.reset({
          name: project.name || "Untitled",
          main_genre: project.main_genre || "",
          mix_genre: project.mix_genre || "",
        });
      } catch (error) {
        toast({
          description: "Failed to load project details.",
        });
        console.error("Fetch Project Error:", error);
      }
    }

    fetchProject();
  }, [isOpen, projectId, form, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await editProject(projectId, values);

      if (data) {
        toast({
          description: "Success! Your project has been updated.",
        });
        console.log("Form values o submit:", values);
        onUpdateProject(data);
        onClose();
      }
    } catch (error) {
      toast({
        description: "Failed to update project. Try again.",
      });
      console.error("Failed to update project:", error);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(state) => {
        console.log("Dialog state changed to:", state);
        if (!state) onClose();
      }}
    >
      <DialogContent aria-describedby='project-edit-description'>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <p id='project-edit-description' className='sr-only'>
            Edit the details of your project
          </p>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 flex flex-col'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project's Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Name of your new project' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='main_genre'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's the main genre?</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className='w-1/2'>
                        <SelectValue
                          placeholder='Select main genre'
                          {...field}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {GENRES.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre.charAt(0).toUpperCase() +
                              genre.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='mix_genre'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's the second genre?</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className='w-1/2'>
                        <SelectValue
                          placeholder='Select second genre'
                          {...field}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {GENRES.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre.charAt(0).toUpperCase() +
                              genre.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant='default' size='lg' type='submit'>
              Save Changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { EditProjectForm };
