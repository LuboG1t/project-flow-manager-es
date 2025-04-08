
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import MisTareas from "./pages/MisTareas";
import TimesheetPage from "./pages/Timesheet";
import NotFound from "./pages/NotFound";
import Notificaciones from "./pages/Notificaciones";
import Aprobaciones from "./pages/Aprobaciones";
import TeamDashboard from "./pages/TeamDashboard";
import PortfolioDashboard from "./pages/PortfolioDashboard";
import PortfolioGantt from "./pages/PortfolioGantt";
import TareasSinProyecto from "./pages/TareasSinProyecto";
import Project1A from "./pages/Project1A";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Navigate to="/mis-tareas" replace />} />
          <Route path="/index" element={<Index />} />
          <Route path="/mis-tareas" element={<MisTareas />} />
          <Route path="/timesheet" element={<TimesheetPage />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/aprobaciones" element={<Aprobaciones />} />
          <Route path="/equipos/desarrollo" element={<TeamDashboard />} />
          <Route path="/portfolios/1" element={<PortfolioDashboard />} />
          <Route path="/portfolios/1/gantt" element={<PortfolioGantt />} />
          <Route path="/tareas-sin-proyecto" element={<TareasSinProyecto />} />
          <Route path="/projects/1a" element={<Project1A />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
