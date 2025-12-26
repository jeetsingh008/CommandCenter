"use client";

import { useState, useEffect } from "react"; // ✅ Added useEffect
import { createLogAction } from "@/lib/actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // ✅ Added router for refresh

type Project = {
  _id: string;
  title: string;
};

interface LogWorkModalProps {
  projects: Project[];
  trigger?: React.ReactNode;
  initialDuration?: number;
  onSuccess?: () => void;  
}

export function LogWorkModal({ projects, trigger, initialDuration, onSuccess }: LogWorkModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    durationMinutes: "",
    date: new Date().toISOString().split("T")[0],
    category: "Coding",
    projectId: "",
  });

  useEffect(() => {
    if (open && initialDuration && initialDuration > 0) {
      setFormData((prev) => ({
        ...prev,
        durationMinutes: String(initialDuration),
      }));
    }
  }, [open, initialDuration]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Logging session...");

    try {
      const result = await createLogAction({
        ...formData,
        durationMinutes: parseInt(formData.durationMinutes) || 0,
      });

      if (result.success) {
        setOpen(false);
        setFormData((prev) => ({
          ...prev,
          title: "",
          description: "",
          durationMinutes: "",
        }));
        toast.success("Work logged successfully!", { id: toastId });
        
        router.refresh();

        if (onSuccess) onSuccess(); 

      } else {
        toast.error(result.error, { id: toastId });
      }
    } catch (error) {
      toast.error("System error", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="secondary" className="w-full justify-start">
            Log Work Session
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Log Work Session</DialogTitle>
            <DialogDescription>
              Record your progress. Every minute counts.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Row 1: Title */}
            <div className="grid gap-2">
              <Label htmlFor="log-title">Title / Summary</Label>
              <Input
                id="log-title"
                placeholder="e.g. Implemented Auth Middleware"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (mins)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="60"
                  min="1"
                  value={formData.durationMinutes}
                  onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Project</Label>
                <Select
                  value={formData.projectId}
                  onValueChange={(val) => setFormData({ ...formData, projectId: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.length > 0 ? (
                      projects.map((p) => (
                        <SelectItem key={p._id} value={p._id}>
                          {p.title}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>No Projects Found</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(val) => setFormData({ ...formData, category: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Coding", "Design", "Learning", "Meeting", "Planning", "Bug Fix"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="desc">Notes (Optional)</Label>
              <Textarea
                id="desc"
                placeholder="Detailed notes about what you accomplished..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Log Session"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}