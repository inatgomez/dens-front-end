import * as React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { EditorContent } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { useMinimalTiptapEditor, limit } from "../../hooks/use-minimal-tiptap";
import { MeasuredContainer } from "../minimal-tiptap/measured-container";
import type { Content } from "@tiptap/react";
import type { UseMinimalTiptapEditorProps } from "../../hooks/use-minimal-tiptap";
import { debounce } from "lodash";

export interface EditIdeaEditorProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

export const EditIdeaChat = React.forwardRef<
  HTMLDivElement,
  EditIdeaEditorProps
>(({ value, onChange, className, editorContentClassName, ...props }, ref) => {
  const debouncedOnChange = React.useMemo(
    () => debounce((value: Content) => onChange?.(value), 5000),
    [onChange]
  );

  const editor = useMinimalTiptapEditor({
    value,
    onUpdate: debouncedOnChange,
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
        "flex flex-col max-h-96 w-full rounded-xl bg-slate-600",
        className
      )}
    >
      <ScrollArea className='w-full'>
        <EditorContent
          editor={editor}
          className={cn(
            "text-foreground rounded-[inherit] min-h-10 p-6",
            editorContentClassName
          )}
        />
      </ScrollArea>
      <div className='flex items-center justify-end text-sm text-foreground gap-2 px-6 pb-4'>
        {editor.storage.characterCount.characters()} / {limit}
      </div>
    </MeasuredContainer>
  );
});

EditIdeaChat.displayName = "EditIdeaChat";

export default EditIdeaChat;
