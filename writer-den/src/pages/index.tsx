import ProjectsList from "@/components/custom/list-projects";
import IdeaForm from "@/components/custom/idea-form";
import ProjectForm from "@/components/custom/project-form";
import Layout from "@/components/custom/layout";
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
