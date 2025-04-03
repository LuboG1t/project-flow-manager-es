
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Plus, SortDesc, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { ProjectModal } from './ProjectModal';

interface Project {
  id: string;
  name: string;
  lead: {
    name: string;
    initials: string;
  };
  startDate: string;
  endDate: string;
  phase: string;
  progress: number;
  delayed: number;
}

export default function Portfolio() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const projects: Project[] = [
    {
      id: 'project-1a',
      name: 'Proyecto 1A',
      lead: {
        name: 'Alejandro Sánchez',
        initials: 'AS'
      },
      startDate: '2 de marzo de 2025',
      endDate: '22 de mayo de 2025',
      phase: 'Diseño',
      progress: 56,
      delayed: 1
    },
    {
      id: 'project-1b',
      name: 'Proyecto 1B',
      lead: {
        name: 'Alejandro Sánchez',
        initials: 'AS'
      },
      startDate: '20 de febrero de 2025',
      endDate: '22 de mayo de 2025',
      phase: 'Diseño',
      progress: 27,
      delayed: 3
    },
    {
      id: 'project-1c',
      name: 'Proyecto 1C',
      lead: {
        name: 'Alejandro Sánchez',
        initials: 'AS'
      },
      startDate: '22 de enero de 2025',
      endDate: '21 de junio de 2025',
      phase: 'Despliegue',
      progress: 100,
      delayed: 0
    }
  ];
  
  const portfolioStats = {
    active: 3,
    completed: 1,
    totalTasks: 31,
    finishedTasks: 1,
    pendingTasks: 30,
    delayedTasks: 0
  };
  
  const getPhaseBadgeClass = (phase: string) => {
    switch (phase) {
      case 'Diseño':
        return 'bg-phase-design/20 text-phase-design';
      case 'Desarrollo':
        return 'bg-phase-development/20 text-phase-development';
      case 'Despliegue':
        return 'bg-phase-deployment/20 text-phase-deployment';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  return (
    <div className="container py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Portafolio 1</h1>
          <p className="text-muted-foreground">Gestión de proyectos</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="gantt">Gantt</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-6 gap-4 mb-6">
        <div className="col-span-1 p-4 border rounded-md bg-card">
          <p className="text-sm text-muted-foreground">Proyectos activos</p>
          <h3 className="text-2xl font-bold">{portfolioStats.active}</h3>
        </div>
        <div className="col-span-1 p-4 border rounded-md bg-card">
          <p className="text-sm text-muted-foreground">Proyectos completados</p>
          <h3 className="text-2xl font-bold">{portfolioStats.completed}</h3>
        </div>
        <div className="col-span-1 p-4 border rounded-md bg-card">
          <p className="text-sm text-muted-foreground">Tareas en total</p>
          <h3 className="text-2xl font-bold">{portfolioStats.totalTasks}</h3>
        </div>
        <div className="col-span-1 p-4 border rounded-md bg-card">
          <p className="text-sm text-muted-foreground">Tareas finalizadas</p>
          <h3 className="text-2xl font-bold">{portfolioStats.finishedTasks}</h3>
        </div>
        <div className="col-span-1 p-4 border rounded-md bg-card">
          <p className="text-sm text-muted-foreground">Tareas sin finalizar</p>
          <h3 className="text-2xl font-bold">{portfolioStats.pendingTasks}</h3>
        </div>
        <div className="col-span-1 p-4 border rounded-md bg-card">
          <p className="text-sm text-muted-foreground">Tareas con retraso</p>
          <h3 className="text-2xl font-bold">{portfolioStats.delayedTasks}</h3>
        </div>
      </div>
      
      <div className="mb-4 flex items-center justify-between">
        <Button className="gap-1" onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Agregar proyecto
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
      
      <div className="border rounded-md bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Nombre del proyecto</TableHead>
              <TableHead>Jefe de proyecto</TableHead>
              <TableHead>Fecha de inicio</TableHead>
              <TableHead>Fecha de fin</TableHead>
              <TableHead>Fase</TableHead>
              <TableHead>Progreso total</TableHead>
              <TableHead>Observaciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} className="hover:bg-muted/40">
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <span>{project.lead.initials}</span>
                    </Avatar>
                    <span>{project.lead.name}</span>
                  </div>
                </TableCell>
                <TableCell>{project.startDate}</TableCell>
                <TableCell>{project.endDate}</TableCell>
                <TableCell>
                  <Badge className={getPhaseBadgeClass(project.phase)}>
                    {project.phase}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  {project.delayed > 0 ? (
                    <div className="flex items-center gap-1 text-red-500">
                      <AlertTriangle className="h-4 w-4" />
                      <span>
                        {project.delayed} {project.delayed === 1 ? 'tarea' : 'tareas'} con retraso
                      </span>
                    </div>
                  ) : (
                    <span className="text-green-600">Todo en tiempo</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <ProjectModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </div>
  );
}
