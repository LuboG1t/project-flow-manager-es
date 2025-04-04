
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown, Plus, LayoutDashboard, Calendar, Inbox, CheckSquare, Users, ListChecks, FileCog, Clock, BellRing, FolderKanban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import Logo from '../Logo';

export default function AppSidebar() {
  const location = useLocation();
  const [expanded, setExpanded] = useState({
    'desarrollo': true,
    'portfolio-1': false
  });
  
  const toggleExpand = (key: string) => {
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen w-64 border-r bg-background flex flex-col">
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
          
          <Link to="/tareas-independientes" className={cn(
            "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
            location.pathname === "/tareas-independientes" 
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted"
          )}>
            <CheckSquare className="h-5 w-5 mr-3" />
            Tareas Independientes
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
            <div className="space-y-1">
              <div className="group">
                <div className="flex items-center justify-between px-2 py-1.5 text-sm rounded-md hover:bg-muted cursor-pointer">
                  <div className="flex items-center" onClick={() => toggleExpand('desarrollo')}>
                    {expanded.desarrollo ? (
                      <ChevronDown className="h-4 w-4 mr-2" />
                    ) : (
                      <ChevronRight className="h-4 w-4 mr-2" />
                    )}
                    <Users className="h-4 w-4 mr-2" />
                    <span>Equipo de Desarrollo</span>
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
                    <Link to="/equipos/desarrollo" className={cn(
                      "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
                      location.pathname === "/equipos/desarrollo" 
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted"
                    )}>
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    
                    <div className="group">
                      <div className="flex items-center justify-between px-2 py-1.5 text-sm rounded-md hover:bg-muted cursor-pointer">
                        <div className="flex items-center" onClick={() => toggleExpand('portfolio-1')}>
                          {expanded['portfolio-1'] ? (
                            <ChevronDown className="h-4 w-4 mr-2" />
                          ) : (
                            <ChevronRight className="h-4 w-4 mr-2" />
                          )}
                          <FolderKanban className="h-4 w-4 mr-2" />
                          <span>Portafolio 1</span>
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
                          <Link to="/portfolios/1" className={cn(
                            "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
                            location.pathname === "/portfolios/1" 
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted"
                          )}>
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            Dashboard
                          </Link>
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
