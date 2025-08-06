import { auth } from "@/auth";
import { headers as nextheaders } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headers = await nextheaders();
  const session = await auth.api.getSession({
    headers,
  });

  // If no session exists, redirect to home page
  if (!session) {
    redirect("/");
  }

  return <>{children}</>;
}
