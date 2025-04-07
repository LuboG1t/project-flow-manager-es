
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
      <></>
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
