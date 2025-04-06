
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight as ChevronRightIcon, ChevronDown as ChevronDownIcon, Plus, LayoutDashboard, Calendar, Inbox, CheckSquare, Users, ListChecks, FileCog, Clock, BellRing, FolderKanban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import Logo from '../Logo';

// Create local components to avoid name conflicts
const ChevronRight = ChevronRightIcon;
const ChevronDown = ChevronDownIcon;

export default function AppSidebar() {
  const location = useLocation();
  const [expanded, setExpanded] = useState({
    'desarrollo': true,
    'portfolio-1': true
  });
  
  const toggleExpand = (key: string) => {
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen w-64 border-r bg-background flex flex-col fixed">
      <div className="p-4 border-b flex items-center justify-between">
        <Logo />
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="px-2 space-y-1">
          <Link to="/mis-tareas" className={cn(
            "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
            location.pathname === "/mis-tareas" 
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted"
          )}>
            <ListChecks className="h-5 w-5 mr-3" />
            Mis Tareas
          </Link>
          
          <Link to="/timesheet" className={cn(
            "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
            location.pathname === "/timesheet" 
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted"
          )}>
            <Clock className="h-5 w-5 mr-3" />
            Timesheet
          </Link>
          
          <Link to="/notificaciones" className={cn(
            "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
            location.pathname === "/notificaciones" 
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted"
          )}>
            <BellRing className="h-5 w-5 mr-3" />
            Notificaciones
          </Link>
          
          <Link to="/aprobaciones" className={cn(
            "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
            location.pathname === "/aprobaciones" 
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted"
          )}>
            <Calendar className="h-5 w-5 mr-3" />
            Aprobaciones
          </Link>
        </nav>
        
        <div className="mt-6">
          <div className="px-3 text-xs font-medium text-muted-foreground mb-2 flex items-center justify-between">
            <span>Espacios</span>
            <Button variant="ghost" size="icon" className="h-4 w-4">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="space-y-1 px-2">
            <Link to="/tareas-sin-proyecto" className={cn(
              "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
              location.pathname === "/tareas-sin-proyecto" 
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted"
            )}>
              <CheckSquare className="h-4 w-4 mr-2" />
              Tareas sin proyecto
            </Link>
            
            <div className="space-y-1">
              <div className="group">
                <div className="flex items-center justify-between px-2 py-1.5 text-sm rounded-md hover:bg-muted cursor-pointer">
                  <div className="flex items-center w-full" onClick={() => toggleExpand('desarrollo')}>
                    <ChevronRight className={cn("h-4 w-4 mr-2 transition-transform", expanded.desarrollo && "rotate-90")} />
                    <Users className="h-4 w-4 mr-2" />
                    <Link to="/equipos/desarrollo" className="flex-1">Equipo de Desarrollo</Link>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                
                {expanded.desarrollo && (
                  <div className="ml-7 space-y-1">
                    <div className="group">
                      <div className="flex items-center justify-between px-2 py-1.5 text-sm rounded-md hover:bg-muted cursor-pointer">
                        <div className="flex items-center w-full" onClick={() => toggleExpand('portfolio-1')}>
                          <ChevronRight className={cn("h-4 w-4 mr-2 transition-transform", expanded['portfolio-1'] && "rotate-90")} />
                          <FolderKanban className="h-4 w-4 mr-2" />
                          <Link to="/portfolios/1" className="flex-1">Portafolio 1</Link>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      {expanded['portfolio-1'] && (
                        <div className="ml-7 space-y-1">
                          <Link to="/projects/1a" className={cn(
                            "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
                            location.pathname === "/projects/1a" 
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted"
                          )}>
                            <FileCog className="h-4 w-4 mr-2" />
                            Proyecto 1A
                          </Link>
                          <Link to="/projects/1b" className={cn(
                            "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
                            location.pathname === "/projects/1b" 
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted"
                          )}>
                            <FileCog className="h-4 w-4 mr-2" />
                            Proyecto 1B
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
