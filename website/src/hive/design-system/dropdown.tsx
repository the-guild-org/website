"use client";

import { Link as NextLink } from "@tanstack/react-router";
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "./cn";

interface DropdownContextValue {
  buttonId: string;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  isHovering: boolean;
  isOpen: boolean;
  menuId: string;
  menuRef: React.RefObject<HTMLDivElement | null>;
  setIsHovering: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a Dropdown");
  }
  return context;
}

interface DropdownProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  type: "click" | "hover";
}

export function Dropdown({
  children,
  className,
  type,
  ...props
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const buttonId = useId();
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !menuRef.current?.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    const handleFocusElsewhere = (event: FocusEvent) => {
      if (
        !menuRef.current?.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("focus", handleFocusElsewhere);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("focus", handleFocusElsewhere);
    };
  }, [isOpen]);

  const dismissDelayMs = 200;
  const isHoveringRef = useRef(isHovering);
  useEffect(() => {
    isHoveringRef.current = isHovering;
  }, [isHovering]);

  return (
    <DropdownContext.Provider
      value={{
        buttonId,
        buttonRef,
        isHovering,
        isOpen,
        menuId,
        menuRef,
        setIsHovering,
        setIsOpen,
      }}
    >
      <div
        className={cn("relative", className)}
        {...(type === "hover" && {
          onPointerEnter: () => {
            setIsOpen(true);
            setIsHovering(true);
          },
          onPointerLeave: () => {
            if (isHovering) {
              setIsHovering(false);
              setTimeout(() => {
                if (!isHoveringRef.current) {
                  setIsOpen(false);
                }
              }, dismissDelayMs);
            }
          },
        })}
        {...props}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

interface DropdownTriggerProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
}

export function DropdownTrigger({
  children,
  className,
  ...props
}: DropdownTriggerProps) {
  const { buttonId, buttonRef, isOpen, menuId, setIsHovering, setIsOpen } =
    useDropdownContext();

  return (
    <button
      aria-controls={menuId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      className={cn("cursor-pointer", className)}
      id={buttonId}
      onClick={() => {
        setIsOpen(true);
        setIsHovering(false);
      }}
      ref={buttonRef}
      {...props}
    >
      {children}
    </button>
  );
}

interface DropdownContentProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

export function DropdownContent({
  children,
  className,
  ...props
}: DropdownContentProps) {
  const { buttonId, isOpen, menuId, menuRef } = useDropdownContext();

  return (
    <div
      aria-labelledby={buttonId}
      className={cn(className)}
      data-state={isOpen ? "open" : "closed"}
      id={menuId}
      ref={menuRef}
      role="menu"
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>
  );
}

interface DropdownItemProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export function DropdownItem({
  children,
  className,
  href,
  onClick,
  ...props
}: DropdownItemProps) {
  if (href) {
    // For external links, use anchor tag
    if (href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a
          className={className}
          href={href}
          onClick={onClick}
          rel="noreferrer"
          role="menuitem"
          target="_blank"
          {...props}
        >
          {children}
        </a>
      );
    }
    // For internal links, use TanStack Router
    return (
      <NextLink
        className={className}
        onClick={onClick}
        role="menuitem"
        to={href}
        {...props}
      >
        {children}
      </NextLink>
    );
  }

  return (
    <button
      className={className}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "Space") {
          onClick?.();
        }
      }}
      role="menuitem"
      {...props}
    >
      {children}
    </button>
  );
}
