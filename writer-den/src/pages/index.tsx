import ProjectsList from "@/components/list-projects";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import IdeaForm from "@/components/idea-form";
import ProjectForm from "@/components/project-form";
import { useModal } from "@/context/modal-context";

export default function Home() {
  const { isIdeaModalOpen, isProjectModalOpen } = useModal();

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='grid grid-cols-5 w-screen'>
        <SideBar />
        <div className='flex flex-col col-span-4'>
          <ProjectsList />
        </div>
      </div>

      {isIdeaModalOpen && <IdeaForm />}
      {isProjectModalOpen && <ProjectForm />}
    </div>
  );
}
