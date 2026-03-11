import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isOnboardingComplete } from "@/lib/userStore";
import { isAdminAuthenticated } from "@/lib/adminStore";
import AppLayout from "./components/app/AppLayout";
import Feed from "./pages/Feed";
import Chats from "./pages/Chats";
import Profile from "./pages/Profile";
import AppSettings from "./pages/AppSettings";
import Install from "./pages/Install";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import PresentationPage from "./pages/PresentationPage";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

function RequireAdmin({ children }: { children: React.ReactNode }) {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}

const queryClient = new QueryClient();

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  if (!isOnboardingComplete()) {
    return <Navigate to="/welcome" replace />;
  }
  return <>{children}</>;
}

function RedirectIfOnboarded({ children }: { children: React.ReactNode }) {
  if (isOnboardingComplete()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Onboarding flow */}
          <Route path="/welcome" element={<RedirectIfOnboarded><Welcome /></RedirectIfOnboarded>} />
          <Route path="/onboarding" element={<RedirectIfOnboarded><Onboarding /></RedirectIfOnboarded>} />

          {/* Main app — requires completed onboarding */}
          <Route element={<RequireOnboarding><AppLayout /></RequireOnboarding>}>
            <Route path="/" element={<Feed />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<AppSettings />} />
          </Route>

          <Route path="/install" element={<Install />} />
          <Route path="/presentation" element={<PresentationPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<RequireAdmin><AdminPanel /></RequireAdmin>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
