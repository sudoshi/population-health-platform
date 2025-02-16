'use client';

import { forwardRef, type ReactNode } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';

export interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
  viewportClassName?: string;
  orientation?: 'vertical' | 'horizontal' | 'both';
  scrollHideDelay?: number;
  type?: 'auto' | 'always' | 'scroll' | 'hover';
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({
    children,
    className,
    viewportClassName,
    orientation = 'vertical',
    scrollHideDelay = 600,
    type = 'hover',
  }, ref) => {
    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        type={type}
      >
        <ScrollAreaPrimitive.Viewport
          className={cn('h-full w-full rounded-[inherit]', viewportClassName)}
        >
          {children}
        </ScrollAreaPrimitive.Viewport>
        {(orientation === 'vertical' || orientation === 'both') && (
          <ScrollBar
            orientation="vertical"
            scrollHideDelay={scrollHideDelay}
          />
        )}
        {(orientation === 'horizontal' || orientation === 'both') && (
          <ScrollBar
            orientation="horizontal"
            scrollHideDelay={scrollHideDelay}
          />
        )}
        <Corner />
      </ScrollAreaPrimitive.Root>
    );
  }
);
ScrollArea.displayName = 'ScrollArea';

interface ScrollBarProps {
  orientation?: 'vertical' | 'horizontal';
  scrollHideDelay?: number;
  className?: string;
}

const ScrollBar = forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ orientation = 'vertical', scrollHideDelay, className }, ref) => {
    return (
      <ScrollAreaPrimitive.ScrollAreaScrollbar
        ref={ref}
        orientation={orientation}
        className={cn(
          'flex touch-none select-none transition-colors',
          orientation === 'vertical' &&
            'h-full w-2.5 border-l border-l-transparent p-[1px]',
          orientation === 'horizontal' &&
            'h-2.5 flex-col border-t border-t-transparent p-[1px]',
          className
        )}
      >
        <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-dark-border" />
      </ScrollAreaPrimitive.ScrollAreaScrollbar>
    );
  }
);
ScrollBar.displayName = 'ScrollBar';

const Corner = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <ScrollAreaPrimitive.Corner
      ref={ref}
      className="bg-dark-border"
      {...props}
    />
  );
});
Corner.displayName = 'Corner';

export interface ScrollAreaViewportProps {
  children: ReactNode;
  className?: string;
}

export const ScrollAreaViewport = forwardRef<HTMLDivElement, ScrollAreaViewportProps>(
  ({ children, className }, ref) => {
    return (
      <ScrollAreaPrimitive.Viewport
        ref={ref}
        className={cn('h-full w-full rounded-[inherit]', className)}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
    );
  }
);
ScrollAreaViewport.displayName = 'ScrollAreaViewport';

export interface ScrollAreaContentProps {
  children: ReactNode;
  className?: string;
}

export function ScrollAreaContent({
  children,
  className,
}: ScrollAreaContentProps) {
  return (
    <div className={cn('min-w-full', className)}>
      {children}
    </div>
  );
}
