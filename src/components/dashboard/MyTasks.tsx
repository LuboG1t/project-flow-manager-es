
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  Calendar, CheckCircle, Circle, Clock, Filter, Flag, KanbanSquare, 
  ListTodo, MoreHorizontal, Plus, SortDesc, ChevronDown, X
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';

const statusColors = {
  'no-iniciado': 'bg-slate-200 text-slate-800',
  'en-progreso': 'bg-blue-100 text-blue-800',
  'completado': 'bg-green-100 text-green-800',
  'retrasado': 'bg-red-100 text-red-800',
  'por-vencer': 'bg-amber-100 text-amber-800'
};

const priorityColors = {
  'alta': 'text-red-500',
  'media': 'text-amber-500',
  'baja': 'text-green-500'
};

interface Task {
  id: string;
  name: string;
  startDate: string;
  dueDate: string;
  status: 'no-iniciado' | 'en-progreso' | 'completado' | 'retrasado' | 'por-vencer';
  priority: 'alta' | 'media' | 'baja';
  project: {
    id: string;
    name: string;
    path: string;
  } | null;
  duration: string;
  timeSpent: string;
  assignedTo?: {
    name: string;
    initials: string;
  };
  description?: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  project: {
    id: string;
    name: string;
  } | null;
}

export default function MyTasks() {
  const [activeView, setActiveView] = useState<'list' | 'kanban'>('list');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  
  const pendingTasks: Task[] = [
    {
      id: 'task-1',
      name: 'Reunión para revisión de requisitos del sistema de gestión',
      startDate: '12 abr',
      dueDate: '15 abr',
      status: 'no-iniciado',
      priority: 'alta',
      project: {
        id: 'project-1',
        name: 'Proyecto 1A: Sistema de Gestión',
        path: '/proyecto-1a'
      },
      duration: '3d',
      timeSpent: '-',
      description: 'Realizar reunión con stakeholders para revisar requisitos del sistema de gestión y establecer prioridades para el siguiente sprint.'
    },
    {
      id: 'task-2',
      name: 'Desarrollo de API para integración con proveedores',
      startDate: '10 abr',
      dueDate: '20 abr',
      status: 'no-iniciado',
      priority: 'media',
      project: {
        id: 'project-1',
        name: 'Proyecto 1A: Sistema de Gestión',
        path: '/proyecto-1a'
      },
      duration: '10d',
      timeSpent: '-',
      description: 'Desarrollar endpoints de API para la integración con sistemas de proveedores externos.'
    },
    {
      id: 'task-3',
      name: 'Actualización de documentación técnica',
      startDate: '15 abr',
      dueDate: '18 abr',
      status: 'no-iniciado',
      priority: 'baja',
      project: null,
      duration: '3d',
      timeSpent: '-',
      description: 'Actualizar la documentación técnica del sistema con los cambios recientes en la arquitectura.'
    },
    {
      id: 'task-4',
      name: 'Estimación de costos para nuevo módulo de reportes',
      startDate: '16 abr',
      dueDate: '19 abr',
      status: 'no-iniciado',
      priority: 'media',
      project: {
        id: 'portfolio-1',
        name: 'Portafolio 1: Suite de Aplicaciones',
        path: '/portafolio-1'
      },
      duration: '3d',
      timeSpent: '-',
      description: 'Estimar costos y tiempo de desarrollo para el nuevo módulo de reportes avanzados.'
    }
  ];
  
  const inProgressTasks: Task[] = [
    {
      id: 'task-5',
      name: 'Desarrollo de interfaz para dashboard principal',
      startDate: '05 abr',
      dueDate: '15 abr',
      status: 'en-progreso',
      priority: 'alta',
      project: {
        id: 'project-1',
        name: 'Proyecto 1A: Sistema de Gestión',
        path: '/proyecto-1a'
      },
      duration: '10d',
      timeSpent: '5d/10d',
      assignedTo: {
        name: 'Juan Pérez',
        initials: 'JP'
      },
      description: 'Implementar la interfaz del dashboard principal según los wireframes aprobados.'
    },
    {
      id: 'task-6',
      name: 'Optimización de consultas SQL para módulo de reportes',
      startDate: '08 abr',
      dueDate: '12 abr',
      status: 'en-progreso',
      priority: 'media',
      project: {
        id: 'project-1b',
        name: 'Proyecto 1B: Módulo Complementario',
        path: '/proyecto-1b'
      },
      duration: '4d',
      timeSpent: '3d/4d',
      assignedTo: {
        name: 'Ana Gómez',
        initials: 'AG'
      },
      description: 'Optimizar las consultas SQL del módulo de reportes para mejorar el rendimiento.'
    }
  ];
  
  const overdueTasks: Task[] = [
    {
      id: 'task-7',
      name: 'Corrección de bugs en formulario de registro',
      startDate: '01 abr',
      dueDate: '05 abr',
      status: 'retrasado',
      priority: 'alta',
      project: {
        id: 'project-1',
        name: 'Proyecto 1A: Sistema de Gestión',
        path: '/proyecto-1a'
      },
      duration: '4d',
      timeSpent: '2d/4d',
      assignedTo: {
        name: 'Carlos Rodríguez',
        initials: 'CR'
      },
      description: 'Corregir los bugs identificados en el formulario de registro de usuarios.'
    },
    {
      id: 'task-8',
      name: 'Implementación de mecanismo de autenticación SSO',
      startDate: '28 mar',
      dueDate: '04 abr',
      status: 'retrasado',
      priority: 'alta',
      project: {
        id: 'project-1b',
        name: 'Proyecto 1B: Módulo Complementario',
        path: '/proyecto-1b'
      },
      duration: '7d',
      timeSpent: '5d/7d',
      assignedTo: {
        name: 'Miguel Torres',
        initials: 'MT'
      },
      description: 'Implementar la autenticación SSO con proveedores externos (Google, Microsoft).'
    }
  ];
  
  const upcomingEvents: Event[] = [
    {
      id: 'event-1',
      name: 'Reunión de planificación de sprint',
      date: '12 abr',
      time: '10:00',
      project: {
        id: 'project-1',
        name: 'Proyecto 1A: Sistema de Gestión'
      }
    },
    {
      id: 'event-2',
      name: 'Presentación de avances a stakeholders',
      date: '15 abr',
      time: '15:30',
      project: {
        id: 'portfolio-1',
        name: 'Portafolio 1: Suite de Aplicaciones'
      }
    }
  ];
  
  const soonToExpireTasks: Task[] = [
    {
      id: 'task-9',
      name: 'Revisión de código para integración continua',
      startDate: '05 abr',
      dueDate: '12 abr',
      status: 'por-vencer',
      priority: 'media',
      project: {
        id: 'project-1',
        name: 'Proyecto 1A: Sistema de Gestión',
        path: '/proyecto-1a'
      },
      duration: '7d',
      timeSpent: '5d/7d',
      assignedTo: {
        name: 'Laura Sánchez',
        initials: 'LS'
      },
      description: 'Realizar revisión de código para asegurar la calidad antes de la integración continua.'
    },
    {
      id: 'task-10',
      name: 'Preparación de ambiente de pruebas',
      startDate: '07 abr',
      dueDate: '11 abr',
      status: 'por-vencer',
      priority: 'alta',
      project: {
        id: 'project-1b',
        name: 'Proyecto 1B: Módulo Complementario',
        path: '/proyecto-1b'
      },
      duration: '4d',
      timeSpent: '3d/4d',
      assignedTo: {
        name: 'Pedro Ramírez',
        initials: 'PR'
      },
      description: 'Preparar el ambiente de pruebas para la próxima versión del sistema.'
    }
  ];
  
  const allTasks = [...pendingTasks, ...inProgressTasks, ...overdueTasks, ...soonToExpireTasks];
  
  const selectedTask = allTasks.find(task => task.id === selectedTaskId);
  
  const getStatusBadge = (status: Task['status']) => {
    const statusText = {
      'no-iniciado': 'No iniciado',
      'en-progreso': 'En progreso',
      'completado': 'Completado',
      'retrasado': 'Retrasado',
      'por-vencer': 'Por vencer'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[status]}`}>
        {statusText[status]}
      </span>
    );
  };
  
  const getPriorityBadge = (priority: Task['priority']) => {
    const priorityText = {
      'alta': 'Alta',
      'media': 'Media',
      'baja': 'Baja'
    };
    
    return (
      <span className={`inline-flex items-center gap-1.5 ${priorityColors[priority]}`}>
        <Flag className="h-3.5 w-3.5" />
        <span>{priorityText[priority]}</span>
      </span>
    );
  };
  
  const getLocationTag = (project: Task['project']) => {
    if (!project) {
      return <Badge variant="outline" className="bg-slate-100">Sin proyecto</Badge>;
    }
    
    return (
      <Badge 
        variant="outline" 
        className="bg-blue-50 text-blue-700 hover:bg-blue-100 truncate max-w-[200px]"
      >
        <span className="truncate relative pr-6 after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-blue-50">
          {project.name}
        </span>
      </Badge>
    );
  };
  
  const renderTaskRow = (task: Task) => (
    <TableRow 
      key={task.id}
      className={`hover:bg-muted/40 cursor-pointer ${selectedTaskId === task.id ? 'bg-muted/60' : ''}`}
      onClick={() => setSelectedTaskId(task.id)}
    >
      <TableCell className="font-medium">
        <div className="truncate relative pr-6 max-w-[300px]">
          <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-background/90">
            {task.name}
          </span>
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap">{task.startDate}</TableCell>
      <TableCell className="whitespace-nowrap">{task.dueDate}</TableCell>
      <TableCell>{task.duration}</TableCell>
      <TableCell>{getStatusBadge(task.status)}</TableCell>
      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
      <TableCell>
        <div className="truncate relative pr-6 max-w-[180px]">
          <a 
            href={task.project?.path || "/tareas-sin-proyecto"} 
            className="after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-background/90"
            onClick={(e) => e.stopPropagation()}
          >
            {task.project ? task.project.name : "Sin proyecto"}
          </a>
        </div>
      </TableCell>
    </TableRow>
  );

  const renderPendingTaskTable = () => (
    <div className="px-0">
      <ScrollArea className="h-[280px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Inicio</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Ubicación</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingTasks.map(renderTaskRow)}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
  
  const renderInProgressTaskTable = () => (
    <div className="px-0">
      <ScrollArea className="h-[280px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Inicio</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Ubicación</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inProgressTasks.map(renderTaskRow)}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
  
  const renderOverdueTaskTable = () => (
    <div className="px-0">
      <ScrollArea className="h-[280px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Inicio</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Ubicación</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {overdueTasks.map(renderTaskRow)}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
  
  const renderUpcomingEventsTable = () => (
    <div className="px-0">
      <ScrollArea className="h-[280px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70%]">Evento</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Hora</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingEvents.map(event => (
              <TableRow key={event.id} className="hover:bg-muted/40">
                <TableCell className="font-medium">
                  <div className="truncate relative pr-6 max-w-[250px]">
                    <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-background/90">
                      {event.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">{event.date}</TableCell>
                <TableCell className="whitespace-nowrap">{event.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
  
  const renderSoonToExpireTaskTable = () => (
    <div className="px-0">
      <ScrollArea className="h-[280px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Inicio</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Ubicación</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {soonToExpireTasks.map(renderTaskRow)}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
  
  // Kanban view data structure
  const tasksByStatus = {
    'no-iniciado': [...pendingTasks],
    'en-progreso': [...inProgressTasks],
    'completado': [
      {
        id: 'task-11',
        name: 'Configuración de entorno de desarrollo',
        startDate: '01 abr',
        dueDate: '03 abr',
        status: 'completado',
        priority: 'media',
        project: {
          id: 'project-1',
          name: 'Proyecto 1A: Sistema de Gestión',
          path: '/proyecto-1a'
        },
        duration: '2d',
        timeSpent: '2d/2d',
        assignedTo: {
          name: 'Juan Pérez',
          initials: 'JP'
        },
        description: 'Configurar el entorno de desarrollo para el nuevo equipo.'
      },
      {
        id: 'task-12',
        name: 'Documentación de API para desarrolladores',
        startDate: '02 abr',
        dueDate: '04 abr',
        status: 'completado',
        priority: 'baja',
        project: {
          id: 'project-1b',
          name: 'Proyecto 1B: Módulo Complementario',
          path: '/proyecto-1b'
        },
        duration: '2d',
        timeSpent: '2d/2d',
        assignedTo: {
          name: 'Laura Sánchez',
          initials: 'LS'
        },
        description: 'Crear documentación de API para nuevos desarrolladores.'
      }
    ]
  };
  
  const kanbanColumns = [
    { id: 'no-iniciado', title: 'No iniciado', tasks: tasksByStatus['no-iniciado'] || [] },
    { id: 'en-progreso', title: 'En progreso', tasks: tasksByStatus['en-progreso'] || [] },
    { id: 'completado', title: 'Completado', tasks: tasksByStatus['completado'] || [] },
  ];
  
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
                  <SelectItem value="no-iniciado">No iniciado</SelectItem>
                  <SelectItem value="en-progreso">En progreso</SelectItem>
                  <SelectItem value="completado">Completado</SelectItem>
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
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Duración</Label>
            <Input id="duration" placeholder="Ej: 3d" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project">Proyecto</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un proyecto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sin-proyecto">Sin proyecto</SelectItem>
                <SelectItem value="project-1">Proyecto 1A: Sistema de Gestión</SelectItem>
                <SelectItem value="project-1b">Proyecto 1B: Módulo Complementario</SelectItem>
                <SelectItem value="portfolio-1">Portafolio 1: Suite de Aplicaciones</SelectItem>
              </SelectContent>
            </Select>
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
          <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>Cancelar</Button>
          <Button>Guardar tarea</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const AddEventDialog = () => (
    <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Agregar nuevo evento</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="event-name">Nombre del evento</Label>
            <Input id="event-name" placeholder="Ingrese el nombre del evento" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="event-date">Fecha</Label>
              <Input id="event-date" type="date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-time">Hora</Label>
              <Input id="event-time" type="time" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="event-project">Proyecto</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un proyecto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sin-proyecto">Sin proyecto</SelectItem>
                <SelectItem value="project-1">Proyecto 1A: Sistema de Gestión</SelectItem>
                <SelectItem value="project-1b">Proyecto 1B: Módulo Complementario</SelectItem>
                <SelectItem value="portfolio-1">Portafolio 1: Suite de Aplicaciones</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>Cancelar</Button>
          <Button>Guardar evento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mis tareas</h1>
          <p className="text-muted-foreground">
            Gestiona tus tareas y eventos pendientes
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agregar
                <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem onClick={() => setIsAddTaskOpen(true)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Nueva tarea
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsAddEventOpen(true)}>
                <Calendar className="mr-2 h-4 w-4" />
                Nuevo evento
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
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
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Filtrar</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuItem onSelect={() => setSelectedFilter('estado')}>
              Estado
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedFilter('prioridad')}>
              Prioridad
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedFilter('proyecto')}>
              Proyecto
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <SortDesc className="h-3.5 w-3.5" />
              <span>Ordenar</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuItem onSelect={() => setSelectedSort('prioridad-alta-baja')}>
              Prioridad (alta a baja)
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedSort('prioridad-baja-alta')}>
              Prioridad (baja a alta)
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSelectedSort('nombre')}>
              Nombre
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <TabsContent value="list" className="mt-0 space-y-6">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tareas pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                {renderPendingTaskTable()}
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Próximos eventos</CardTitle>
              </CardHeader>
              <CardContent>
                {renderUpcomingEventsTable()}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tareas vencidas</CardTitle>
            </CardHeader>
            <CardContent>
              {renderOverdueTaskTable()}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tareas por vencer</CardTitle>
            </CardHeader>
            <CardContent>
              {renderSoonToExpireTaskTable()}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tareas en progreso</CardTitle>
          </CardHeader>
          <CardContent>
            {renderInProgressTaskTable()}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="kanban" className="mt-0">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {kanbanColumns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-[350px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${column.id === 'no-iniciado' ? 'bg-slate-400' : column.id === 'en-progreso' ? 'bg-blue-400' : 'bg-green-400'}`}></div>
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
                        <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-background/90">
                          {task.name}
                        </span>
                      </h4>
                      
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Calendar className="h-3 w-3" />
                          <span>Inicio: {task.startDate}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Calendar className="h-3 w-3" />
                          <span>Fin: {task.dueDate}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
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
                        <Badge variant="outline" className={`${priorityColors[task.priority]} text-[10px] px-1.5`}>
                          {task.priority === 'alta' ? 'Alta' : task.priority === 'media' ? 'Media' : 'Baja'}
                        </Badge>
                        
                        <div className="truncate max-w-[200px] text-xs text-blue-600">
                          <a 
                            href={task.project?.path || "/tareas-sin-proyecto"} 
                            className="hover:underline truncate relative pr-6 inline-block"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-background/90">
                              {task.project ? task.project.name : "Sin proyecto"}
                            </span>
                          </a>
                        </div>
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
      
      {selectedTaskId && selectedTask && (
        <div className="fixed inset-y-0 right-0 w-[50%] bg-background border-l shadow-lg z-40 overflow-y-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 z-50"
            onClick={() => setSelectedTaskId(null)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">{selectedTask.name}</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Estado</h3>
                {getStatusBadge(selectedTask.status)}
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Prioridad</h3>
                {getPriorityBadge(selectedTask.priority)}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Asignado a</h3>
              <div className="flex items-center gap-2">
                {selectedTask.assignedTo ? (
                  <>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{selectedTask.assignedTo.initials}</AvatarFallback>
                    </Avatar>
                    <span>{selectedTask.assignedTo.name}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">No asignado</span>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Fecha de inicio</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedTask.startDate}</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Fecha de fin</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedTask.dueDate}</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Duración</h3>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedTask.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Proyecto</h3>
              <div>
                {selectedTask.project ? (
                  <a 
                    href={selectedTask.project.path} 
                    className="text-blue-600 hover:underline"
                  >
                    {selectedTask.project.name}
                  </a>
                ) : (
                  <span className="text-muted-foreground">Sin proyecto</span>
                )}
              </div>
            </div>
            
            {selectedTask.description && (
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Descripción</h3>
                <p className="text-sm">{selectedTask.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <AddTaskDialog />
      <AddEventDialog />
    </div>
  );
}
