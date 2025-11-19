# Writer's Den

A note-taking app designed specifically for writers to capture and organize story ideas. Writer's Den provides an intuitive writing experience similar to a chat while keeping the interface distraction-free.

## Features

- **Intuitive Writing Experience**: Built with Tiptap for a clean, distraction-free writing interface
- **2,000-character limit**: Encourages quick brainstorming and idea capture
- **Full-Text Search**: Easily find ideas using keywords or categories
- **Project Organization**: Create separate projects to organize your ideas
- **Secure Authentication**: JWT and OAuth implementation for user security

## Tech Stack

- TypeScript
- React
- NextJS
- TailwindCSS
- Shadcn/ui
- Redux Toolkit and RTK Query

## Requirements

- Node.js (>=16.0.0)
- npm, yarn, or pnpm

## Installation

1. Clone the repository

```bash
git clone https://github.com/inatgomez/dens-front-end.git
cd writer-den
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory and add:

```
NEXT_PUBLIC_HOST='http://localhost:8000'
```

## Running the App

Make sure the [backend server](https://github.com/inatgomez/dens-api.git) is running first.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Main Dependencies

- `@tiptap/react` - For the rich text editor experience
- `@reduxjs/toolkit` - State management
- `react-hook-form` and `zod` - Form management and validation
- Various UI components from Radix UI
- Styling with TailwindCSS, and Shadcn/ui

## Related Projects

- [Writer's Den Backend](https://github.com/inatgomez/dens-api.git): Django Rest Framework backend for this application

## About the Project

Writer's Den was created to explore how technology could enhance creativity, specifically for storytellers. The app aims to help writers capture fleeting story ideas before they disappear and organize them in a way that sparks new connections.

Key aspects of this project:

- Focused on helping writers tell better stories
- Serves as an external brain for organizing and retrieving ideas
- Built with a clean, distraction-free interface to minimize disruptions to the creative process

Read the full case study [here](https://github.com/inatgomez/dens-front-end/blob/main/CASE_STUDY.md)
