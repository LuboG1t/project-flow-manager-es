import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  ChevronDown, ChevronRight, Plus, Filter, SortDesc, Milestone, 
  ListFilter, SquarePen, Calendar, Edit
} from 'lucide-react';
import { TaskDetails } from './TaskDetails';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger 
} from '@/components/ui/tooltip';
import { useLocation } from 'react-router-dom';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    avatar?: string;
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
    avatar?: string;
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

const priorityColors = {
  'high': 'text-red-500 bg-red-50',
  'medium': 'text-amber-500 bg-amber-50',
  'low': 'text-green-500 bg-green-50',
};

const phases: Phase[] = [
  {
    id: 'phase-1',
    name: 'Fase 1: Planificación',
    tasks: [
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
        subtasks: [
          {
            id: 'subtask-1',
            name: 'Entrevistas con stakeholders',
            startDate: '01/04/2025',
            endDate: '05/04/2025',
            duration: '5d',
            status: 'completed',
            priority: 'high',
            assignedTo: {
              name: 'Carlos Pérez',
              initials: 'CP',
              avatar: ''
            },
            timeSpent: '20h/20h'
          },
          {
            id: 'subtask-2',
            name: 'Documentación de requisitos',
            startDate: '06/04/2025',
            endDate: '10/04/2025',
            duration: '5d',
            status: 'completed',
            priority: 'high',
            assignedTo: {
              name: 'Carlos Pérez',
              initials: 'CP',
              avatar: ''
            },
            timeSpent: '20h/20h'
          }
        ]
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
        timeSpent: '10h/20h'
      }
    ]
  },
  {
    id: 'phase-2',
    name: 'Fase 2: Desarrollo',
    tasks: [
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
        timeSpent: '-'
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
        timeSpent: '-'
      }
    ]
  }
];

interface TaskListProps {
  projectId?: string;
}

export default function TaskList({ projectId }: TaskListProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    'phase-1': true
  });
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});
  const [editingCell, setEditingCell] = useState<{id: string, field: string} | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const location = useLocation();
  
  const isIndependentTasks = location.pathname === '/tareas-sin-proyecto';

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

  const renderPriorityBadge = (priority: Task['priority']) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={`inline-flex items-center gap-1.5 ${priorityColors[priority]} px-2 py-1 rounded-md text-xs`}>
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path
                  d="M12 7.75V12.25M12 16.25V16.26M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{priorityLabels[priority]}</span>
            </span>
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
  
  const handleStartEdit = (id: string, field: string, initialValue: string) => {
    setEditingCell({ id, field });
    setEditValue(initialValue);
  };
  
  const handleSaveEdit = () => {
    console.log("Guardar cambio:", editingCell, editValue);
    setEditingCell(null);
  };
  
  const renderEditableDate = (id: string, date: string, field: string) => {
    if (editingCell?.id === id && editingCell?.field === field) {
      return (
        <div>
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
            className="h-8 w-full"
            autoFocus
          />
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleStartEdit(id, field, date)}>
        {date}
        <Edit className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };
  
  const renderEditableDuration = (id: string, duration: string) => {
    if (editingCell?.id === id && editingCell?.field === 'duration') {
      return (
        <div>
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
            className="h-8 w-full"
            autoFocus
          />
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleStartEdit(id, 'duration', duration)}>
        {duration}
        <Edit className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };
  
  const renderEditableStatus = (id: string, status: Task['status']) => {
    if (editingCell?.id === id && editingCell?.field === 'status') {
      return (
        <Select 
          defaultValue={status} 
          onValueChange={(value) => {
            setEditValue(value);
            setTimeout(handleSaveEdit, 0);
          }}
        >
          <SelectTrigger className="w-full h-8">
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">Nuevo</SelectItem>
            <SelectItem value="in-progress">En progreso</SelectItem>
            <SelectItem value="in-review">En revisión</SelectItem>
            <SelectItem value="completed">Completado</SelectItem>
          </SelectContent>
        </Select>
      );
    }
    return (
      <div className="cursor-pointer" onClick={() => handleStartEdit(id, 'status', status)}>
        {renderStatusBadge(status)}
      </div>
    );
  };
  
  const renderEditablePriority = (id: string, priority: Task['priority']) => {
    if (editingCell?.id === id && editingCell?.field === 'priority') {
      return (
        <Select 
          defaultValue={priority} 
          onValueChange={(value) => {
            setEditValue(value);
            setTimeout(handleSaveEdit, 0);
          }}
        >
          <SelectTrigger className="w-full h-8">
            <SelectValue placeholder="Seleccionar prioridad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Baja</SelectItem>
            <SelectItem value="medium">Media</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
          </SelectContent>
        </Select>
      );
    }
    return (
      <div className="cursor-pointer" onClick={() => handleStartEdit(id, 'priority', priority)}>
        {renderPriorityBadge(priority)}
      </div>
    );
  };
  
  const renderEditableTime = (id: string, timeSpent: string) => {
    if (timeSpent === '-') return <span className="text-muted-foreground">-</span>;
    
    if (editingCell?.id === id && editingCell?.field === 'time') {
      return (
        <div>
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
            className="h-8 w-full"
            autoFocus
          />
        </div>
      );
    }
    
    const [spent, total] = timeSpent.split('/');
    const isComplete = spent === total;
    
    return (
      <div 
        className={`flex items-center gap-1 cursor-pointer ${isComplete ? 'text-green-600' : 'text-red-600'}`}
        onClick={() => handleStartEdit(id, 'time', timeSpent)}
      >
        {timeSpent}
        <Edit className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  const selectedTask = phases.flatMap(phase => 
    phase.tasks.find(task => task.id === selectedTaskId) || 
    phase.tasks.flatMap(task => task.subtasks || []).find(subtask => subtask.id === selectedTaskId)
  ).filter(Boolean)[0];

  const renderAddDropdown = () => {
    if (isIndependentTasks) {
      return (
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
              <SquarePen className="mr-2 h-4 w-4" />
              <span>Nueva tarea</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ListFilter className="mr-2 h-4 w-4" />
              <span>Nueva subtarea</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      return (
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
      );
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-auto">
        <div className="p-4 flex items-center justify-between">
          {renderAddDropdown()}
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Filter className="h-4 w-4" />
                  Filtrar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Estado
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Prioridad
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Asignado a
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Fecha
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <SortDesc className="h-4 w-4" />
                  Ordenar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Nombre (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Nombre (Z-A)
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Fecha de inicio (más reciente)
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Fecha de inicio (más antigua)
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Fecha de vencimiento (más cercana)
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Prioridad (alta a baja)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                {!isIndependentTasks && (
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
                )}
                {(expandedPhases[phase.id] || isIndependentTasks) && phase.tasks.map((task) => (
                  <React.Fragment key={task.id}>
                    <TableRow 
                      className={`hover:bg-muted/40 group ${selectedTaskId === task.id ? 'bg-muted/60' : ''}`}
                    >
                      <TableCell className="font-medium pl-4 md:pl-16">
                        <div className="flex items-center gap-2">
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
                        </div>
                      </TableCell>
                      <TableCell className="group">
                        {renderEditableDate(task.id, task.startDate, 'startDate')}
                      </TableCell>
                      <TableCell className="group">
                        {renderEditableDate(task.id, task.endDate, 'endDate')}
                      </TableCell>
                      <TableCell className="group">
                        {renderEditableDuration(task.id, task.duration)}
                      </TableCell>
                      <TableCell>
                        {renderEditableStatus(task.id, task.status)}
                      </TableCell>
                      <TableCell>
                        {renderEditablePriority(task.id, task.priority)}
                      </TableCell>
                      <TableCell>
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={task.assignedTo.avatar} />
                          <AvatarFallback>{task.assignedTo.initials}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="group">
                        {renderEditableTime(task.id, task.timeSpent)}
                      </TableCell>
                    </TableRow>
                    {expandedTasks[task.id] && task.subtasks?.map((subtask) => (
                      <TableRow 
                        key={subtask.id}
                        className={`hover:bg-muted/30 group ${selectedTaskId === subtask.id ? 'bg-muted/40' : ''}`}
                      >
                        <TableCell className="font-normal pl-16 md:pl-24">
                          <button
                            onClick={() => handleTaskClick(subtask.id)}
                            className="hover:underline"
                          >
                            {subtask.name}
                          </button>
                        </TableCell>
                        <TableCell className="group">
                          {renderEditableDate(subtask.id, subtask.startDate, 'startDate')}
                        </TableCell>
                        <TableCell className="group">
                          {renderEditableDate(subtask.id, subtask.endDate, 'endDate')}
                        </TableCell>
                        <TableCell className="group">
                          {renderEditableDuration(subtask.id, subtask.duration)}
                        </TableCell>
                        <TableCell>
                          {renderEditableStatus(subtask.id, subtask.status)}
                        </TableCell>
                        <TableCell>
                          {renderEditablePriority(subtask.id, subtask.priority)}
                        </TableCell>
                        <TableCell>
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={subtask.assignedTo.avatar} />
                            <AvatarFallback>{subtask.assignedTo.initials}</AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="group">
                          {renderEditableTime(subtask.id, subtask.timeSpent)}
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
