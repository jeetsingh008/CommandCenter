"use client";
import { LogOut, Moon, Settings, Sun, User, Search } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const { setTheme } = useTheme();
  return (
    <nav className="px-4 py-3 flex items-center justify-between sticky top-0 z-30
                    bg-background/70 backdrop-blur-md border-b border-white/5">
      {/* Left side */}
  <div className="flex items-center gap-2">
  <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
  {/* Search / Command Palette trigger pill */}
  <button
    type="button"
    onClick={() => {
      // Dispatches a synthetic event or opens palette
      const event = new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
        bubbles: true,
      });
      document.dispatchEvent(event);
    }}
    className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground bg-muted/40 hover:bg-muted/70 hover:text-foreground border border-border/50 rounded-lg transition-all"
  >
    <Search className="h-3.5 w-3.5" />
    <span>Search commands or projects...</span>
    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
      <span className="text-xs">⌘</span>K
    </kbd>
  </button>
</div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-32">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User avatar and menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Avatar className="h-8 w-8 ring-2 ring-primary/20 hover:ring-primary/50 transition-all">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">
                JS
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10} align="end">
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/user">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2 opacity-60" />
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2 opacity-60" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
