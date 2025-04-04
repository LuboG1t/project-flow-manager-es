
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, Plus, MoreHorizontal, UserPlus } from 'lucide-react';
import { TaskDetails } from './TaskDetails';

interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'in-review' | 'new';
  priority: 'high' | 'medium' | 'low';
  assignedTo?: {
    name: string;
    initials: string;
    avatar?: string;
  };
  timeSpent: string;
  description?: string;
}

interface KanbanViewProps {
  projectId?: string;
}

export default function KanbanView({ projectId }: KanbanViewProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  const statusLabels = {
    'completed': 'Completado',
    'in-progress': 'En progreso',
    'in-review': 'En revisión',
    'new': 'Nuevo'
  };

  const priorityLabels = {
    'high': 'Alta',
    'medium': 'Media',
    'low': 'Baja'
  };

  // Sample data for the kanban view
  const tasks: Task[] = [
    {
      id: 'task-1',
      name: 'Definición de requisitos',
      startDate: '01/04/2025',
      endDate: '10/04/2025',
      duration: '10d',
      status: 'completed',
      priority: 'high',
      assignedTo: {
        name: 'Carlos Pérez',
        initials: 'CP',
        avatar: ''
      },
      timeSpent: '40h/40h',
      description: 'Realizar reuniones con los stakeholders para definir los requisitos del proyecto.'
    },
    {
      id: 'task-2',
      name: 'Planificación de sprints',
      startDate: '11/04/2025',
      endDate: '15/04/2025',
      duration: '5d',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: {
        name: 'Ana Gómez',
        initials: 'AG',
        avatar: ''
      },
      timeSpent: '10h/20h',
      description: 'Planificar los sprints del proyecto basándose en los requisitos definidos.'
    },
    {
      id: 'task-3',
      name: 'Desarrollo del backend',
      startDate: '16/04/2025',
      endDate: '30/04/2025',
      duration: '15d',
      status: 'new',
      priority: 'high',
      assignedTo: {
        name: 'Miguel Torres',
        initials: 'MT',
        avatar: ''
      },
      timeSpent: '-',
      description: 'Desarrollar la API y la lógica de negocio del backend.'
    },
    {
      id: 'task-4',
      name: 'Desarrollo del frontend',
      startDate: '16/04/2025',
      endDate: '30/04/2025',
      duration: '15d',
      status: 'new',
      priority: 'high',
      assignedTo: {
        name: 'Laura Sánchez',
        initials: 'LS',
        avatar: ''
      },
      timeSpent: '-',
      description: 'Desarrollar la interfaz de usuario según los diseños aprobados.'
    },
    {
      id: 'task-5',
      name: 'Crear documento de arquitectura',
      startDate: '05/04/2025',
      endDate: '08/04/2025',
      duration: '4d',
      status: 'in-review',
      priority: 'medium',
      assignedTo: {
        name: 'Carlos Pérez',
        initials: 'CP',
        avatar: ''
      },
      timeSpent: '16h/16h',
      description: 'Preparar documentación técnica describiendo la arquitectura del sistema.'
    }
  ];

  // Group tasks by status for Kanban view
  const tasksByStatus = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<string, Task[]>);
  
  const kanbanColumns = [
    { id: 'new', title: 'Nuevo', tasks: tasksByStatus['new'] || [] },
    { id: 'in-progress', title: 'En progreso', tasks: tasksByStatus['in-progress'] || [] },
    { id: 'in-review', title: 'En revisión', tasks: tasksByStatus['in-review'] || [] },
    { id: 'completed', title: 'Completado', tasks: tasksByStatus['completed'] || [] },
  ];

  const selectedTask = tasks.find(task => task.id === selectedTaskId);

  return (
    <div className="flex h-full px-4 pb-4">
      <div className="flex gap-4 flex-1 overflow-auto">
        {kanbanColumns.map((column) => (
          <div key={column.id} className="flex-1 min-w-[280px] max-w-[320px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-status-${column.id}`}></div>
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
              {column.tasks.map((task) => (
                <Card 
                  key={task.id} 
                  className="cursor-pointer hover:shadow transition-shadow"
                  onClick={() => setSelectedTaskId(task.id)}
                >
                  <CardContent className="p-3">
                    <h4 className="font-medium text-sm mb-2">{task.name}</h4>
                    {task.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-muted-foreground text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>{task.endDate}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-muted-foreground text-xs">
                        <Clock className="h-3 w-3" />
                        <span>{task.timeSpent !== '-' ? task.timeSpent : 'No iniciado'}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2 pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className={`text-priority-${task.priority} text-[10px] px-1.5`}>
                          {priorityLabels[task.priority]}
                        </Badge>
                      </div>
                      {task.assignedTo ? (
                        <Avatar className="h-6 w-6 bg-primary">
                          <span className="text-[10px]">{task.assignedTo.initials}</span>
                        </Avatar>
                      ) : (
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                          <UserPlus className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
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
      </div>
      
      {selectedTaskId && selectedTask && (
        <TaskDetails 
          task={{
            id: selectedTask.id,
            name: selectedTask.name,
            startDate: selectedTask.startDate,
            endDate: selectedTask.endDate,
            duration: selectedTask.duration,
            status: selectedTask.status,
            priority: selectedTask.priority,
            assignedTo: selectedTask.assignedTo || {
              name: 'Sin asignar',
              initials: 'SA'
            },
            timeSpent: selectedTask.timeSpent,
          }}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
}
