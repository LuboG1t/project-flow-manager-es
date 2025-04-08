
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Filter,
  SortDesc,
  Plus,
  Clock,
  AlertTriangle,
  Link as LinkIcon,
  ChevronDown,
  Plus as PlusIcon,
  X,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { TaskDetails } from "../project/TaskDetails";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface Task {
  id: string;
  name: string;
  startDate: string;
  dueDate: string;
  duration: string;
  status: "no-iniciado" | "en-progreso" | "completado";
  priority: "high" | "medium" | "low";
  location?: string;
  projectLink?: string;
  timeSpent: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  time?: string;
  project?: string;
  projectLink?: string;
}

const statusLabels = {
  "no-iniciado": "No iniciado",
  "en-progreso": "En progreso",
  completado: "Completado",
};

const priorityLabels = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
};

const priorityColors = {
  high: "text-red-500 bg-red-50",
  medium: "text-amber-500 bg-amber-50",
  low: "text-green-500 bg-green-50",
};

export default function MyTasks() {
  const [currentDate, setCurrentDate] = useState("24 abr");
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [editingCell, setEditingCell] = useState<{
    id: string;
    field: string;
  } | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    startDate: "",
    dueDate: "",
    duration: "",
    priority: "medium",
    timeEstimate: "",
    project: "sin-proyecto",
  });
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    project: "sin-proyecto",
  });

  // Datos de tareas
  const taskGroups: Record<string, Task[]> = {
    overdue: [
      {
        id: "task-10",
        name: "Actualizar documentación técnica del sistema de gestión de tareas y recursos",
        startDate: "20 abr",
        dueDate: "22 abr",
        duration: "3d",
        status: "en-progreso",
        priority: "high",
        location: "Portafolio 1 / Proyecto 1A",
        projectLink: "/projects/1a",
        timeSpent: "2h/8h",
      },
      {
        id: "task-11",
        name: "Corregir errores de interfaz en el panel de administración",
        startDate: "18 abr",
        dueDate: "21 abr",
        duration: "4d",
        status: "en-progreso",
        priority: "medium",
        location: "Sin proyecto",
        timeSpent: "8h/16h",
      },
      {
        id: "task-12",
        name: "Preparar reporte semanal de avance para el equipo directivo",
        startDate: "24 abr",
        dueDate: "24 abr",
        duration: "1d",
        status: "completado",
        priority: "high",
        location: "Portafolio 1 / Proyecto 1A",
        projectLink: "/projects/1a",
        timeSpent: "8h/8h",
      },
      {
        id: "task-13",
        name: "Revisión de prototipo de funcionalidad de calendario",
        startDate: "17 abr",
        dueDate: "20 abr",
        duration: "4d",
        status: "en-progreso",
        priority: "high",
        location: "Portafolio 1 / Proyecto 1B",
        projectLink: "/projects/1b",
        timeSpent: "12h/16h",
      },
      {
        id: "task-14",
        name: "Presentación de avances del sprint a stakeholders",
        startDate: "15 abr",
        dueDate: "19 abr",
        duration: "5d",
        status: "en-progreso",
        priority: "medium",
        location: "Portafolio 1 / Proyecto 1A",
        projectLink: "/projects/1a",
        timeSpent: "10h/12h",
      },
    ],
    upcoming: [
      {
        id: "task-4",
        name: "Desarrollar funcionalidad de búsqueda avanzada para repositorio de documentos",
        startDate: "24 abr",
        dueDate: "28 abr",
        duration: "5d",
        status: "no-iniciado",
        priority: "low",
        location: "Portafolio 1 / Proyecto 1A",
        projectLink: "/projects/1a",
        timeSpent: "-",
      },
      {
        id: "task-14",
        name: "Implementar sistema de notificaciones por correo electrónico",
        startDate: "25 abr",
        dueDate: "29 abr",
        duration: "5d",
        status: "no-iniciado",
        priority: "medium",
        location: "Portafolio 1 / Proyecto 1B",
        projectLink: "/projects/1b",
        timeSpent: "-",
      },
      {
        id: "task-15",
        name: "Crear manual de usuario para módulo de reportes",
        startDate: "26 abr",
        dueDate: "30 abr",
        duration: "5d",
        status: "no-iniciado",
        priority: "low",
        location: "Sin proyecto",
        timeSpent: "-",
      },
      {
        id: "task-16",
        name: "Optimizar consultas de base de datos para mejorar rendimiento",
        startDate: "25 abr",
        dueDate: "27 abr",
        duration: "3d",
        status: "no-iniciado",
        priority: "high",
        location: "Portafolio 1 / Proyecto 1A",
        projectLink: "/projects/1a",
        timeSpent: "-",
      },
      {
        id: "task-17",
        name: "Migración de datos a nuevo sistema de almacenamiento",
        startDate: "29 abr",
        dueDate: "03 may",
        duration: "5d",
        status: "no-iniciado",
        priority: "medium",
        location: "Portafolio 1 / Proyecto 1A",
        projectLink: "/projects/1a",
        timeSpent: "-",
      },
    ],
    pending: [
      {
        id: "task-1",
        name: "Diseñar componentes de UI para la nueva versión del dashboard",
        startDate: "24 abr",
        dueDate: "24 abr",
        duration: "1d",
        status: "no-iniciado",
        priority: "high",
        location: "Portafolio 1 / Proyecto 1A",
        projectLink: "/projects/1a",
        timeSpent: "-",
      },
      {
        id: "task-2",
        name: "Revisión de código del módulo de autenticación y seguridad",
        startDate: "24 abr",
        dueDate: "24 abr",
        duration: "1d",
        status: "no-iniciado",
        priority: "high",
        location: "Sin proyecto",
        timeSpent: "-",
      },
      {
        id: "task-3",
        name: "Configuración de entorno de pruebas automatizadas",
        startDate: "24 abr",
        dueDate: "24 abr",
        duration: "1d",
        status: "no-iniciado",
        priority: "medium",
        location: "Portafolio 1 / Proyecto 1A",
        projectLink: "/projects/1a",
        timeSpent: "-",
      },
      {
        id: "task-5",
        name: "Planificación sprint siguiente y distribución de tareas",
        startDate: "24 abr",
        dueDate: "24 abr",
        duration: "1d",
        status: "no-iniciado",
        priority: "high",
        location: "Portafolio 1 / Proyecto 1A",
        projectLink: "/projects/1a",
        timeSpent: "-",
      },
      {
        id: "task-6",
        name: "Análisis de requisitos para nueva funcionalidad de exportación",
        startDate: "24 abr",
        dueDate: "24 abr",
        duration: "1d",
        status: "no-iniciado",
        priority: "high",
        location: "Portafolio 1 / Proyecto 1B",
        projectLink: "/projects/1b",
        timeSpent: "-",
      },
      {
        id: "task-7",
        name: "Elaboración de propuesta técnica para cliente potencial",
        startDate: "24 abr",
        dueDate: "25 abr",
        duration: "2d",
        status: "no-iniciado",
        priority: "medium",
        location: "Sin proyecto",
        timeSpent: "-",
      },
    ],
  };

  // Datos de eventos próximos
  const upcomingEvents: Event[] = [
    {
      id: "event-1",
      name: "Reunión de Inicio de Proyecto",
      date: "25 abr",
      time: "10:00 - 11:30",
      project: "Proyecto 1A",
      projectLink: "/projects/1a",
    },
    {
      id: "event-2",
      name: "Entrega de Diseños",
      date: "27 abr",
      project: "Proyecto 1B",
      projectLink: "/projects/1b",
    },
    {
      id: "event-3",
      name: "Revisión de Avances",
      date: "29 abr",
      time: "15:00 - 16:00",
      project: "Proyecto 1A",
      projectLink: "/projects/1a",
    },
    {
      id: "event-4",
      name: "Reunión con Cliente",
      date: "2 may",
      time: "09:00 - 10:30",
      project: "Proyecto 1B",
      projectLink: "/projects/1b",
    },
  ];

  // Group tasks by status for Kanban view
  const tasksByStatus = Object.values(taskGroups)
    .flat()
    .reduce((acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    }, {} as Record<string, Task[]>);

  const kanbanColumns = [
    {
      id: "no-iniciado",
      title: "No iniciado",
      tasks: tasksByStatus["no-iniciado"] || [],
    },
    {
      id: "en-progreso",
      title: "En progreso",
      tasks: tasksByStatus["en-progreso"] || [],
    },
    {
      id: "completado",
      title: "Completado",
      tasks: tasksByStatus["completado"] || [],
    },
  ];

  const selectedTask = Object.values(taskGroups)
    .flat()
    .find((task) => task.id === selectedTaskId);

  // Funciones para editar celdas
  const handleStartEdit = (id: string, field: string, initialValue: string) => {
    setEditingCell({ id, field });
    setEditValue(initialValue);
  };

  const handleSaveEdit = () => {
    // Aquí iría la lógica para guardar el cambio
    console.log("Guardar cambio:", editingCell, editValue);
    setEditingCell(null);
  };

  const handleNewTaskChange = (field: string, value: string) => {
    setNewTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNewEventChange = (field: string, value: string) => {
    setNewEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateTask = () => {
    console.log("Nueva tarea creada:", newTask);
    setIsNewTaskDialogOpen(false);
    // Aquí iría la lógica para crear la tarea
  };

  const handleCreateEvent = () => {
    console.log("Nuevo evento creado:", newEvent);
    setIsNewEventDialogOpen(false);
    // Aquí iría la lógica para crear el evento
  };

  const renderStatusBadge = (status: Task["status"]) => {
    return (
      <span className={`task-status-pill status-${status} whitespace-nowrap`}>
        {statusLabels[status]}
      </span>
    );
  };

  const renderPriorityBadge = (priority: Task["priority"]) => {
    return (
      <span
        className={`inline-flex items-center gap-1.5 ${priorityColors[priority]} px-2 py-1 rounded-md text-xs font-medium`}
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
        <span>{priorityLabels[priority]}</span>
      </span>
    );
  };

  const renderEditableDate = (id: string, date: string, field: string) => {
    if (editingCell?.id === id && editingCell?.field === field) {
      return (
        <div>
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
            className="h-8 w-full"
            autoFocus
          />
        </div>
      );
    }
    return (
      <div
        className="flex items-center gap-1 cursor-pointer group"
        onClick={() => handleStartEdit(id, field, date)}
      >
        {date}
        <Calendar className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  const renderEditableDuration = (id: string, duration: string) => {
    if (editingCell?.id === id && editingCell?.field === "duration") {
      return (
        <div>
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
            className="h-8 w-full"
            autoFocus
          />
        </div>
      );
    }
    return (
      <div
        className="flex items-center gap-1 cursor-pointer group"
        onClick={() => handleStartEdit(id, "duration", duration)}
      >
        {duration}
        <Clock className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  const renderEditableStatus = (id: string, status: Task["status"]) => {
    if (editingCell?.id === id && editingCell?.field === "status") {
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
            <SelectItem value="no-iniciado">No iniciado</SelectItem>
            <SelectItem value="en-progreso">En progreso</SelectItem>
            <SelectItem value="completado">Completado</SelectItem>
          </SelectContent>
        </Select>
      );
    }
    return (
      <div
        className="cursor-pointer"
        onClick={() => handleStartEdit(id, "status", status)}
      >
        {renderStatusBadge(status)}
      </div>
    );
  };

  const renderEditablePriority = (id: string, priority: Task["priority"]) => {
    if (editingCell?.id === id && editingCell?.field === "priority") {
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
      <div
        className="cursor-pointer"
        onClick={() => handleStartEdit(id, "priority", priority)}
      >
        {renderPriorityBadge(priority)}
      </div>
    );
  };

  const renderEditableTime = (id: string, timeSpent: string) => {
    if (timeSpent === "-")
      return <span className="text-muted-foreground">-</span>;

    if (editingCell?.id === id && editingCell?.field === "time") {
      return (
        <div>
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
            className="h-8 w-full"
            autoFocus
          />
        </div>
      );
    }

    const [spent, total] = timeSpent.split("/");
    const isComplete = spent === total;

    return (
      <div
        className={`flex items-center gap-1 cursor-pointer group ${
          isComplete ? "text-green-600" : "text-red-600"
        }`}
        onClick={() => handleStartEdit(id, "time", timeSpent)}
      >
        {timeSpent}
        <Clock className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  const renderTaskTable = (
    tasks: Task[],
    title: string,
    showAllColumns = true,
    maxHeight?: string
  ) => {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <ScrollArea className={maxHeight}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Nombre</TableHead>
                  <TableHead className="min-w-[90px]">Inicio</TableHead>
                  <TableHead className="min-w-[90px]">Fin</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Ubicación</TableHead>
                  {showAllColumns && <TableHead>Tiempo empleado</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow
                    key={task.id}
                    className="hover:bg-muted/40 cursor-pointer"
                    onClick={() => setSelectedTaskId(task.id)}
                  >
                    <TableCell className="font-medium">
                      <div className="truncate relative pr-6 max-w-[150px]">
                        <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-background/90">
                          {task.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="group">
                      {renderEditableDate(task.id, task.startDate, "startDate")}
                    </TableCell>
                    <TableCell className="group">
                      {renderEditableDate(task.id, task.dueDate, "dueDate")}
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
                      {task.projectLink ? (
                        <div className="truncate relative pr-6 max-w-[150px]">
                          <Link
                            to={task.projectLink}
                            className="flex items-center gap-1.5 text-blue-600 hover:underline after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-background/90"
                          >
                            {task.location}
                            <LinkIcon className="h-3.5 w-3.5 shrink-0" />
                          </Link>
                        </div>
                      ) : (
                        <div className="truncate relative pr-6 max-w-[150px]">
                          <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-background/90">
                            {task.location}
                          </span>
                        </div>
                      )}
                    </TableCell>
                    {showAllColumns && (
                      <TableCell className="group">
                        {renderEditableTime(task.id, task.timeSpent)}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  };

  const renderEvents = () => {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            Próximos eventos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[200px]">
            <div className="divide-y">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 flex items-start gap-3 hover:bg-muted/50"
                >
                  <div className="px-2">
                    <p className="font-medium">{event.name}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </span>
                      {event.time && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </span>
                      )}
                    </div>
                    {event.project && (
                      <p className="text-xs text-blue-600 hover:underline mt-1">
                        {event.projectLink ? (
                          <Link
                            to={event.projectLink}
                            className="flex items-center gap-1"
                          >
                            {event.project}
                            <LinkIcon className="h-3 w-3" />
                          </Link>
                        ) : (
                          event.project
                        )}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  };

  const renderOverdueTasks = () => {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            Tareas Vencidas
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <ScrollArea className="h-[200px]">
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
                  <TableHead>Tiempo empleado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taskGroups.overdue.map((task) => (
                  <TableRow
                    key={task.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedTaskId(task.id)}
                  >
                    <TableCell className="font-medium">
                      <div className="truncate relative pr-6 max-w-[200px]">
                        <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-background/90">
                          {task.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="group">
                      {renderEditableDate(task.id, task.startDate, "startDate")}
                    </TableCell>
                    <TableCell className="group">
                      {renderEditableDate(task.id, task.dueDate, "dueDate")}
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
                      {task.projectLink ? (
                        <div className="truncate relative pr-6 max-w-[150px]">
                          <Link
                            to={task.projectLink}
                            className="flex items-center gap-1.5 text-blue-600 hover:underline after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-background/90"
                          >
                            {task.location}
                            <LinkIcon className="h-3.5 w-3.5 shrink-0" />
                          </Link>
                        </div>
                      ) : (
                        <div className="truncate relative pr-6 max-w-[150px]">
                          <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-background/90">
                            {task.location}
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="group">
                      {renderEditableTime(task.id, task.timeSpent)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  };

  const renderKanbanView = () => {
    return (
      <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
        {kanbanColumns.map((column) => (
          <div key={column.id} className="flex-1 min-w-[280px] max-w-[320px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full bg-status-${column.id}`}
                ></div>
                <h3 className="font-medium">{column.title}</h3>
                <span className="bg-muted rounded-full px-2 text-xs text-muted-foreground">
                  {column.tasks.length}
                </span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {column.tasks.map((task) => (
                <Card
                  key={task.id}
                  className="p-3 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => setSelectedTaskId(task.id)}
                >
                  <h4 className="font-medium text-sm mb-2 truncate relative pr-6">
                    <span className="after:absolute after:right-0 after:top-0 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-background/90">
                      {task.name}
                    </span>
                  </h4>

                  <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Inicio: {task.startDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Fin: {task.dueDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Duración: {task.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {task.timeSpent !== "-" ? task.timeSpent : "No iniciado"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t">
                    {renderPriorityBadge(task.priority)}

                    {task.projectLink ? (
                      <div className="truncate max-w-[100px]">
                        <Link
                          to={task.projectLink}
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {task.location?.includes("/")
                            ? task.location.split("/")[1].trim()
                            : task.location}
                          <LinkIcon className="h-3 w-3 shrink-0" />
                        </Link>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground truncate max-w-[100px]">
                        {task.location}
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mis Tareas</h1>
          <p className="text-muted-foreground">
            {currentDate} - Gestiona tus tareas y eventos
          </p>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filtrar</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Estado</DropdownMenuItem>
                <DropdownMenuItem>Prioridad</DropdownMenuItem>
                <DropdownMenuItem>Proyecto</DropdownMenuItem>
                <DropdownMenuItem>Fecha</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <SortDesc className="h-3.5 w-3.5" />
                <span>Ordenar</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Fecha (más reciente)</DropdownMenuItem>
                <DropdownMenuItem>Fecha (más antigua)</DropdownMenuItem>
                <DropdownMenuItem>Prioridad (alta a baja)</DropdownMenuItem>
                <DropdownMenuItem>Prioridad (baja a alta)</DropdownMenuItem>
                <DropdownMenuItem>Nombre (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Nombre (Z-A)</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <Plus className="h-3.5 w-3.5" />
                <span>Agregar</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsNewTaskDialogOpen(true)}>
                Agregar tarea
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsNewEventDialogOpen(true)}>
                Agregar evento
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="border-l pl-2 flex">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="h-8"
              onClick={() => setViewMode("list")}
            >
              Lista
            </Button>
            <Button
              variant={viewMode === "kanban" ? "default" : "ghost"}
              size="sm"
              className="h-8"
              onClick={() => setViewMode("kanban")}
            >
              Kanban
            </Button>
          </div>
        </div>
      </div>

      {viewMode === "list" && (
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-2 gap-6">
            {renderTaskTable(taskGroups.pending, "Tareas Pendientes", false, "h-[300px]")}
            {renderEvents()}
          </div>
          
          {renderTaskTable(taskGroups.overdue, "Tareas Vencidas", true, "h-[300px]")}
          {renderTaskTable(taskGroups.upcoming, "Tareas Por Vencer", true, "h-[300px]")}
        </div>
      )}

      {viewMode === "kanban" && renderKanbanView()}

      <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear Nueva Tarea</DialogTitle>
            <DialogDescription>
              Completa el formulario para crear una nueva tarea.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre de la tarea</Label>
              <Input
                id="name"
                value={newTask.name}
                onChange={(e) => handleNewTaskChange("name", e.target.value)}
                placeholder="Ej. Desarrollo de componente de UI"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Fecha de inicio</Label>
                <Input
                  id="startDate"
                  value={newTask.startDate}
                  onChange={(e) =>
                    handleNewTaskChange("startDate", e.target.value)
                  }
                  placeholder="DD/MM/YYYY"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Fecha de vencimiento</Label>
                <Input
                  id="dueDate"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    handleNewTaskChange("dueDate", e.target.value)
                  }
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="duration">Duración</Label>
                <Input
                  id="duration"
                  value={newTask.duration}
                  onChange={(e) =>
                    handleNewTaskChange("duration", e.target.value)
                  }
                  placeholder="Ej. 2d"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value) =>
                    handleNewTaskChange("priority", value)
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Seleccionar prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project">Proyecto</Label>
              <Select
                value={newTask.project}
                onValueChange={(value) =>
                  handleNewTaskChange("project", value)
                }
              >
                <SelectTrigger id="project">
                  <SelectValue placeholder="Seleccionar proyecto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sin-proyecto">Sin proyecto</SelectItem>
                  <SelectItem value="proyecto-1a">Proyecto 1A</SelectItem>
                  <SelectItem value="proyecto-1b">Proyecto 1B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timeEstimate">Tiempo estimado</Label>
              <Input
                id="timeEstimate"
                value={newTask.timeEstimate}
                onChange={(e) =>
                  handleNewTaskChange("timeEstimate", e.target.value)
                }
                placeholder="Ej. 8h"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewTaskDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateTask}>Crear Tarea</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewEventDialogOpen} onOpenChange={setIsNewEventDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Evento</DialogTitle>
            <DialogDescription>
              Completa el formulario para crear un nuevo evento.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="eventName">Nombre del evento</Label>
              <Input
                id="eventName"
                value={newEvent.name}
                onChange={(e) => handleNewEventChange("name", e.target.value)}
                placeholder="Ej. Reunión de planificación"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="eventDate">Fecha</Label>
                <Input
                  id="eventDate"
                  value={newEvent.date}
                  onChange={(e) =>
                    handleNewEventChange("date", e.target.value)
                  }
                  placeholder="DD/MM/YYYY"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="eventTime">Hora</Label>
                <Input
                  id="eventTime"
                  value={newEvent.time}
                  onChange={(e) =>
                    handleNewEventChange("time", e.target.value)
                  }
                  placeholder="HH:MM - HH:MM"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="eventLocation">Lugar o enlace</Label>
              <Input
                id="eventLocation"
                value={newEvent.location}
                onChange={(e) =>
                  handleNewEventChange("location", e.target.value)
                }
                placeholder="Ubicación o enlace para el evento"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="eventProject">Proyecto</Label>
              <Select
                value={newEvent.project}
                onValueChange={(value) =>
                  handleNewEventChange("project", value)
                }
              >
                <SelectTrigger id="eventProject">
                  <SelectValue placeholder="Seleccionar proyecto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sin-proyecto">Sin proyecto</SelectItem>
                  <SelectItem value="proyecto-1a">Proyecto 1A</SelectItem>
                  <SelectItem value="proyecto-1b">Proyecto 1B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewEventDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateEvent}>Crear Evento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Drawer open={selectedTaskId !== null} onOpenChange={(open) => !open && setSelectedTaskId(null)}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="border-b pb-4">
            <DrawerTitle className="text-lg">Detalles de la tarea</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="h-[calc(85vh-130px)] p-6">
            {selectedTask && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">{selectedTask.name}</h2>
                  {selectedTask.projectLink && (
                    <Link
                      to={selectedTask.projectLink}
                      className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1"
                    >
                      {selectedTask.location}
                      <LinkIcon className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Estado</p>
                    {renderStatusBadge(selectedTask.status)}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Asignado a</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <img src="https://i.pravatar.cc/300" alt="Avatar" />
                      </Avatar>
                      <span>Juan Pérez</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Prioridad</p>
                    {renderPriorityBadge(selectedTask.priority)}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Fecha</p>
                    <p className="text-sm">
                      {selectedTask.startDate} a {selectedTask.dueDate} ({selectedTask.duration})
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Dependencias</p>
                  <div className="text-sm">No hay dependencias</div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Subtareas</p>
                  <div className="text-sm bg-muted/50 rounded-md p-4 text-center">
                    No hay subtareas asignadas
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tiempo registrado</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedTask.timeSpent}</span>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Registrar tiempo
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Archivos</p>
                  <div className="text-sm bg-muted/50 rounded-md p-4 text-center">
                    No hay archivos adjuntos
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Aprobaciones</p>
                  <div className="text-sm bg-muted/50 rounded-md p-4 text-center">
                    No hay aprobaciones pendientes
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Comentarios</p>
                  <div className="text-sm bg-muted/50 rounded-md p-4 text-center">
                    No hay comentarios
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
          <DrawerFooter className="border-t pt-4">
            <div className="flex justify-between">
              <Button variant="outline">Editar</Button>
              <DrawerClose asChild>
                <Button variant="ghost">Cerrar</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
