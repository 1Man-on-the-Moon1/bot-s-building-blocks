import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/app/AppLayout";
import Feed from "./pages/Feed";
import Chats from "./pages/Chats";
import Profile from "./pages/Profile";
import AppSettings from "./pages/AppSettings";
import Install from "./pages/Install";
import PresentationPage from "./pages/PresentationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Feed />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<AppSettings />} />
          </Route>
          <Route path="/install" element={<Install />} />
          <Route path="/presentation" element={<PresentationPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
