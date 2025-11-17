import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const ControlPanelPage = async () => {
  const session = await auth;

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex justify-center items-center font-bold">
      Control panel page
    </div>
  );
};

export default ControlPanelPage;
