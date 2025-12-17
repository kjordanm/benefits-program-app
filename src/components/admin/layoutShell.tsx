import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

interface LayoutShellProps {
  children: ReactNode;
}

const LayoutShell = ({ children }: LayoutShellProps) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default LayoutShell;
