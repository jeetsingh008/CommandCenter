import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/app/(protected)/control-panel/_components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { api } from "@/lib/api";

const ControlPanelLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  let user = { name: "Guest", email: "" };
  let projects: any[] = [];

  try {
    const res: any = await api.get("users/me");
    // console.log(res);
    
    if (res.success && res.data) {
      user = res.data.user;
      projects = res.data.projects;
    }
  } catch (error) {
    console.error("Failed to load Sidebar data:", error);
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar user={user} projects={projects} />

      <main className="w-full bg-background min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default ControlPanelLayout;
