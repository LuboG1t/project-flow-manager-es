
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronRight, Calendar, Filter, SortDesc, Plus } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

export default function MyTasks() {
  const [currentDate, setCurrentDate] = useState('24/03/2025');
  
  const taskGroups = {
    daily: [
      {
        id: 'task-1',
        name: 'Tarea 1',
        startDate: '24/03/2025',
        dueDate: '28/03/2025',
        duration: '5d',
        status: 'in-review',
        priority: 'high',
        location: 'Portfolio 1 / Proyecto 1A',
        timeSpent: '10h/72h'
      },
      {
        id: 'subtask-1',
        name: 'Subtarea 1',
        startDate: '24/03/2025',
        dueDate: '24/03/2025',
        duration: '1d',
        status: 'completed',
        priority: 'high',
        location: 'Portfolio 1 / Proyecto 1A',
        timeSpent: '8h/8h'
      },
      {
        id: 'subtask-2',
        name: 'Subtarea 2',
        startDate: '24/03/2025',
        dueDate: '24/03/2025',
        duration: '1d',
        status: 'completed',
        priority: 'high',
        location: 'Sin proyecto',
        timeSpent: '8h/8h'
      }
    ],
    overdue: [
      {
        id: 'task-2',
        name: 'Tarea 1',
        startDate: '24/03/2025',
        dueDate: '28/03/2025',
        duration: '5d',
        status: 'in-review',
        priority: 'high',
        location: 'Portfolio 1 / Proyecto 1A',
        timeSpent: '10h/72h'
      }
    ],
    upcoming: [
      {
        id: 'task-3',
        name: 'Tarea 1',
        startDate: '24/03/2025',
        dueDate: '28/03/2025',
        duration: '5d',
        status: 'in-review',
        priority: 'high',
        location: 'Portfolio 1 / Proyecto 1A',
        timeSpent: '10h/72h'
      }
    ]
  };

  const renderStatusBadge = (status: Task['status']) => {
    return (
      <span className={`task-status-pill status-${status}`}>
        {statusLabels[status]}
      </span>
    );
  };

  const renderPriorityBadge = (priority: Task['priority']) => {
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

  const renderTaskTable = (tasks: Task[], title: string) => {
    return (
      <div className="space-y-2">
        <h3 className="text-lg font-medium px-4">{title}</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Nombre</TableHead>
              <TableHead>Fecha de inicio</TableHead>
              <TableHead>Fechas de vencimiento</TableHead>
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
                    <span className="inline-block ml-4">{task.name}</span>
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
      
      <div className="space-y-8">
        {renderTaskTable(taskGroups.daily, 'Tareas del día')}
        {renderTaskTable(taskGroups.overdue, 'Tareas atrasadas')}
        {renderTaskTable(taskGroups.upcoming, 'Tareas próximas a vencer')}
      </div>
    </div>
  );
}

// Helper component for the code example
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

const ChevronRight = ({ className }: { className?: string }) => (
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
    <path d="M9 18l6-6-6-6" />
  </svg>
);
