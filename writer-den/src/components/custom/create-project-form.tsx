import * as React from "react";
import {
  Dialog,
  DialogTrigger,
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
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createProject } from "@/services/projectService";

interface CreateNewProjectFormProps {
  onSubmit: (project: string[]) => void;
  children: React.ReactNode;
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
  main_genre: z.string(),
  other_genre: z.string(),
});

const CreateNewProjectForm: React.FC<CreateNewProjectFormProps> = ({
  onSubmit,
  children,
}) => {
  const [name, setName] = React.useState("");
  const [mainGenre, setMainGenre] = React.useState("");
  const [otherGenre, setOtherGenre] = React.useState("");

  const { toast } = useToast();

  async function handleSubmit(
    values: z.infer<typeof formSchema>,
    e: React.FormEvent
  ) {
    e.preventDefault();

    const projectData = {
      name,
      main_genre: mainGenre.toUpperCase(),
      mix_genre: otherGenre === "None" ? "" : otherGenre.toUpperCase(),
    };

    try {
      await createProject(projectData);
      toast({
        description: "Your project has been created",
      });
    } catch (error) {
      toast({
        description: "Failed to create project. Try again.",
      });
    }
    console.log(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      main_genre: "",
      other_genre: "",
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
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
                    <Select>
                      <SelectTrigger className='w-1/2'>
                        <SelectValue
                          placeholder='Select main genre'
                          {...field}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {GENRES.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
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
              name='other_genre'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's the second genre?</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className='w-1/2'>
                        <SelectValue
                          placeholder='Select second genre'
                          {...field}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {GENRES.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant='default'
              size='lg'
              type='submit'
              className='justify-self-end'
            >
              Save project
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateNewProjectForm };
