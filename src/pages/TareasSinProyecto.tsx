
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Check, ChevronDown, Clock, Filter, SortDesc, Plus, CheckCircle, Circle, 
  MoreHorizontal, UserPlus, Calendar, KanbanSquare, ListTodo, SquarePen, X
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
import { TaskDetails } from '../components/project/TaskDetails';
import { ScrollArea } from '@/components/ui/scroll-area';

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
}

export default function TareasSinProyecto() {
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

  const tasks: Task[] = [
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
      description: 'Realizar una investigación sobre las últimas tendencias y frameworks de frontend que puedan mejorar nuestro flujo de trabajo.'
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
      description: 'Crear materiales de presentación para la reunión con el cliente potencial. Incluir caso de estudio y capacidades del equipo.'
    },
    {
      id: 'task-3',
      name: 'Actualizar documentación interna de procesos y mejores prácticas',
      startDate: '03 abr',
      dueDate: '08 abr',
      duration: '5d',
      status: 'new',
      priority: 'low',
      timeSpent: '-'
    },
    {
      id: 'task-4',
      name: 'Revisar tickets de soporte pendientes de la plataforma principal',
      startDate: '01 abr',
      dueDate: '03 abr',
      duration: '2d',
      status: 'completed',
      priority: 'medium',
      assignedTo: {
        name: 'Carlos P.',
        initials: 'CP'
      },
      timeSpent: '6h/6h'
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
      timeSpent: '-'
    }
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
    <Layout>
      <div className="container py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Tareas sin proyecto</h1>
            <p className="text-muted-foreground">Gestiona tus tareas personales que no pertenecen a ningún proyecto</p>
          </div>
          
          <div className="flex items-center gap-2">
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
        
        <div className="mb-4 flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Agregar tarea
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsAddTaskOpen(true)}>
                <SquarePen className="mr-2 h-4 w-4" />
                <span>Nueva tarea</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <X className="mr-2 h-4 w-4" />
                <span className="text-muted-foreground">
                  No se permiten subtareas sin tarea padre
                </span>
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
        
        <div className="flex h-full">
          <div className="flex-1 overflow-hidden">
            {activeView === 'list' ? (
              <div className="border rounded-md shadow-sm overflow-hidden">
                <ScrollArea className="h-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Nombre</TableHead>
                        <TableHead>Inicio</TableHead>
                        <TableHead>Fin</TableHead>
                        <TableHead>Duración</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Prioridad</TableHead>
                        <TableHead>Asignado</TableHead>
                        <TableHead>Tiempo empleado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tasks.map((task) => (
                        <TableRow 
                          key={task.id}
                          className={`hover:bg-muted/40 ${selectedTaskId === task.id ? 'bg-muted/60' : ''}`}
                        >
                          <TableCell className="font-medium">
                            <button
                              onClick={() => setSelectedTaskId(task.id)}
                              className="hover:underline text-left"
                            >
                              <div className="truncate relative pr-6 max-w-[290px]">
                                <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-background/90">
                                  {task.name}
                                </span>
                              </div>
                            </button>
                          </TableCell>
                          <TableCell>{task.startDate}</TableCell>
                          <TableCell>{task.dueDate}</TableCell>
                          <TableCell>{task.duration}</TableCell>
                          <TableCell>{getStatusBadge(task.status)}</TableCell>
                          <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                          <TableCell>
                            {task.assignedTo ? (
                              <Avatar className="h-7 w-7 bg-primary">
                                <span className="text-xs">{task.assignedTo.initials}</span>
                              </Avatar>
                            ) : (
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <UserPlus className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className={task.timeSpent === '-' ? 'text-muted-foreground' : 
                              task.timeSpent.split('/')[0] === task.timeSpent.split('/')[1] ? 'text-green-600' : 'text-red-600'
                            }>
                              {task.timeSpent}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            ) : (
              <div className="flex gap-4">
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
                        <div 
                          key={task.id} 
                          className="bg-card rounded-md p-3 border shadow-sm hover:shadow transition-shadow cursor-pointer"
                          onClick={() => setSelectedTaskId(task.id)}
                        >
                          <h4 className="font-medium text-sm mb-2 truncate relative pr-6">
                            <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-background/90">
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
                        </div>
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
            )}
          </div>
          
          {selectedTaskId && selectedTask && (
            <div className="fixed inset-y-0 right-0 w-[400px] bg-background border-l shadow-lg z-40">
              <div className="absolute top-2 right-2 z-10">
                <Button variant="ghost" size="icon" onClick={() => setSelectedTaskId(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
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
          )}
        </div>
      </div>
      <AddTaskDialog />
    </Layout>
  );
}
