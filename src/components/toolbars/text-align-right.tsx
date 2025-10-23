"use client";

import { AlignRight } from "lucide-react";
import React from "react";

import { useToolbar } from "@/components/toolbars/toolbar-provider";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const TextAlignRightToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
              editor?.isActive({ textAlign: "right" }) && "bg-accent",
              className,
            )}
            onClick={(e) => {
              editor?.chain().focus().setTextAlign("right").run();
              onClick?.(e);
            }}
            disabled={
              !editor?.can().chain().focus().setTextAlign("right").run()
            }
            ref={ref}
            {...props}
          >
            {children || <AlignRight className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Align Right</span>
        </TooltipContent>
      </Tooltip>
    );
  },
);

TextAlignRightToolbar.displayName = "TextAlignRightToolbar";

export { TextAlignRightToolbar };
