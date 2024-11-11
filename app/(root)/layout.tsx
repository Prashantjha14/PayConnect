import { ThemeToggle } from "@/components/theme-toggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="container mx-auto py-8">{children}</div>
      </main>
    </>
  );
}
