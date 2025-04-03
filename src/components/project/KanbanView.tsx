
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal, Calendar, Clock } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { TaskDetails } from './TaskDetails';

interface Task {
  id: string;
  title: string;
  description: string;
  phase: string;
  dueDate: string;
  time?: string;
  assignee: {
    name: string;
    initials: string;
  };
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

export default function KanbanView() {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  const initialColumns: KanbanColumn[] = [
    {
      id: 'doing',
      title: 'Haciendo',
      color: 'bg-blue-500',
      tasks: [
        {
          id: 'task-1',
          title: 'Desarrollar un plan de gestión de la comunicación',
          description: 'Desarrollar un plan de gestión de la comunicación...',
          phase: 'Fase 1',
          dueDate: '8 de mayo',
          time: '2 horas',
          assignee: {
            name: 'Mariangel',
            initials: 'MA'
          }
        },
        {
          id: 'task-2',
          title: 'Identificar canales de comunicación',
          description: 'Desarrollar un plan de gestión de la comunicación...',
          phase: 'Fase 1',
          dueDate: '8 de mayo',
          time: '1 hora',
          assignee: {
            name: 'Mariangel',
            initials: 'MA'
          }
        },
        {
          id: 'task-3',
          title: 'Identificar y documentar el enfoque de gestión',
          description: 'Desarrollar un plan de gestión de la comunicación...',
          phase: 'Fase 1',
          dueDate: '8 de mayo',
          time: '1 hora y 30 minutos',
          assignee: {
            name: 'Mariangel',
            initials: 'MA'
          }
        }
      ]
    },
    {
      id: 'done',
      title: 'Hecho',
      color: 'bg-green-500',
      tasks: []
    },
    {
      id: 'waiting',
      title: 'En espera',
      color: 'bg-red-500',
      tasks: []
    }
  ];
  
  const [columns, setColumns] = useState(initialColumns);

  const selectedTask = columns
    .flatMap(column => column.tasks)
    .find(task => task.id === selectedTaskId);
  
  // Convert Kanban task to TaskDetails format
  const mapKanbanTaskToDetailFormat = (task: Task | undefined) => {
    if (!task) return undefined;
    
    return {
      id: task.id,
      name: task.title,
      startDate: '04/05/2025',
      endDate: task.dueDate,
      duration: task.time || '1d',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: task.assignee,
      timeSpent: '2h/8h',
    };
  };
  
  return (
    <div className="flex h-full">
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex gap-4">
          {columns.map((column) => (
            <div key={column.id} className="flex-1 min-w-[300px] max-w-[350px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                  <h3 className="font-medium">{column.title}</h3>
                  <span className="bg-muted rounded-full px-2 text-xs text-muted-foreground">
                    {column.tasks.length}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                {column.id === 'doing' && (
                  <div className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-2 pl-2">
                    Fase 1
                  </div>
                )}
                {column.tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="bg-card rounded-md p-3 border shadow-sm hover:shadow transition-shadow cursor-pointer"
                    onClick={() => setSelectedTaskId(task.id)}
                  >
                    <h4 className="font-medium text-sm mb-2">{task.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {task.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-muted-foreground text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>{task.dueDate}</span>
                      </div>
                      
                      {task.time && (
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Clock className="h-3 w-3" />
                          <span>{task.time}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-2 pt-2 border-t">
                      <span></span>
                      <Avatar className="h-6 w-6 bg-primary">
                        <span className="text-[10px]">{task.assignee.initials}</span>
                      </Avatar>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-foreground py-6 border border-dashed"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir una tarea
                </Button>
              </div>
            </div>
          ))}
          
          <div className="flex-shrink-0 w-[300px] flex flex-col">
            <Button variant="outline" className="gap-2 mb-4">
              <Plus className="h-4 w-4" />
              Añadir escenario
            </Button>
          </div>
        </div>
      </div>
      
      {selectedTaskId && (
        <TaskDetails 
          task={mapKanbanTaskToDetailFormat(selectedTask)}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
}
