"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  User,
  Timer,
  Laptop,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

interface Project {
  _id: string;
  title: string;
  color?: string;
}

interface CommandMenuProps {
  projects?: Project[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandMenu({
  projects = [],
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? externalOnOpenChange! : setInternalOpen;

  // Global Ctrl+K / Cmd+K key listener
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen, open]);

  // Helper to execute selection and close dialog
  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Quick Navigation */}
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/control-panel"))}
          >
            <LayoutDashboard className="mr-2 h-4 w-4 text-primary" />
            <span>Dashboard</span>
            <CommandShortcut>G D</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/control-panel/settings"))}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>G S</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/user"))}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Projects Jump List */}
        {projects.length > 0 && (
          <CommandGroup heading="Projects">
            {projects.map((project) => (
              <CommandItem
                key={project._id}
                value={`project ${project.title}`}
                onSelect={() =>
                  runCommand(() =>
                    router.push(`/control-panel/projects/${project._id}`)
                  )
                }
              >
                <span
                  className="mr-2 h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: project.color || "#4ade80",
                    boxShadow: `0 0 6px ${project.color || "#4ade80"}`,
                  }}
                />
                <span className="truncate">{project.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        <CommandSeparator />

        {/* Productivity Actions */}
        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                // Dispatches an event or triggers the timer
                window.dispatchEvent(new CustomEvent("start-focus-session"));
              })
            }
          >
            <Timer className="mr-2 h-4 w-4 text-amber-500" />
            <span>Start 25m Focus Session</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Theme Switching */}
        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light Mode</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark Mode</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
            <Laptop className="mr-2 h-4 w-4" />
            <span>System Default</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
