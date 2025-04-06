
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import ProjectHeader from '../components/project/ProjectHeader';
import TaskList from '../components/project/TaskList';
import KanbanView from '../components/project/KanbanView';
import GanttView from '../components/project/GanttView';
import WorkloadView from '../components/project/WorkloadView';
import { Button } from '@/components/ui/button';
import { Plus, Filter, SortDesc, ChevronDown, Milestone, SquarePen, ListFilter } from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';

export default function Project1A() {
  const [activeView, setActiveView] = useState<'list' | 'kanban' | 'gantt' | 'workload'>('list');
  
  const project = {
    id: 'project-1a',
    name: 'Proyecto 1A',
    startDate: '01/04/2025',
    endDate: '30/06/2025',
    team: 'Equipo de Desarrollo',
    portfolio: 'Portafolio 1'
  };

  const renderActionButtons = () => {
    return (
      <div className="p-4 flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Agregar
              <ChevronDown className="h-4 w-4 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <Milestone className="mr-2 h-4 w-4" />
              <span>Nueva fase</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SquarePen className="mr-2 h-4 w-4" />
              <span>Nueva tarea</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ListFilter className="mr-2 h-4 w-4" />
              <span>Nueva subtarea</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Milestone className="mr-2 h-4 w-4" />
              <span>Nuevo hito</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <SortDesc className="h-4 w-4" />
            Ordenar
          </Button>
        </div>
      </div>
    );
  };

  const renderView = () => {
    switch (activeView) {
      case 'list':
        return <TaskList projectId="project-1a" />;
      case 'kanban':
        return <KanbanView projectId="project-1a" />;
      case 'gantt':
        return <GanttView projectId="project-1a" />;
      case 'workload':
        return <WorkloadView />;
      default:
        return <TaskList projectId="project-1a" />;
    }
  };

  return (
    <Layout>
      <ProjectHeader 
        project={project} 
        activeView={activeView}
        onChangeView={(view) => setActiveView(view as 'list' | 'kanban' | 'gantt' | 'workload')}
      />
      
      {activeView !== 'workload' && renderActionButtons()}
      
      {renderView()}
    </Layout>
  );
}
