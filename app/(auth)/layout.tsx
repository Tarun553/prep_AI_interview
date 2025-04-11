import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

import { isAuthenticated } from "@/lib/actions/auth.actions";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  try {
    const isUserAuthenticated = await isAuthenticated();
    if (isUserAuthenticated) {
      redirect("/");
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {children}
        </div>
      </div>
    );
  } catch (error) {
    toast.error("Failed to check authentication status");
    redirect("/sign-in");
  }
};

export default AuthLayout;
