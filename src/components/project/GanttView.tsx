
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

interface Task {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  collapsed?: boolean;
  assignedTo?: {
    name: string;
    initials: string;
  };
  subtasks?: Task[];
}

interface GanttViewProps {
  projectId: string;
}

export default function GanttView({ projectId }: GanttViewProps) {
  // Sample data for demonstration
  const tasks: Task[] = [
    {
      id: 'phase-1',
      name: 'Fase 1: Planificación',
      startDate: new Date(2025, 3, 1),
      endDate: new Date(2025, 3, 15),
      progress: 100,
      collapsed: false,
      subtasks: [
        {
          id: 'task-1',
          name: 'Definición de requisitos',
          startDate: new Date(2025, 3, 1),
          endDate: new Date(2025, 3, 10),
          progress: 100,
          assignedTo: {
            name: 'Carlos Pérez',
            initials: 'CP'
          },
          subtasks: [
            {
              id: 'subtask-1',
              name: 'Entrevistas con stakeholders',
              startDate: new Date(2025, 3, 1),
              endDate: new Date(2025, 3, 5),
              progress: 100,
              assignedTo: {
                name: 'Carlos Pérez',
                initials: 'CP'
              }
            },
            {
              id: 'subtask-2',
              name: 'Documentación de requisitos',
              startDate: new Date(2025, 3, 6),
              endDate: new Date(2025, 3, 10),
              progress: 100,
              assignedTo: {
                name: 'Carlos Pérez',
                initials: 'CP'
              }
            }
          ]
        },
        {
          id: 'task-2',
          name: 'Planificación de sprints',
          startDate: new Date(2025, 3, 11),
          endDate: new Date(2025, 3, 15),
          progress: 50,
          assignedTo: {
            name: 'Ana Gómez',
            initials: 'AG'
          }
        }
      ]
    },
    {
      id: 'phase-2',
      name: 'Fase 2: Desarrollo',
      startDate: new Date(2025, 3, 16),
      endDate: new Date(2025, 3, 30),
      progress: 0,
      collapsed: false,
      subtasks: [
        {
          id: 'task-3',
          name: 'Desarrollo del backend',
          startDate: new Date(2025, 3, 16),
          endDate: new Date(2025, 3, 30),
          progress: 0,
          assignedTo: {
            name: 'Miguel Torres',
            initials: 'MT'
          }
        },
        {
          id: 'task-4',
          name: 'Desarrollo del frontend',
          startDate: new Date(2025, 3, 16),
          endDate: new Date(2025, 3, 30),
          progress: 0,
          assignedTo: {
            name: 'Laura Sánchez',
            initials: 'LS'
          }
        }
      ]
    }
  ];

  // Calculate the total days in the project timeframe
  const startDate = new Date(2025, 3, 1);
  const endDate = new Date(2025, 4, 30);
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
  // Generate dates for the header
  const dates = Array.from({ length: days }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date;
  });
  
  const renderTaskRow = (task: Task, level = 0) => {
    const taskStartDay = Math.ceil((task.startDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const taskDuration = Math.ceil((task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    return (
      <React.Fragment key={task.id}>
        <div className="flex items-center h-10 border-b border-gray-200">
          <div className="w-[300px] flex-shrink-0 flex items-center px-2" style={{ paddingLeft: `${level * 20 + 10}px` }}>
            {task.subtasks && task.subtasks.length > 0 && (
              <Button variant="ghost" size="icon" className="h-5 w-5 mr-1">
                {task.collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            )}
            <span className="truncate">{task.name}</span>
          </div>
          
          <div className="flex-1 relative h-full">
            <div 
              className={`absolute top-1/2 -translate-y-1/2 h-5 rounded ${level === 0 ? 'bg-blue-200' : 'bg-blue-400'}`}
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
          </div>
        </div>
        
        {!task.collapsed && task.subtasks?.map(subtask => renderTaskRow(subtask, level + 1))}
      </React.Fragment>
    );
  };
  
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
  
  return (
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
  );
}
