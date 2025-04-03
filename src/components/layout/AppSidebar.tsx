
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Calendar, CheckSquare, ChevronDown, ChevronRight, Clock, FolderKanban, 
  Layers, MoreHorizontal, Plus, Settings, Bell, LogOut, Users, Building2, Briefcase, 
  FolderPlus, UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import Logo from '../Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  count?: number;
};

const NavItem = ({ icon: Icon, label, to, count }: NavItemProps) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => cn(
        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-sidebar-accent',
        isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground'
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1">{label}</span>
      {count !== undefined && (
        <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </NavLink>
  );
};

const CollapsibleGroup = ({ 
  label, 
  children, 
  defaultOpen = false,
  count,
  icon: Icon,
  color = 'bg-primary',
  directLink,
  addAction
}: { 
  label: string; 
  children: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
  icon?: React.ElementType;
  color?: string;
  directLink?: string;
  addAction?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const navigate = useNavigate();
  
  const handleGroupClick = () => {
    if (directLink) {
      navigate(directLink);
    } else {
      setIsOpen(!isOpen);
    }
  };
  
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <button 
          onClick={handleGroupClick}
          className="flex flex-1 items-center justify-between px-3 py-2 text-sm font-medium text-sidebar-foreground"
        >
          <span className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-sidebar-foreground/70" />}
            {label}
            {count !== undefined && (
              <span className="ml-1 text-xs text-muted-foreground">({count})</span>
            )}
          </span>
          <ChevronRight className={cn("w-4 h-4 text-sidebar-foreground/50 transition-transform", isOpen && "rotate-90")} />
        </button>
        {addAction && (
          <Button variant="ghost" size="icon" className="h-7 w-7 mr-2" onClick={addAction}>
            <Plus className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
      <div className={cn("space-y-1 pl-3", !isOpen && "hidden")}>
        {children}
      </div>
    </div>
  );
};

const ProjectItem = ({ name, id, color = 'bg-primary' }: { name: string; id: string; color?: string; }) => {
  return (
    <NavLink 
      to={`/proyectos/${id}`}
      className={({ isActive }) => cn(
        'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        isActive ? 'bg-sidebar-accent/50 text-sidebar-accent-foreground' : 'text-sidebar-foreground'
      )}
    >
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span className="truncate">{name}</span>
    </NavLink>
  );
};

export function AppSidebar() {
  const [showSpaceDropdown, setShowSpaceDropdown] = useState(false);
  
  const handleNewSpace = () => {
    setShowSpaceDropdown(true);
  };
  
  const handleNewPortfolio = () => {
    // Lógica para crear nuevo portafolio
    console.log("Crear nuevo portafolio");
  };
  
  const handleNewProject = () => {
    // Lógica para crear nuevo proyecto
    console.log("Crear nuevo proyecto");
  };
  
  return (
    <div className="min-h-screen w-64 border-r bg-sidebar flex flex-col">
      <div className="px-4 py-5 flex items-center justify-between">
        <Logo />
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="px-2 py-2 space-y-1">
        <NavItem icon={CheckSquare} label="Mis tareas" to="/mis-tareas" />
        <NavItem icon={Bell} label="Notificaciones" to="/notificaciones" count={3} />
        <NavItem icon={Clock} label="TimeSheet" to="/timesheet" />
        <NavItem icon={Calendar} label="Aprobaciones" to="/aprobaciones" count={2} />
      </div>

      <div className="px-2 pt-4 pb-2">
        <div className="px-3 mb-2 flex items-center justify-between">
          <h3 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">Espacios</h3>
          <DropdownMenu open={showSpaceDropdown} onOpenChange={setShowSpaceDropdown}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleNewSpace}>
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => console.log("Nueva área de trabajo")}>
                <Building2 className="mr-2 h-4 w-4" />
                <span>Nueva área de trabajo</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleNewPortfolio}>
                <Briefcase className="mr-2 h-4 w-4" />
                <span>Nuevo portafolio</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleNewProject}>
                <FolderPlus className="mr-2 h-4 w-4" />
                <span>Nuevo proyecto</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <NavLink to="/tareas-independientes" className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-sidebar-accent text-sidebar-foreground">
          <FolderKanban className="w-4 h-4 text-sidebar-foreground/70" />
          <span>Tareas Independientes</span>
        </NavLink>

        <CollapsibleGroup 
          label="Equipo de Desarrollo" 
          count={2} 
          icon={Users}
          color="bg-blue-500"
          directLink="/equipos/desarrollo"
          addAction={handleNewPortfolio}
        >
          <NavLink to="/equipos/desarrollo" className="w-full text-left text-xs flex items-center gap-1 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent hover:text-accent-foreground">
            <span className="inline-block">Dashboard de equipo</span>
          </NavLink>
          
          <CollapsibleGroup 
            label="Portafolio 1" 
            count={2}
            icon={Briefcase}
            color="bg-purple-500"
            directLink="/portfolios/1"
            addAction={handleNewProject}
          >
            <NavLink to="/portfolios/1" className="w-full text-left text-xs flex items-center gap-1 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent hover:text-accent-foreground">
              <span className="inline-block">Dashboard de portafolio</span>
            </NavLink>
            
            <ProjectItem name="Proyecto 1A" id="1a" color="bg-green-500" />
            <ProjectItem name="Proyecto 1B" id="1b" color="bg-yellow-500" />
          </CollapsibleGroup>
        </CollapsibleGroup>
      </div>

      <div className="mt-auto p-3 border-t">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <span>AS</span>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-sidebar-foreground truncate">Alejandro Sánchez</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">Gerente de Proyecto</p>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
