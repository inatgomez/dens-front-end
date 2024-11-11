import React, { useState, useEffect } from "react";
import { getIdeas } from "@/services/ideaService";

interface Idea {
  unique_id: string;
  content: string;
  title: string;
  category: string;
  project: string;
  created_at: string;
  updated_at?: string;
  message?: string;
}

interface IdeasListProps {
  projectId: string;
}
export default function IdeasList({ projectId }: IdeasListProps) {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIdeas() {
      const data = await getIdeas(projectId);
      setIdeas(data);
      setLoading(false);
    }
    fetchIdeas();
  }, [projectId]);

  if (loading) return <p className='text-base text-neutral-98'>Loading...</p>;

  return (
    <div className='bg-neutral-10 min-h-screen'>
      <div className='mt-4 flex flex-col items-center gap-6 mx-auto max-w-2xl p-4 sm:px-6 sm:py-8 lg:max-w-7xl xl:gap-8'>
        {ideas.map((idea) => (
          <a key={idea.unique_id || idea.message} href='#' className='group'>
            <div className='max-h-44 max-w-4xl overflow-hidden rounded-md bg-primary-50/70 shadow-sm shadow-primary-70 px-4 py-6'>
              <h2 className='text-xl text-neutral-98'>
                {idea.title || idea.message}
              </h2>
              {idea.category && (
                <p className='text-base text-neutral-98'>{idea.category}</p>
              )}
              {idea.created_at && (
                <p className='text-sm text-neutral-90'>
                  Created on:
                  {new Date(idea.created_at).toLocaleDateString()}
                </p>
              )}
              {idea.content && (
                <p className='text-base text-neutral-98'>{idea.content}</p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
