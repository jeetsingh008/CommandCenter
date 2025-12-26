"use client";

import { useState } from "react";
import { createProjectAction } from "@/lib/actions"; // Adjust path if needed (e.g., "@/actions")
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; 

export function CreateProjectModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    color: "#3B82F6",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Initializing new project...");

    try {
      const result = await createProjectAction(formData);

      if (result.success) {
        setOpen(false);
        setFormData({ title: "", description: "", color: "#3B82F6" });
        toast.success(`Project "${result.data.title}" deployed successfully!`, {
          id: toastId,
        });
      } else {
        toast.error(result.error || "Failed to create project", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("System malfunction. Please try again.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="shadow-lg shadow-blue-900/20" size="lg">
          + New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Launch a new mission. Track your progress from day one.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="col-span-3"
                placeholder="e.g. CommandCenter"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="desc" className="text-right">
                Desc
              </Label>
              <Input
                id="desc"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="col-span-3"
                placeholder="Short briefing..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <div className="col-span-3 flex gap-2">
                {["#3B82F6", "#10B981", "#EF4444", "#F59E0B", "#8B5CF6"].map(
                  (c) => (
                    <div
                      key={c}
                      onClick={() => setFormData({ ...formData, color: c })}
                      className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                        formData.color === c
                          ? "border-white"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Deploying..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
