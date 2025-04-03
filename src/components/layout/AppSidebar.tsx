
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Calendar, CheckSquare, ChevronDown, ChevronRight, Clock, FolderKanban, 
  Layers, MoreHorizontal, Plus, Settings, Bell, LogOut, Users, Building2, Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import Logo from '../Logo';

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
  color = 'bg-primary'
}: { 
  label: string; 
  children: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
  icon?: React.ElementType;
  color?: string;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="space-y-1">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-sidebar-foreground"
      >
        <span className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-sidebar-foreground/70" />}
          {label}
          {count !== undefined && (
            <span className="ml-1 text-xs text-muted-foreground">({count})</span>
          )}
        </span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-sidebar-foreground/50" />
        ) : (
          <ChevronRight className="w-4 h-4 text-sidebar-foreground/50" />
        )}
      </button>
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
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
        
        <CollapsibleGroup 
          label="Tareas sin proyecto asignado" 
          defaultOpen={true}
          icon={FolderKanban}
        >
          <NavLink to="/tareas-sin-proyecto" className="w-full text-left text-xs flex items-center gap-1 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent hover:text-accent-foreground">
            <span className="inline-block">Ver todas las tareas</span>
          </NavLink>
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
            <Plus className="mr-1 h-3.5 w-3.5" />
            Agregar tarea
          </Button>
        </CollapsibleGroup>

        <CollapsibleGroup 
          label="Equipo de Desarrollo" 
          count={2} 
          defaultOpen={true}
          icon={Users}
          color="bg-blue-500"
        >
          <NavLink to="/equipos/desarrollo" className="w-full text-left text-xs flex items-center gap-1 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent hover:text-accent-foreground">
            <Building2 className="h-3.5 w-3.5 mr-1" />
            <span className="inline-block">Dashboard de equipo</span>
          </NavLink>
          
          <CollapsibleGroup 
            label="Portafolio 1" 
            count={2}
            icon={Briefcase}
            color="bg-purple-500"
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
