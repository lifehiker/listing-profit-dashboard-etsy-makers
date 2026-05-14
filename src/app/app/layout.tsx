import { AppSidebar } from "@/components/app/app-sidebar";
import { Topbar } from "@/components/app/topbar";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="app-shell">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 lg:flex-row">
        <AppSidebar />
        <div className="flex-1 space-y-6">
          <Topbar />
          {children}
        </div>
      </div>
    </div>
  );
}
