import { ThemeProvider } from "@/components/ui/theme-provider";

interface GlobalProviderProps {
  children: React.ReactNode;
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
