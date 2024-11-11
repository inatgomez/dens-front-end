import ProjectsList from "@/components/list-projects";
import IdeaForm from "@/components/idea-form";
import ProjectForm from "@/components/project-form";
import Layout from "@/components/layout";
import { useModal } from "@/context/modal-context";

export default function App() {
  const { isIdeaModalOpen, isProjectModalOpen } = useModal();

  return (
    <Layout>
      <ProjectsList />
      {isIdeaModalOpen && <IdeaForm />}
      {isProjectModalOpen && <ProjectForm />}
    </Layout>
  );
}
