
import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import MyTasks from '../components/dashboard/MyTasks';
import Timesheet from '../components/dashboard/Timesheet';
import TaskList from '../components/project/TaskList';
import ProjectHeader from '../components/project/ProjectHeader';
import KanbanView from '../components/project/KanbanView';
import GanttView from '../components/project/GanttView';
import WorkloadView from '../components/project/WorkloadView';
import Portfolio from '../components/project/Portfolio';
import { toast } from 'sonner';

export default function Index() {
  const [activeSection, setActiveSection] = useState<'project' | 'my-tasks' | 'timesheet' | 'portfolio'>('project');
  const [projectView, setProjectView] = useState<'list' | 'kanban' | 'gantt' | 'workload'>('list');
  
  useEffect(() => {
    // Mostrar un toast de bienvenida
    toast.success('¡Bienvenido a FlowPro!', {
      description: 'Tu gestor de proyectos y tareas profesional',
    });
  }, []);
  
  // Mock project data
  const project = {
    id: '1a',
    name: 'Proyecto 1A',
    startDate: '04/03/2025',
    endDate: '03/04/2025',
    team: 'Equipo de Desarrollo',
    portfolio: 'Portafolio 1',
    isPublic: true
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'my-tasks':
        return <MyTasks />;
      case 'timesheet':
        return <Timesheet />;
      case 'portfolio':
        return <Portfolio />;
      case 'project':
      default:
        return (
          <>
            <ProjectHeader 
              project={project} 
              activeView={projectView}
              onChangeView={setProjectView}
            />
            <div className="flex-1 overflow-hidden">
              {projectView === 'list' && <TaskList />}
              {projectView === 'kanban' && <KanbanView />}
              {projectView === 'gantt' && <GanttView />}
              {projectView === 'workload' && <WorkloadView />}
            </div>
          </>
        );
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
}
