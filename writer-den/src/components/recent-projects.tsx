import { useState, useEffect } from "react";

const projects = [
  {
    id: 1,
    name: "The Vault",
    href: "#",
    imageSrc:
      "https://unsplash.com/photos/a-close-up-of-a-blue-crumpled-paper-GgTRsZXzmvE",
    imageAlt: "A close up of a piece of blue crumpled paper",
  },
  {
    id: 2,
    name: "The Outer Post",
    href: "#",
    imageSrc:
      "https://unsplash.com/photos/a-close-up-of-a-piece-of-green-paper-OFJzUkyK8O8",
    imageAlt: "A close up of a piece of green crumpled paper",
  },
  {
    id: 3,
    name: "The First Alchemist",
    href: "#",
    imageSrc:
      "https://unsplash.com/photos/a-purple-background-with-a-very-large-amount-of-paper-err1cRwTqWA",
    imageAlt: "A close up of a piece of purple crumpled paper",
  },
  // More projects...
];

export default function RecentProjects() {
  return (
    <div className='bg-neutral-10'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='text-neutral-98 font-bold'>Recent Projects</h2>

        <div className='mt-4 grid grid-cols-3 gap-x-6 gap-y-10 xl:gap-x-8'>
          {projects.map((project) => (
            <a key={project.id} href={project.href} className='group'>
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-neutral-40 xl:aspect-h-8 xl:aspect-w-7'>
                <img
                  alt={project.imageAlt}
                  src={project.imageSrc}
                  className='h-full w-full object-cover object-center group-hover:opacity-75'
                />
              </div>
              <h2 className='mt-4 text-sm text-neutral-98'>{project.name}</h2>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
