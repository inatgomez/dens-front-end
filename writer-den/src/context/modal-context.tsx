import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isIdeaModalOpen: boolean;
  isProjectModalOpen: boolean;
  openIdeaModal: () => void;
  closeIdeaModal: () => void;
  openProjectModal: () => void;
  closeProjectModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isIdeaModalOpen, setIdeaModalOpen] = useState(false);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);

  const openIdeaModal = () => setIdeaModalOpen(true);
  const closeIdeaModal = () => setIdeaModalOpen(false);
  const openProjectModal = () => setProjectModalOpen(true);
  const closeProjectModal = () => setProjectModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isIdeaModalOpen,
        isProjectModalOpen,
        openIdeaModal,
        closeIdeaModal,
        openProjectModal,
        closeProjectModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
