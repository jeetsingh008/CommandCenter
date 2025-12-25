import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/app/(protected)/control-panel/_components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { api } from "@/lib/api"; // ✅ Import API

const ControlPanelLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  // --- 1. Fetch Data for Sidebar (User & Projects) ---
  // We define default values in case the fetch fails
  let user = { name: "Guest", email: "" };
  let projects: any[] = [];

  try {
    // We use the same 'users/me' endpoint because it returns { user, projects }
    const res: any = await api.get("users/me");
    // console.log(res);
    
    if (res.success && res.data) {
      user = res.data.user;
      projects = res.data.projects;
    }
  } catch (error) {
    console.error("Failed to load Sidebar data:", error);
    // You might want to redirect to login if this fails drastically
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {/* --- 2. Pass Data to AppSidebar --- */}
      <AppSidebar user={user} projects={projects} />

      <main className="w-full bg-background min-h-screen flex flex-col">
        <Navbar />
        {/* Added some padding/max-width for better alignment */}
        <div className="flex-1 w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default ControlPanelLayout;
