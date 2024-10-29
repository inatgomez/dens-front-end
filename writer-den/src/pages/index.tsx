import ProjectsList from "@/components/list-projects";
import IdeaForm from "@/components/idea-form";
import ProjectForm from "@/components/project-form";
import RootLayout from "@/components/root-layout";
import { useModal } from "@/context/modal-context";

export default function Home() {
  const { isIdeaModalOpen, isProjectModalOpen } = useModal();

  return (
    <RootLayout>
      <ProjectsList />
      {isIdeaModalOpen && <IdeaForm />}
      {isProjectModalOpen && <ProjectForm />}
    </RootLayout>
  );
}
