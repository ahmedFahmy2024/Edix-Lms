"use client";

import { Redo } from "lucide-react";
import React from "react";

import { useToolbar } from "@/components/toolbars/toolbar-provider";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const RedoToolbar = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", className)}
            onClick={(e) => {
              editor?.chain().focus().redo().run();
              onClick?.(e);
            }}
            disabled={!editor?.can().chain().focus().redo().run()}
            ref={ref}
            {...props}
          >
            {children || <Redo className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Redo</span>
        </TooltipContent>
      </Tooltip>
    );
  }
);

RedoToolbar.displayName = "RedoToolbar";

export { RedoToolbar };
