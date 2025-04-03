
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Cell,
} from 'recharts';
import {
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  CalendarDays,
  BarChart3,
  PlusCircle,
  Filter,
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { AvatarGroup } from '@/components/ui/avatar-group';
import { Badge } from '@/components/ui/badge';
import { GanttChart } from '@/components/project/GanttChart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ProjectProgress {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'delayed';
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
    delayed: number;
  };
  team: {
    lead: {
      name: string;
      initials: string;
    };
    members: number;
  };
}

export default function PortfolioDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'gantt'>('overview');
  
  // Sample data
  const projects: ProjectProgress[] = [
    {
      id: '1a',
      name: 'Proyecto 1A',
      startDate: '02/03/2025',
      endDate: '22/05/2025',
      progress: 65,
      status: 'on-track',
      tasks: {
        total: 43,
        completed: 28,
        inProgress: 12,
        delayed: 3,
      },
      team: {
        lead: {
          name: 'Alejandro S.',
          initials: 'AS',
        },
        members: 5,
      },
    },
    {
      id: '1b',
      name: 'Proyecto 1B',
      startDate: '20/02/2025',
      endDate: '15/04/2025',
      progress: 45,
      status: 'at-risk',
      tasks: {
        total: 35,
        completed: 15,
        inProgress: 15,
        delayed: 5,
      },
      team: {
        lead: {
          name: 'Carlos P.',
          initials: 'CP',
        },
        members: 4,
      },
    },
    {
      id: '1c',
      name: 'Proyecto 1C',
      startDate: '15/01/2025',
      endDate: '10/06/2025',
      progress: 25,
      status: 'delayed',
      tasks: {
        total: 50,
        completed: 10,
        inProgress: 25,
        delayed: 15,
      },
      team: {
        lead: {
          name: 'Mariangel',
          initials: 'MA',
        },
        members: 7,
      },
    },
    {
      id: '1d',
      name: 'Proyecto 1D',
      startDate: '01/04/2025',
      endDate: '30/08/2025',
      progress: 5,
      status: 'on-track',
      tasks: {
        total: 60,
        completed: 3,
        inProgress: 5,
        delayed: 0,
      },
      team: {
        lead: {
          name: 'Guillermo V.',
          initials: 'GV',
        },
        members: 3,
      },
    },
  ];

  // Charts data
  const progressChartData = [
    {
      month: 'Ene',
      planned: 10,
      actual: 8,
    },
    {
      month: 'Feb',
      planned: 25,
      actual: 20,
    },
    {
      month: 'Mar',
      planned: 40,
      actual: 30,
    },
    {
      month: 'Abr',
      planned: 60,
      actual: 45,
    },
    {
      month: 'May',
      planned: 85,
      actual: 65,
    },
  ];

  const resourcesData = [
    { name: 'Desarrollo', planned: 80, actual: 65 },
    { name: 'Diseño', planned: 60, actual: 55 },
    { name: 'QA', planned: 40, actual: 30 },
    { name: 'DevOps', planned: 30, actual: 25 },
    { name: 'Management', planned: 20, actual: 20 },
  ];

  const statusColorMap = {
    'on-track': 'text-green-600',
    'at-risk': 'text-yellow-600',
    'delayed': 'text-red-600',
  };

  const statusIconMap = {
    'on-track': CheckCircle,
    'at-risk': AlertTriangle,
    'delayed': XCircle,
  };

  const statusTextMap = {
    'on-track': 'En tiempo',
    'at-risk': 'En riesgo',
    'delayed': 'Con retraso',
  };

  const getStatusComponent = (status: 'on-track' | 'at-risk' | 'delayed') => {
    const Icon = statusIconMap[status];
    return (
      <div className={`flex items-center gap-1.5 ${statusColorMap[status]}`}>
        <Icon className="h-4 w-4" />
        <span>{statusTextMap[status]}</span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="container py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Portafolio 1</h1>
            <p className="text-muted-foreground">Vista general de los proyectos del portafolio</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
              <TabsList>
                <TabsTrigger value="overview">Vista general</TabsTrigger>
                <TabsTrigger value="gantt">Gantt</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Nuevo proyecto
            </Button>
          </div>
        </div>
        
        {activeTab === 'overview' ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Proyectos</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <div className="flex items-center pt-1">
                    <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
                    <span className="text-xs text-emerald-500">+1 este trimestre</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tareas totales</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">188</div>
                  <div className="flex items-center pt-1">
                    <span className="text-xs text-muted-foreground">56 completadas (29.8%)</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Miembros del equipo</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <div className="flex items-center pt-1">
                    <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
                    <span className="text-xs text-emerald-500">+2 este mes</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tareas con retraso</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <div className="flex items-center pt-1">
                    <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                    <span className="text-xs text-red-500">+5 esta semana</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progreso del portafolio</CardTitle>
                  <CardDescription>Progreso planeado vs. actual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={progressChartData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="planned"
                          name="Progreso planeado"
                          stroke="#8884d8"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="actual"
                          name="Progreso actual"
                          stroke="#82ca9d"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Utilización de recursos</CardTitle>
                  <CardDescription>Recursos planeados vs. utilizados por departamento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        layout="vertical"
                        data={resourcesData}
                        margin={{
                          top: 20,
                          right: 20,
                          bottom: 20,
                          left: 70,
                        }}
                      >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="planned"
                          name="Horas planificadas"
                          stackId="a"
                          fill="#8884d8"
                          barSize={20}
                        />
                        <Bar
                          dataKey="actual"
                          name="Horas actuales"
                          stackId="a"
                          fill="#82ca9d"
                          barSize={20}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Projects Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Proyectos activos</CardTitle>
                    <CardDescription>Estado y progreso de los proyectos en el portafolio</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Filter className="h-4 w-4" />
                    Filtrar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Proyecto</TableHead>
                      <TableHead>Líder</TableHead>
                      <TableHead>Fechas</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Tareas</TableHead>
                      <TableHead>Progreso</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                              project.status === 'on-track' ? 'bg-green-500' :
                              project.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></span>
                            {project.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <span className="text-xs">{project.team.lead.initials}</span>
                            </Avatar>
                            <div>
                              <p className="text-sm">{project.team.lead.name}</p>
                              <p className="text-xs text-muted-foreground">{project.team.members} miembros</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col text-sm">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{project.startDate} - {project.endDate}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusComponent(project.status)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center gap-1 mb-0.5">
                              <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                              <span>{project.tasks.completed}/{project.tasks.total} completadas</span>
                            </div>
                            {project.tasks.delayed > 0 && (
                              <div className="flex items-center gap-1">
                                <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                                <span>{project.tasks.delayed} con retraso</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="w-full space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{project.progress}%</span>
                            </div>
                            <Progress 
                              value={project.progress} 
                              className="h-2"
                              indicatorClassName={
                                project.status === 'on-track' ? 'bg-green-500' :
                                project.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Planificación de proyectos</CardTitle>
              <CardDescription>Vista Gantt de todos los proyectos en el portafolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px]">
                {/* Placeholder for Gantt Chart - this would be a more complex component */}
                <div className="border p-6 h-full bg-muted/10 flex items-center justify-center">
                  <div className="text-center">
                    <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">Vista Gantt del Portafolio</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Aquí se mostraría una vista Gantt de todos los proyectos en el portafolio,
                      <br />con sus fases, tareas y dependencias.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
