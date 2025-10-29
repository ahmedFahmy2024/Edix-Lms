"use client";

import { AlignLeft } from "lucide-react";
import React from "react";

import { useToolbar } from "@/components/toolbars/toolbar-provider";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const TextAlignLeftToolbar = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8",
              editor?.isActive({ textAlign: "left" }) && "bg-accent",
              className
            )}
            onClick={(e) => {
              editor?.chain().focus().setTextAlign("left").run();
              onClick?.(e);
            }}
            disabled={!editor?.can().chain().focus().setTextAlign("left").run()}
            ref={ref}
            {...props}
          >
            {children || <AlignLeft className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Align Left</span>
        </TooltipContent>
      </Tooltip>
    );
  }
);

TextAlignLeftToolbar.displayName = "TextAlignLeftToolbar";

export { TextAlignLeftToolbar };
