import * as React from "react";
// import "../minimal-tiptap/styles/index.css";

import type { Content } from "@tiptap/react";
import type { UseMinimalTiptapEditorProps } from "../../hooks/use-minimal-tiptap";
import { EditorContent } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { useMinimalTiptapEditor } from "../../hooks/use-minimal-tiptap";
import { MeasuredContainer } from "../minimal-tiptap/measured-container";

export interface IdeaEditorProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

export const IdeaInputChat = React.forwardRef<HTMLDivElement, IdeaEditorProps>(
  ({ value, onChange, className, editorContentClassName, ...props }, ref) => {
    const editor = useMinimalTiptapEditor({
      value,
      onUpdate: onChange,
      ...props,
    });

    if (!editor) {
      return null;
    }

    return (
      <MeasuredContainer
        as='div'
        name='editor'
        ref={ref}
        className={cn(
          "flex h-auto min-h-12 w-8/12 flex-col rounded-lg border border-slate-700 shadow-sm focus-within:border-slate-700",
          className
        )}
      >
        <EditorContent
          editor={editor}
          className={cn("bg-slate-400", editorContentClassName)}
        />
      </MeasuredContainer>
    );
  }
);

IdeaInputChat.displayName = "IdeaInputChat";

export default IdeaInputChat;
