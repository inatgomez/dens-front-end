import * as React from "react";

import type { Content } from "@tiptap/react";
import type { UseMinimalTiptapEditorProps } from "../../hooks/use-minimal-tiptap";
import { EditorContent } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { useMinimalTiptapEditor } from "../../hooks/use-minimal-tiptap";
import { MeasuredContainer } from "./measured-container";

export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

export const MinimalTiptapEditor = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(({ value, onChange, className, editorContentClassName, ...props }, ref) => {
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
        "flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary",
        className
      )}
    >
      <EditorContent
        editor={editor}
        className={cn("minimal-tiptap-editor", editorContentClassName)}
      />
    </MeasuredContainer>
  );
});

MinimalTiptapEditor.displayName = "MinimalTiptapEditor";

export default MinimalTiptapEditor;
