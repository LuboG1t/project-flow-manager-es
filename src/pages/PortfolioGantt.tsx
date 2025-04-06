
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronDown, Download, Filter, SortDesc, Share2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Task {
  id: string;
  name: string;
  project: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  subtasks?: Task[];
  dependencies?: string[];
  assignedTo?: {
    name: string;
    initials: string;
  };
}

export default function PortfolioGantt() {
  const navigate = useNavigate();
  
  // Sample data for the complete Gantt chart
  const tasks: Task[] = [
    {
      id: 'project-1a',
      name: 'Proyecto 1A',
      project: 'Proyecto 1A',
      startDate: new Date(2025, 3, 1),
      endDate: new Date(2025, 3, 30),
      progress: 60,
      subtasks: [
        {
          id: 'task-1a-1',
          name: 'Diseño de UI',
          project: 'Proyecto 1A',
          startDate: new Date(2025, 3, 1),
          endDate: new Date(2025, 3, 10),
          progress: 100,
          assignedTo: {
            name: 'Ana M.',
            initials: 'AM'
          }
        },
        {
          id: 'task-1a-2',
          name: 'Desarrollo Frontend',
          project: 'Proyecto 1A',
          startDate: new Date(2025, 3, 11),
          endDate: new Date(2025, 3, 20),
          progress: 70,
          dependencies: ['task-1a-1'],
          assignedTo: {
            name: 'Guillermo V.',
            initials: 'GV'
          }
        },
        {
          id: 'task-1a-3',
          name: 'Integración Backend',
          project: 'Proyecto 1A',
          startDate: new Date(2025, 3, 18),
          endDate: new Date(2025, 3, 30),
          progress: 30,
          dependencies: ['task-1a-2'],
          assignedTo: {
            name: 'Mariangel',
            initials: 'MA'
          }
        }
      ]
    },
    {
      id: 'project-1b',
      name: 'Proyecto 1B',
      project: 'Proyecto 1B',
      startDate: new Date(2025, 3, 5),
      endDate: new Date(2025, 4, 15),
      progress: 30,
      subtasks: [
        {
          id: 'task-1b-1',
          name: 'Investigación',
          project: 'Proyecto 1B',
          startDate: new Date(2025, 3, 5),
          endDate: new Date(2025, 3, 15),
          progress: 100,
          assignedTo: {
            name: 'Carlos P.',
            initials: 'CP'
          }
        },
        {
          id: 'task-1b-2',
          name: 'Prototipado',
          project: 'Proyecto 1B',
          startDate: new Date(2025, 3, 16),
          endDate: new Date(2025, 3, 30),
          progress: 50,
          dependencies: ['task-1b-1'],
          assignedTo: {
            name: 'Ana M.',
            initials: 'AM'
          }
        },
        {
          id: 'task-1b-3',
          name: 'Implementación',
          project: 'Proyecto 1B',
          startDate: new Date(2025, 4, 1),
          endDate: new Date(2025, 4, 15),
          progress: 0,
          dependencies: ['task-1b-2', 'task-1a-3'],
          assignedTo: {
            name: 'Luis R.',
            initials: 'LR'
          }
        }
      ]
    },
    {
      id: 'project-1c',
      name: 'Proyecto 1C',
      project: 'Proyecto 1C',
      startDate: new Date(2025, 3, 15),
      endDate: new Date(2025, 5, 15),
      progress: 5,
      subtasks: [
        {
          id: 'task-1c-1',
          name: 'Planificación',
          project: 'Proyecto 1C',
          startDate: new Date(2025, 3, 15),
          endDate: new Date(2025, 3, 25),
          progress: 50,
          assignedTo: {
            name: 'Guillermo V.',
            initials: 'GV'
          }
        },
        {
          id: 'task-1c-2',
          name: 'Desarrollo',
          project: 'Proyecto 1C',
          startDate: new Date(2025, 4, 1),
          endDate: new Date(2025, 5, 1),
          progress: 0,
          dependencies: ['task-1c-1'],
          assignedTo: {
            name: 'Mariangel',
            initials: 'MA'
          }
        },
        {
          id: 'task-1c-3',
          name: 'Testing',
          project: 'Proyecto 1C',
          startDate: new Date(2025, 5, 1),
          endDate: new Date(2025, 5, 15),
          progress: 0,
          dependencies: ['task-1c-2'],
          assignedTo: {
            name: 'Carlos P.',
            initials: 'CP'
          }
        }
      ]
    }
  ];

  // Calculate the total days in the portfolio timeframe
  const startDate = new Date(2025, 3, 1); // April 1, 2025
  const endDate = new Date(2025, 5, 15); // June 15, 2025
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
  // Generate dates for the header
  const dates = Array.from({ length: days }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date;
  });
  
  // Find the month index from the dates array
  const findMonthIndices = () => {
    const months = [];
    let currentMonth = dates[0].getMonth();
    let startIndex = 0;
    
    dates.forEach((date, index) => {
      if (date.getMonth() !== currentMonth) {
        months.push({ month: currentMonth, start: startIndex, end: index - 1 });
        currentMonth = date.getMonth();
        startIndex = index;
      }
    });
    
    // Add the last month
    months.push({ month: currentMonth, start: startIndex, end: dates.length - 1 });
    
    return months;
  };
  
  const monthIndices = findMonthIndices();
  
  const renderTaskRow = (task: Task, level = 0, expanded = true) => {
    const taskStartDay = Math.ceil((task.startDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const taskDuration = Math.ceil((task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // Class based on project/level
    const getBarClass = () => {
      if (level === 0) {
        if (task.id.includes('1a')) return 'bg-blue-200';
        if (task.id.includes('1b')) return 'bg-green-200';
        if (task.id.includes('1c')) return 'bg-purple-200';
        return 'bg-gray-200';
      } else {
        if (task.project.includes('1A')) return 'bg-blue-400';
        if (task.project.includes('1B')) return 'bg-green-400';
        if (task.project.includes('1C')) return 'bg-purple-400';
        return 'bg-gray-400';
      }
    };
    
    return (
      <React.Fragment key={task.id}>
        <div className="flex items-center h-10 border-b border-gray-200">
          <div 
            className={`w-[300px] flex-shrink-0 flex items-center px-2 ${level === 0 ? 'font-medium' : ''}`} 
            style={{ paddingLeft: `${level * 20 + 10}px` }}
          >
            {task.subtasks && task.subtasks.length > 0 && (
              <Button variant="ghost" size="icon" className="h-5 w-5 mr-1">
                <ChevronDown className="h-4 w-4" />
              </Button>
            )}
            <span className="truncate">{task.name}</span>
          </div>
          
          <div className="flex-1 relative h-full">
            <div 
              className={`absolute top-1/2 -translate-y-1/2 h-5 rounded ${getBarClass()}`}
              style={{ 
                left: `${(taskStartDay / days) * 100}%`, 
                width: `${(taskDuration / days) * 100}%`,
              }}
            >
              {task.assignedTo && level > 0 && (
                <Avatar className="h-5 w-5 absolute -right-2 -top-2 border-2 border-white text-[10px]">
                  <span>{task.assignedTo.initials}</span>
                </Avatar>
              )}
              
              <div 
                className="absolute top-0 left-0 h-full bg-blue-600 rounded-l"
                style={{ width: `${task.progress}%` }}
              />
            </div>
            
            {/* Render dependency lines */}
            {task.dependencies && task.dependencies.map(depId => {
              const parentTask = findTaskById(depId, tasks);
              if (parentTask) {
                const parentEndDay = Math.ceil((parentTask.endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                const taskStartX = (taskStartDay / days) * 100;
                const parentEndX = (parentEndDay / days) * 100;
                
                // Only draw if there's actually a gap
                if (parentEndX < taskStartX) {
                  return (
                    <div 
                      key={`${depId}-${task.id}`}
                      className="absolute top-1/2 border-t border-gray-400"
                      style={{
                        left: `${parentEndX}%`,
                        width: `${taskStartX - parentEndX}%`,
                        height: '1px',
                      }}
                    >
                      <div className="absolute right-0 top-0 w-2 h-2 rounded-full bg-gray-400 -mt-1"></div>
                    </div>
                  );
                }
              }
              return null;
            })}
          </div>
        </div>
        
        {expanded && task.subtasks?.map(subtask => renderTaskRow(subtask, level + 1))}
      </React.Fragment>
    );
  };
  
  const findTaskById = (id: string, tasks: Task[]): Task | null => {
    for (const task of tasks) {
      if (task.id === id) return task;
      if (task.subtasks) {
        const found = findTaskById(id, task.subtasks);
        if (found) return found;
      }
    }
    return null;
  };
  
  return (
    <Layout>
      <div className="container py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => navigate('/portfolios/1')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Gantt del Portafolio</h1>
              <p className="text-muted-foreground">Vista completa de los proyectos y sus dependencias</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Tabs defaultValue="month">
              <TabsList>
                <TabsTrigger value="week">Semana</TabsTrigger>
                <TabsTrigger value="month">Mes</TabsTrigger>
                <TabsTrigger value="quarter">Trimestre</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Compartir
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <SortDesc className="h-4 w-4" />
            Ordenar
          </Button>
        </div>
        
        <div className="flex-1 border rounded-md bg-white overflow-hidden">
          <div className="flex h-full">
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="flex flex-col">
                {/* Header - Month and day labels */}
                <div className="flex">
                  <div className="w-[300px] flex-shrink-0 border-b border-r p-2 bg-muted/20">
                    <div className="font-medium">Tarea</div>
                  </div>
                  
                  <div className="flex-1 border-b overflow-hidden">
                    <div className="flex">
                      {/* Month labels */}
                      {monthIndices.map((item, i) => {
                        const width = ((item.end - item.start + 1) / days) * 100;
                        
                        return (
                          <div 
                            key={`month-${item.month}`} 
                            className="text-center border-r bg-muted/10 text-xs font-medium py-1"
                            style={{ width: `${width}%` }}
                          >
                            {months[item.month]}
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="flex h-6 bg-muted/5">
                      {/* Day labels */}
                      {dates.map((date, i) => (
                        <div 
                          key={`day-${i}`} 
                          className={`flex-1 text-center text-xs border-r ${date.getDay() === 0 || date.getDay() === 6 ? 'bg-muted/20' : ''}`}
                        >
                          {date.getDate()}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Task rows */}
                <div className="flex flex-col">
                  {tasks.map(task => renderTaskRow(task))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </Layout>
  );
}
