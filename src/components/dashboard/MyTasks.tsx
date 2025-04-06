
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Check, ChevronDown, Clock, Filter, SortDesc, Plus, CheckCircle, Circle, 
  MoreHorizontal, UserPlus, Calendar, KanbanSquare, ListTodo, X
} from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Card, CardContent } from '@/components/ui/card';
import { TaskDetails } from '../project/TaskDetails';

interface Task {
  id: string;
  name: string;
  startDate: string;
  dueDate: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'in-review' | 'new';
  priority: 'high' | 'medium' | 'low';
  assignedTo?: {
    name: string;
    initials: string;
  };
  timeSpent: string;
  description?: string;
  location?: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
}

export default function MyTasks() {
  const [activeView, setActiveView] = useState<'list' | 'kanban'>('list');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

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

  const pendingTasks: Task[] = [
    {
      id: 'task-1',
      name: 'Investigar nuevas tecnologías de frontend para optimizar desarrollo',
      startDate: '04 abr',
      dueDate: '10 abr',
      duration: '6d',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: {
        name: 'Guillermo V.',
        initials: 'GV'
      },
      timeSpent: '4h/20h',
      description: 'Realizar una investigación sobre las últimas tendencias y frameworks de frontend.',
      location: 'Proyecto Alpha'
    },
    {
      id: 'task-2',
      name: 'Preparar presentación para cliente potencial sobre sistema de gestión',
      startDate: '02 abr',
      dueDate: '05 abr',
      duration: '3d',
      status: 'in-review',
      priority: 'high',
      assignedTo: {
        name: 'Ana M.',
        initials: 'AM'
      },
      timeSpent: '8h/12h',
      description: 'Crear materiales de presentación para la reunión con el cliente potencial.',
      location: 'Proyecto Beta'
    },
    {
      id: 'task-3',
      name: 'Actualizar documentación interna de procesos y mejores prácticas',
      startDate: '03 abr',
      dueDate: '08 abr',
      duration: '5d',
      status: 'new',
      priority: 'low',
      timeSpent: '-',
      location: 'Sin proyecto'
    },
    {
      id: 'task-4',
      name: 'Revisar tickets de soporte pendientes de la plataforma principal',
      startDate: '01 abr',
      dueDate: '03 abr',
      duration: '2d',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: {
        name: 'Carlos P.',
        initials: 'CP'
      },
      timeSpent: '6h/6h',
      location: 'Proyecto Gamma'
    },
    {
      id: 'task-5',
      name: 'Planificar actividad de integración de equipo para fin de mes',
      startDate: '10 abr',
      dueDate: '15 abr',
      duration: '5d',
      status: 'new',
      priority: 'low',
      assignedTo: {
        name: 'Mariangel',
        initials: 'MA'
      },
      timeSpent: '-',
      location: 'Sin proyecto'
    },
    {
      id: 'task-6',
      name: 'Realizar auditoria de seguridad de la aplicación principal',
      startDate: '12 abr',
      dueDate: '20 abr',
      duration: '8d',
      status: 'new',
      priority: 'high',
      assignedTo: {
        name: 'Luis R.',
        initials: 'LR'
      },
      timeSpent: '-',
      location: 'Proyecto Delta'
    }
  ];

  const overdueTasks: Task[] = [
    {
      id: 'over-1',
      name: 'Entrega de informe trimestral de progreso',
      startDate: '15 mar',
      dueDate: '30 mar',
      duration: '15d',
      status: 'in-progress',
      priority: 'high',
      assignedTo: {
        name: 'Javier M.',
        initials: 'JM'
      },
      timeSpent: '20h/40h',
      location: 'Proyecto Alpha'
    },
    {
      id: 'over-2',
      name: 'Optimización de consultas de base de datos',
      startDate: '20 mar',
      dueDate: '28 mar',
      duration: '8d',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: {
        name: 'Pedro L.',
        initials: 'PL'
      },
      timeSpent: '12h/24h',
      location: 'Proyecto Beta'
    },
    {
      id: 'over-3',
      name: 'Corrección de errores reportados en producción',
      startDate: '25 mar',
      dueDate: '01 abr',
      duration: '7d',
      status: 'in-review',
      priority: 'high',
      assignedTo: {
        name: 'Ana S.',
        initials: 'AS'
      },
      timeSpent: '16h/20h',
      location: 'Proyecto Gamma'
    },
    {
      id: 'over-4',
      name: 'Actualización de diseños para la versión móvil',
      startDate: '22 mar',
      dueDate: '29 mar',
      duration: '7d',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: {
        name: 'Valeria T.',
        initials: 'VT'
      },
      timeSpent: '10h/30h',
      location: 'Proyecto Beta'
    },
    {
      id: 'over-5',
      name: 'Implementación de nueva funcionalidad de notificaciones',
      startDate: '15 mar',
      dueDate: '25 mar',
      duration: '10d',
      status: 'in-review',
      priority: 'high',
      assignedTo: {
        name: 'Luis R.',
        initials: 'LR'
      },
      timeSpent: '35h/40h',
      location: 'Proyecto Alpha'
    }
  ];

  const upcomingTasks: Task[] = [
    {
      id: 'up-1',
      name: 'Planificación de sprint para el próximo mes',
      startDate: '15 abr',
      dueDate: '20 abr',
      duration: '5d',
      status: 'new',
      priority: 'high',
      assignedTo: {
        name: 'Carlos P.',
        initials: 'CP'
      },
      timeSpent: '-',
      location: 'Todos los proyectos'
    },
    {
      id: 'up-2',
      name: 'Revisión de propuestas de nuevos clientes',
      startDate: '18 abr',
      dueDate: '25 abr',
      duration: '7d',
      status: 'new',
      priority: 'medium',
      assignedTo: {
        name: 'Ana M.',
        initials: 'AM'
      },
      timeSpent: '-',
      location: 'Sin proyecto'
    },
    {
      id: 'up-3',
      name: 'Desarrollo de integración con API de terceros',
      startDate: '20 abr',
      dueDate: '30 abr',
      duration: '10d',
      status: 'new',
      priority: 'medium',
      assignedTo: {
        name: 'Pedro L.',
        initials: 'PL'
      },
      timeSpent: '-',
      location: 'Proyecto Beta'
    },
    {
      id: 'up-4',
      name: 'Preparar documentación para auditoría externa',
      startDate: '25 abr',
      dueDate: '05 may',
      duration: '10d',
      status: 'new',
      priority: 'high',
      assignedTo: {
        name: 'Mariangel',
        initials: 'MA'
      },
      timeSpent: '-',
      location: 'Todos los proyectos'
    },
    {
      id: 'up-5',
      name: 'Implementar nuevo diseño de dashboard',
      startDate: '15 abr',
      dueDate: '30 abr',
      duration: '15d',
      status: 'new',
      priority: 'medium',
      assignedTo: {
        name: 'Valeria T.',
        initials: 'VT'
      },
      timeSpent: '-',
      location: 'Proyecto Alpha'
    }
  ];

  const upcomingEvents: Event[] = [
    {
      id: 'event-1',
      name: 'Reunión de equipo',
      date: '05 abr',
      time: '09:00 - 10:30',
      location: 'Sala de conferencias'
    },
    {
      id: 'event-2',
      name: 'Presentación a cliente',
      date: '07 abr',
      time: '14:00 - 15:30',
      location: 'Oficina del cliente'
    },
    {
      id: 'event-3',
      name: 'Revisión de sprint',
      date: '10 abr',
      time: '11:00 - 12:30',
      location: 'Sala de reuniones'
    },
    {
      id: 'event-4',
      name: 'Taller de innovación',
      date: '12 abr',
      time: '15:00 - 17:00',
      location: 'Espacio creativo'
    }
  ];

  // Group tasks by status for Kanban view
  const tasksByStatus = pendingTasks.reduce((acc, task) => {
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

  const getStatusBadge = (status: Task['status']) => {
    return (
      <span className={`task-status-pill status-${status} whitespace-nowrap`}>
        {statusLabels[status]}
      </span>
    );
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    return (
      <span className={`inline-flex items-center gap-1.5 text-priority-${priority}`}>
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

  const selectedTask = pendingTasks.find(task => task.id === selectedTaskId) || 
                        overdueTasks.find(task => task.id === selectedTaskId) || 
                        upcomingTasks.find(task => task.id === selectedTaskId);

  const AddTaskDialog = () => (
    <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Agregar nueva tarea</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="task-name">Nombre de la tarea</Label>
            <Input id="task-name" placeholder="Ingrese el nombre de la tarea" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start-date">Fecha de inicio</Label>
              <Input id="start-date" type="date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="due-date">Fecha de vencimiento</Label>
              <Input id="due-date" type="date" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Estado</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Nuevo</SelectItem>
                  <SelectItem value="in-progress">En progreso</SelectItem>
                  <SelectItem value="in-review">En revisión</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Prioridad</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="low">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <textarea
              id="description"
              className="min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
              placeholder="Describa la tarea..."
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button>Guardar tarea</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="container py-6 max-w-7xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Mis tareas</h1>
        <p className="text-muted-foreground">Gestiona tus tareas en todos los proyectos</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Agregar
              <ChevronDown className="h-4 w-4 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setIsAddTaskOpen(true)}>
              <span>Nueva tarea</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Nuevo evento</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          
        <div className="flex items-center gap-4">
          <Tabs value={activeView} onValueChange={(v) => setActiveView(v as 'list' | 'kanban')}>
            <TabsList>
              <TabsTrigger value="list" className="flex items-center gap-1.5">
                <ListTodo className="h-4 w-4" />
                <span>Lista</span>
              </TabsTrigger>
              <TabsTrigger value="kanban" className="flex items-center gap-1.5">
                <KanbanSquare className="h-4 w-4" />
                <span>Kanban</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

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
      </div>
    
      <Tabs value={activeView} className="space-y-4">
        <TabsContent value="list" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tareas pendientes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Tareas pendientes</h2>
                  <span className="text-muted-foreground text-sm">{pendingTasks.length} tareas</span>
                </div>
                <div className="border rounded-md shadow-sm">
                  <ScrollArea className="h-[360px]">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead className="w-[240px]">Nombre</TableHead>
                          <TableHead>Inicio</TableHead>
                          <TableHead>Fin</TableHead>
                          <TableHead>Duración</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Prioridad</TableHead>
                          <TableHead>Ubicación</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingTasks.map((task) => (
                          <TableRow 
                            key={task.id}
                            className="hover:bg-muted/40 cursor-pointer"
                            onClick={() => setSelectedTaskId(task.id)}
                          >
                            <TableCell className="font-medium">
                              <div className="truncate relative max-w-[200px] pr-6">
                                <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-12 after:bg-gradient-to-r after:from-transparent after:to-background">
                                  {task.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{task.startDate}</TableCell>
                            <TableCell>{task.dueDate}</TableCell>
                            <TableCell>{task.duration}</TableCell>
                            <TableCell>{getStatusBadge(task.status)}</TableCell>
                            <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                            <TableCell>
                              <div className="truncate relative max-w-[120px] pr-6">
                                <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-8 after:bg-gradient-to-r after:from-transparent after:to-background">
                                  {task.location}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              </div>

              {/* Próximos eventos */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Próximos eventos</h2>
                  <span className="text-muted-foreground text-sm">{upcomingEvents.length} eventos</span>
                </div>
                <div className="border rounded-md p-4 h-[360px]">
                  <div className="grid gap-3">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="p-3 border rounded-md hover:shadow-sm transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 text-primary rounded-md p-2 text-center min-w-[50px]">
                            <div className="text-sm font-medium">{event.date.split(' ')[0]}</div>
                            <div className="text-xs">{event.date.split(' ')[1]}</div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium truncate">{event.name}</h3>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {event.time}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <span className="truncate relative max-w-[200px]">
                                {event.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tareas vencidas */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Tareas vencidas</h2>
                <span className="text-muted-foreground text-sm">{overdueTasks.length} tareas</span>
              </div>
              <div className="border rounded-md shadow-sm">
                <ScrollArea className="h-[250px]">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="w-[240px]">Nombre</TableHead>
                        <TableHead>Inicio</TableHead>
                        <TableHead>Fin</TableHead>
                        <TableHead>Duración</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Prioridad</TableHead>
                        <TableHead>Ubicación</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {overdueTasks.map((task) => (
                        <TableRow 
                          key={task.id}
                          className="hover:bg-muted/40 cursor-pointer"
                          onClick={() => setSelectedTaskId(task.id)}
                        >
                          <TableCell className="font-medium">
                            <div className="truncate relative max-w-[200px] pr-6">
                              <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-12 after:bg-gradient-to-r after:from-transparent after:to-background">
                                {task.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{task.startDate}</TableCell>
                          <TableCell>{task.dueDate}</TableCell>
                          <TableCell>{task.duration}</TableCell>
                          <TableCell>{getStatusBadge(task.status)}</TableCell>
                          <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                          <TableCell>
                            <div className="truncate relative max-w-[120px] pr-6">
                              <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-8 after:bg-gradient-to-r after:from-transparent after:to-background">
                                {task.location}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            </div>

            {/* Tareas por vencer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Tareas por vencer</h2>
                <span className="text-muted-foreground text-sm">{upcomingTasks.length} tareas</span>
              </div>
              <div className="border rounded-md shadow-sm">
                <ScrollArea className="h-[250px]">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="w-[240px]">Nombre</TableHead>
                        <TableHead>Inicio</TableHead>
                        <TableHead>Fin</TableHead>
                        <TableHead>Duración</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Prioridad</TableHead>
                        <TableHead>Ubicación</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingTasks.map((task) => (
                        <TableRow 
                          key={task.id}
                          className="hover:bg-muted/40 cursor-pointer"
                          onClick={() => setSelectedTaskId(task.id)}
                        >
                          <TableCell className="font-medium">
                            <div className="truncate relative max-w-[200px] pr-6">
                              <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-12 after:bg-gradient-to-r after:from-transparent after:to-background">
                                {task.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{task.startDate}</TableCell>
                          <TableCell>{task.dueDate}</TableCell>
                          <TableCell>{task.duration}</TableCell>
                          <TableCell>{getStatusBadge(task.status)}</TableCell>
                          <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                          <TableCell>
                            <div className="truncate relative max-w-[120px] pr-6">
                              <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-8 after:bg-gradient-to-r after:from-transparent after:to-background">
                                {task.location}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="kanban" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Agregar tarea
            </Button>
            
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
          
          <div className="flex gap-4 overflow-auto pb-4">
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
                        <h4 className="font-medium text-sm mb-2 truncate relative pr-6">
                          <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-12 after:bg-gradient-to-r after:from-transparent after:to-background/90">
                            {task.name}
                          </span>
                        </h4>
                        
                        {task.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                            {task.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Calendar className="h-3 w-3" />
                            <span>Inicio: {task.startDate}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Calendar className="h-3 w-3" />
                            <span>Fin: {task.dueDate}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Clock className="h-3 w-3" />
                            <span>Duración: {task.duration}</span>
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
                    onClick={() => setIsAddTaskOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir una tarea
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="flex-shrink-0 w-14 flex items-start justify-center pt-10">
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {selectedTaskId && selectedTask && (
        <Drawer open={!!selectedTaskId} onOpenChange={(open) => !open && setSelectedTaskId(null)}>
          <DrawerContent className="max-w-3xl mx-auto">
            <div className="max-h-[85vh] overflow-y-auto">
              <TaskDetails 
                task={{
                  id: selectedTask.id,
                  name: selectedTask.name,
                  startDate: selectedTask.startDate,
                  endDate: selectedTask.dueDate,
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
            </div>
          </DrawerContent>
        </Drawer>
      )}
      
      <AddTaskDialog />
    </div>
  );
}
