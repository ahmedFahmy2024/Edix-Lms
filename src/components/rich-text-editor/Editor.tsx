"use client";

import { BlockquoteToolbar } from "@/components/toolbars/blockquote";
import { BoldToolbar } from "@/components/toolbars/bold";
import { BulletListToolbar } from "@/components/toolbars/bullet-list";
import { CodeToolbar } from "@/components/toolbars/code";
import { CodeBlockToolbar } from "@/components/toolbars/code-block";
import { HardBreakToolbar } from "@/components/toolbars/hard-break";
import { HorizontalRuleToolbar } from "@/components/toolbars/horizontal-rule";
import { ItalicToolbar } from "@/components/toolbars/italic";
import { OrderedListToolbar } from "@/components/toolbars/ordered-list";
import { RedoToolbar } from "@/components/toolbars/redo";
import { StrikeThroughToolbar } from "@/components/toolbars/strikethrough";
import { ToolbarProvider } from "@/components/toolbars/toolbar-provider";
// import { UndoToolbar } from "@/components/toolbars/undo";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, type Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { HeadingOneToolbar } from "../toolbars/heading-one";
import { HeadingThreeToolbar } from "../toolbars/heading-three";
import { HeadingTwoToolbar } from "../toolbars/heading-two";
import { TextAlignCenterToolbar } from "../toolbars/text-align-center";
import { TextAlignLeftToolbar } from "../toolbars/text-align-left";
import { TextAlignRightToolbar } from "../toolbars/text-align-right";
import { UndoToolbar } from "../toolbars/undo";

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    code: {
      HTMLAttributes: {
        class: "bg-accent rounded-md p-1",
      },
    },
    horizontalRule: {
      HTMLAttributes: {
        class: "my-2",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "bg-primary text-primary-foreground p-2 text-sm rounded-md p-1",
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
      HTMLAttributes: {
        class: "tiptap-heading",
      },
    },
  }),

  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
  }),
];

const content = "";

export const StarterKitExample = () => {
  const editor = useEditor({
    extensions: extensions as Extension[],
    content,
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }
  return (
    <div className="border w-full relative rounded-md overflow-hidden pb-3">
      <div className="flex w-full items-center py-2 px-2 justify-between border-b  sticky top-0 left-0 bg-background z-20">
        <ToolbarProvider editor={editor}>
          <div className="flex items-center gap-2 flex-wrap">
            <UndoToolbar />
            <RedoToolbar />

            <div className="w-px h-6 bg-border mx-2"></div>

            <BoldToolbar />
            <ItalicToolbar />
            <StrikeThroughToolbar />
            <HeadingOneToolbar />
            <HeadingTwoToolbar />
            <HeadingThreeToolbar />
            <BulletListToolbar />
            <OrderedListToolbar />

            <div className="w-px h-6 bg-border mx-2"></div>

            <TextAlignLeftToolbar />
            <TextAlignCenterToolbar />
            <TextAlignRightToolbar />

            <div className="w-px h-6 bg-border mx-2"></div>

            <CodeToolbar />
            <CodeBlockToolbar />
            <HorizontalRuleToolbar />
            <BlockquoteToolbar />
            <HardBreakToolbar />
          </div>
        </ToolbarProvider>
      </div>
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className="cursor-text min-h-[18rem] bg-background dark:bg-input/30"
      >
        <EditorContent className="outline-none" editor={editor} />
      </div>
    </div>
  );
};
