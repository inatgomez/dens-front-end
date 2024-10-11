import React from "react";
import { useState, useEffect } from "react";

export default function IdeaForm() {
  const [ideas, setIdeas] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addIdea = () => {
    const ideaTitle: string = title.trim();
    const ideaContent: string = content.trim();
    if (ideaTitle && ideaContent) {
      fetch("/ideasrecording/ideas", {
        method: "POST",
        body: JSON.stringify({
          ideaTitle,
          ideaContent,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json)
        .then((data) => {
          setIdeas([...ideas, data]);
          setTitle("");
          setContent("");
        });
    }
  };

  return (
    <div className='bg-primary-30'>
      <div className='flex mx-auto min-h-full flex-1 flex-col justifiy-center max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <h2 className='text-base font-bold leading-7 text-neutral-98'>
          New Idea
        </h2>

        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8'>
          <form action='#' method='POST' className='space-y-6'>
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-medium leading-6 text-neutral-98'
              >
                Title
              </label>
              <div className='mt-2'>
                <input
                  id='title'
                  name='title'
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 text-neutral-90 shadow-sm ring-1 ring-inset ring-neutral-30 placeholder:text-neutral-40 focus:ring-2 focus:ring-inset focus:ring-primary-60 sm:text-sm sm:eading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='content'
                className='block text-sm font-medium leading-6 text-neutral-98'
              >
                What's your idea?
              </label>
              <div className='mt-2'>
                <textarea
                  id='content'
                  name='content'
                  type='text'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-neutral-90 shadow-sm ring-1 ring-inset ring-neutral-30 placeholder:text-neutral-40 focus:ring-2 focus:ring-inset focus:ring-primary-60 sm:text-sm sm:eading-6'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                onClick={addIdea}
                className='flex w-full justify-center rounded-md bg-tertiary-60 px-3 py-1.5 text-sm font-semibold leading-6 text-neutral-10 shadow-sm hover:bg-tertiary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary-60'
              >
                Save idea
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
