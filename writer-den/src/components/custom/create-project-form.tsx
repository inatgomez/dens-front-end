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
import { useToast } from "@/hooks/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateProjectMutation } from "@/redux/features/projectApiSlice";
import { Project } from "@/types/project";

interface CreateNewProjectFormProps {
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
  main_genre: z.string().min(1, {
    message: "Main genre is required.",
  }),
  mix_genre: z.string().optional(),
});

const CreateNewProjectForm: React.FC<CreateNewProjectFormProps> = ({
  children,
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const { toast } = useToast();
  const [createProject] = useCreateProjectMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Untitled",
      main_genre: "",
      mix_genre: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createProject(values).unwrap();
      toast({
        description: "Success! Your project has been created.",
      });
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        description: "Failed to create project. Try again.",
      });
    }
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (open) {
          form.reset({
            name: "Untitled",
            main_genre: "",
            mix_genre: "",
          });
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              await onSubmit(values);
              setIsDialogOpen(false);
            })}
            className='space-y-8 flex flex-col'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project's Name</FormLabel>
                  <FormControl>
                    <Input
                      className='text-sm text-slate-50'
                      placeholder='Name of your new project'
                      {...field}
                    />
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
