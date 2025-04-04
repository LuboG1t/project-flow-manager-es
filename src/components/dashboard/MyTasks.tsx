
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronRight, Calendar, Filter, SortDesc, Plus, Clock, AlertTriangle, MessageSquare } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Task {
  id: string;
  name: string;
  startDate: string;
  dueDate: string;
  duration: string;
  status: 'completed' | 'in-review' | 'in-progress' | 'new';
  priority: 'high' | 'medium' | 'low';
  location?: string;
  timeSpent: string;
}

interface Milestone {
  id: string;
  name: string;
  date: string;
  time?: string;
  project?: string;
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

export default function MyTasks() {
  const [currentDate, setCurrentDate] = useState('24 abr 2025');
  
  // Datos de tareas
  const taskGroups: Record<string, Task[]> = {
    overdue: [
      {
        id: 'task-2',
        name: 'Tarea 1',
        startDate: '20 abr 2025',
        dueDate: '22 abr 2025',
        duration: '3d',
        status: 'in-progress',
        priority: 'high',
        location: 'Portafolio 1 / Proyecto 1A',
        timeSpent: '10h/72h'
      },
      {
        id: 'task-3',
        name: 'Tarea 2',
        startDate: '18 abr 2025',
        dueDate: '21 abr 2025',
        duration: '4d',
        status: 'in-review',
        priority: 'medium',
        location: 'Sin proyecto',
        timeSpent: '8h/16h'
      }
    ],
    upcoming: [
      {
        id: 'task-4',
        name: 'Tarea 3',
        startDate: '24 abr 2025',
        dueDate: '28 abr 2025',
        duration: '5d',
        status: 'new',
        priority: 'low',
        location: 'Portafolio 1 / Proyecto 1A',
        timeSpent: '-'
      }
    ],
    pending: [
      {
        id: 'task-1',
        name: 'Tarea 4',
        startDate: '24 abr 2025',
        dueDate: '24 abr 2025',
        duration: '1d',
        status: 'in-progress',
        priority: 'high',
        location: 'Portafolio 1 / Proyecto 1A',
        timeSpent: '2h/8h'
      },
      {
        id: 'subtask-1',
        name: 'Subtarea 1',
        startDate: '24 abr 2025',
        dueDate: '24 abr 2025',
        duration: '1d',
        status: 'completed',
        priority: 'high',
        location: 'Portafolio 1 / Proyecto 1A',
        timeSpent: '8h/8h'
      },
      {
        id: 'subtask-2',
        name: 'Subtarea 2',
        startDate: '24 abr 2025',
        dueDate: '24 abr 2025',
        duration: '1d',
        status: 'completed',
        priority: 'high',
        location: 'Sin proyecto',
        timeSpent: '8h/8h'
      }
    ]
  };

  // Datos de hitos próximos
  const upcomingMilestones: Milestone[] = [
    {
      id: 'milestone-1',
      name: 'Reunión de Inicio de Proyecto',
      date: '25 abr 2025',
      time: '10:00 - 11:30',
      project: 'Proyecto 1A'
    },
    {
      id: 'milestone-2',
      name: 'Entrega de Diseños',
      date: '27 abr 2025',
      project: 'Proyecto 1B'
    },
    {
      id: 'milestone-3',
      name: 'Revisión de Avances',
      date: '29 abr 2025',
      time: '15:00 - 16:00',
      project: 'Proyecto 1A'
    },
    {
      id: 'milestone-4',
      name: 'Reunión con Cliente',
      date: '2 may 2025',
      time: '09:00 - 10:30',
      project: 'Proyecto 1B'
    }
  ];

  const renderStatusBadge = (status: Task['status']) => {
    return (
      <span className={`task-status-pill status-${status}`}>
        {statusLabels[status]}
      </span>
    );
  };

  const renderPriorityBadge = (priority: Task['priority']) => {
    return (
      <span className={`inline-flex items-center gap-1.5 ${priorityColors[priority]} px-2 py-1 rounded-md text-xs font-medium`}>
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
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
    );
  };

  const renderTaskTable = (tasks: Task[], title: string) => {
    return (
      <div className="space-y-2 w-full">
        <h3 className="text-lg font-medium px-4">{title}</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Nombre</TableHead>
              <TableHead>Fecha de inicio</TableHead>
              <TableHead>Fecha de vencimiento</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Tiempo empleado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-muted/40">
                <TableCell className="font-medium">
                  {task.name.startsWith('Sub') ? (
                    <span className="inline-block ml-6">{task.name}</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      <span>{task.name}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>{task.startDate}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.duration}</TableCell>
                <TableCell>{renderStatusBadge(task.status)}</TableCell>
                <TableCell>{renderPriorityBadge(task.priority)}</TableCell>
                <TableCell>{task.location}</TableCell>
                <TableCell>
                  <span className={
                    task.timeSpent === '-' ? 'text-muted-foreground' : 
                    task.timeSpent.split('/')[0] === task.timeSpent.split('/')[1] ? 'text-green-600' : 'text-red-600'
                  }>
                    {task.timeSpent}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderMilestones = () => {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            Próximos Hitos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {upcomingMilestones.map((milestone) => (
              <div key={milestone.id} className="p-4 flex items-start gap-3 hover:bg-muted/50">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{milestone.name}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {milestone.date}
                    </span>
                    {milestone.time && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {milestone.time}
                      </span>
                    )}
                  </div>
                  {milestone.project && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {milestone.project}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderOverdueTasks = () => {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Tareas Vencidas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[200px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Vencimiento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Proyecto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taskGroups.overdue.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.name}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>{renderStatusBadge(task.status)}</TableCell>
                    <TableCell>{renderPriorityBadge(task.priority)}</TableCell>
                    <TableCell>{task.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mis tareas</h1>
          <p className="text-muted-foreground">Gestiona tus tareas personales y de proyectos</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">Lista</TabsTrigger>
              <TabsTrigger value="kanban">Kanban</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="mb-4 flex items-center justify-between">
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Agregar tarea
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="h-9 px-2 rounded-none flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{currentDate}</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
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
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Estado
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Prioridad
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Fecha
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Proyecto
                </DropdownMenuItem>
              </DropdownMenuGroup>
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
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Fecha (más reciente)
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Fecha (más antigua)
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Prioridad (alta a baja)
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Prioridad (baja a alta)
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Nombre (A-Z)
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Primera fila: Tareas Vencidas y Próximos Hitos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="col-span-1">
          {renderOverdueTasks()}
        </div>
        <div className="col-span-1">
          {renderMilestones()}
        </div>
      </div>
      
      {/* Segunda fila: Tareas próximas y pendientes */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div className="col-span-1">
          {renderTaskTable(taskGroups.upcoming, 'Tareas próximas a vencer')}
        </div>
        <div className="col-span-1">
          {renderTaskTable(taskGroups.pending, 'Tareas pendientes')}
        </div>
      </div>
    </div>
  );
}

// Componente de ChevronLeft
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
