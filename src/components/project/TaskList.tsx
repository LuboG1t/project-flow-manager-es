
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronRight, Plus, Filter, SortDesc, Milestone, ListFilter, SquarePen } from 'lucide-react';
import { TaskDetails } from './TaskDetails';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Tipos de datos
interface Subtask {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'in-review' | 'new';
  priority: 'high' | 'medium' | 'low';
  assignedTo: {
    name: string;
    initials: string;
  };
  timeSpent: string;
}

interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'in-review' | 'new';
  priority: 'high' | 'medium' | 'low';
  assignedTo: {
    name: string;
    initials: string;
  };
  timeSpent: string;
  subtasks?: Subtask[];
  isMilestone?: boolean;
}

interface Phase {
  id: string;
  name: string;
  tasks: Task[];
}

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

export default function TaskList() {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    'phase-1': true
  });
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});

  // Mock data
  const phases: Phase[] = [
    {
      id: 'phase-1',
      name: 'Fase 1',
      tasks: [
        {
          id: 'task-1',
          name: 'Tarea 1',
          startDate: '24/03/2025',
          endDate: '28/03/2025',
          duration: '5d',
          status: 'in-review',
          priority: 'high',
          assignedTo: {
            name: 'Mariangel',
            initials: 'MA'
          },
          timeSpent: '10h/72h',
          subtasks: [
            {
              id: 'subtask-1',
              name: 'Subtarea 1',
              startDate: '24/03/2025',
              endDate: '24/03/2025',
              duration: '1d',
              status: 'completed',
              priority: 'high',
              assignedTo: {
                name: 'Mariangel',
                initials: 'MA'
              },
              timeSpent: '8h/8h'
            },
            {
              id: 'subtask-2',
              name: 'Subtarea 2',
              startDate: '24/03/2025',
              endDate: '24/03/2025',
              duration: '1d',
              status: 'completed',
              priority: 'high',
              assignedTo: {
                name: 'Mariangel',
                initials: 'MA'
              },
              timeSpent: '8h/8h'
            }
          ]
        },
        {
          id: 'task-2',
          name: 'Sistema de Gestión de Tickets',
          startDate: '24/03/2025',
          endDate: '28/03/2025',
          duration: '5d',
          status: 'in-review',
          priority: 'high',
          assignedTo: {
            name: 'Mariangel',
            initials: 'MA'
          },
          timeSpent: '10h/72h',
          subtasks: [
            {
              id: 'subtask-3',
              name: 'Subitem',
              startDate: '20/03/2025',
              endDate: '20/03/2025',
              duration: '1d',
              status: 'completed',
              priority: 'high',
              assignedTo: {
                name: 'Mariangel',
                initials: 'MA'
              },
              timeSpent: '8h/8h'
            },
            {
              id: 'subtask-4',
              name: 'Another subitem',
              startDate: '21/03/2025',
              endDate: '21/03/2025',
              duration: '1d',
              status: 'completed',
              priority: 'high',
              assignedTo: {
                name: 'Mariangel',
                initials: 'MA'
              },
              timeSpent: '8h/8h'
            }
          ]
        },
        {
          id: 'task-3',
          name: 'Estructura de la página',
          startDate: '01/04/2025',
          endDate: '03/04/2025',
          duration: '3d',
          status: 'new',
          priority: 'high',
          assignedTo: {
            name: 'Mariangel',
            initials: 'MA'
          },
          timeSpent: '-'
        }
      ]
    }
  ];

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const toggleTask = (taskId: string) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId === selectedTaskId ? null : taskId);
  };

  const getStatusClass = (status: Task['status']) => {
    return `status-${status}`;
  };

  const renderPriorityIcon = (priority: Task['priority']) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge
              variant="outline"
              className={`priority-${priority} rounded-md px-1.5 py-0.5`}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="M12 7.75V12.25M12 16.25V16.26M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Prioridad: {priorityLabels[priority]}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const renderStatusBadge = (status: Task['status']) => {
    return (
      <span className={`task-status-pill ${getStatusClass(status)}`}>
        {statusLabels[status]}
      </span>
    );
  };

  const selectedTask = phases.flatMap(phase => 
    phase.tasks.find(task => task.id === selectedTaskId) || 
    phase.tasks.flatMap(task => task.subtasks || []).find(subtask => subtask.id === selectedTaskId)
  ).filter(Boolean)[0];

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-auto">
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

        <Table>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead className="w-[300px]">Nombre</TableHead>
              <TableHead>Fecha de inicio</TableHead>
              <TableHead>Fecha de vencimiento</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Asignado</TableHead>
              <TableHead>Tiempo empleado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {phases.map((phase) => (
              <React.Fragment key={phase.id}>
                <TableRow className="group hover:bg-muted/50">
                  <TableCell colSpan={8} className="p-0">
                    <button
                      onClick={() => togglePhase(phase.id)}
                      className="flex items-center w-full p-3 text-left font-medium hover:bg-muted/40"
                    >
                      {expandedPhases[phase.id] ? (
                        <ChevronDown className="h-4 w-4 mr-2 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                      )}
                      {phase.name}
                    </button>
                  </TableCell>
                </TableRow>
                {expandedPhases[phase.id] && phase.tasks.map((task) => (
                  <React.Fragment key={task.id}>
                    <TableRow 
                      className={`hover:bg-muted/40 ${selectedTaskId === task.id ? 'bg-muted/60' : ''} group`}
                    >
                      <TableCell className="font-medium flex items-center gap-2">
                        {task.subtasks && (
                          <button
                            onClick={() => toggleTask(task.id)}
                            className="flex-shrink-0 p-0.5 rounded hover:bg-muted"
                          >
                            {expandedTasks[task.id] ? (
                              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => handleTaskClick(task.id)}
                          className="hover:underline"
                        >
                          {task.name}
                        </button>
                      </TableCell>
                      <TableCell>{task.startDate}</TableCell>
                      <TableCell>{task.endDate}</TableCell>
                      <TableCell>{task.duration}</TableCell>
                      <TableCell>{renderStatusBadge(task.status)}</TableCell>
                      <TableCell>{renderPriorityIcon(task.priority)}</TableCell>
                      <TableCell>
                        <Avatar className="h-7 w-7 bg-primary">
                          <span className="text-xs">{task.assignedTo.initials}</span>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <span className={task.timeSpent === '-' ? 'text-muted-foreground' : 
                          task.timeSpent.split('/')[0] === task.timeSpent.split('/')[1] ? 'text-green-600' : 'text-red-600'
                        }>
                          {task.timeSpent}
                        </span>
                      </TableCell>
                    </TableRow>
                    {expandedTasks[task.id] && task.subtasks?.map((subtask) => (
                      <TableRow 
                        key={subtask.id}
                        className={`hover:bg-muted/30 ${selectedTaskId === subtask.id ? 'bg-muted/40' : ''}`}
                      >
                        <TableCell className="font-normal pl-10">
                          <button
                            onClick={() => handleTaskClick(subtask.id)}
                            className="hover:underline"
                          >
                            {subtask.name}
                          </button>
                        </TableCell>
                        <TableCell>{subtask.startDate}</TableCell>
                        <TableCell>{subtask.endDate}</TableCell>
                        <TableCell>{subtask.duration}</TableCell>
                        <TableCell>{renderStatusBadge(subtask.status)}</TableCell>
                        <TableCell>{renderPriorityIcon(subtask.priority)}</TableCell>
                        <TableCell>
                          <Avatar className="h-7 w-7 bg-primary">
                            <span className="text-xs">{subtask.assignedTo.initials}</span>
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <span className={subtask.timeSpent === '-' ? 'text-muted-foreground' : 
                            subtask.timeSpent.split('/')[0] === subtask.timeSpent.split('/')[1] ? 'text-green-600' : 'text-red-600'
                          }>
                            {subtask.timeSpent}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {selectedTaskId && (
        <TaskDetails 
          task={selectedTask}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
}
