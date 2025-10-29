"use client";

import { AlignCenter } from "lucide-react";
import React from "react";

import { useToolbar } from "@/components/toolbars/toolbar-provider";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const TextAlignCenterToolbar = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
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
              editor?.isActive({ textAlign: "center" }) && "bg-accent",
              className
            )}
            onClick={(e) => {
              editor?.chain().focus().setTextAlign("center").run();
              onClick?.(e);
            }}
            disabled={
              !editor?.can().chain().focus().setTextAlign("center").run()
            }
            ref={ref}
            {...props}
          >
            {children || <AlignCenter className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Align Center</span>
        </TooltipContent>
      </Tooltip>
    );
  }
);

TextAlignCenterToolbar.displayName = "TextAlignCenterToolbar";

export { TextAlignCenterToolbar };
