import React from 'react';
import Layout from '../components/layout/Layout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, TrendingUp, Briefcase, Clock, Calendar, 
  CheckSquare, XCircle, AlertTriangle, Trophy
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { AvatarGroup } from '@/components/ui/avatar-group';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GanttChart from '@/components/project/GanttChart';

export default function PortfolioDashboard() {
  // Sample data for charts
  const projectStatusData = [
    { name: 'En tiempo', value: 5, color: '#10b981' },
    { name: 'En riesgo', value: 2, color: '#f59e0b' },
    { name: 'Con retraso', value: 1, color: '#ef4444' },
  ];

  const workloadData = [
    { name: 'Ana M.', assigned: 42, completed: 30 },
    { name: 'Guillermo V.', assigned: 28, completed: 19 },
    { name: 'Mariangel', assigned: 38, completed: 35 },
    { name: 'Carlos P.', assigned: 24, completed: 20 },
    { name: 'Luis R.', assigned: 32, completed: 18 },
  ];

  const teamMembers = [
    { name: 'Ana M.', role: 'Diseñador UI/UX', initials: 'AM', tasks: 12, completed: 9 },
    { name: 'Guillermo V.', role: 'Desarrollador Frontend', initials: 'GV', tasks: 15, completed: 10 },
    { name: 'Mariangel', role: 'Desarrollador Backend', initials: 'MA', tasks: 18, completed: 16 },
    { name: 'Carlos P.', role: 'QA Tester', initials: 'CP', tasks: 14, completed: 12 },
    { name: 'Luis R.', role: 'DevOps Engineer', initials: 'LR', tasks: 10, completed: 6 },
  ];

  const upcomingEvents = [
    { id: '1', title: 'Reunión de planificación semanal', date: '05/04/2025', time: '10:00 AM', participants: 8 },
    { id: '2', title: 'Demo de producto', date: '08/04/2025', time: '2:00 PM', participants: 12 },
    { id: '3', title: 'Revisión de sprint', date: '10/04/2025', time: '11:30 AM', participants: 10 },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const tasks = [
    { id: '1', name: 'Task 1', start: '01/04/2025', end: '10/04/2025', progress: 60 },
    { id: '2', name: 'Task 2', start: '05/04/2025', end: '15/04/2025', progress: 30 },
    { id: '3', name: 'Task 3', start: '12/04/2025', end: '22/04/2025', progress: 80 },
  ];

  return (
    <Layout>
      <div className="container py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard del Portafolio</h1>
            <p className="text-muted-foreground">Rendimiento y estado general del portafolio</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Tabs defaultValue="month">
              <TabsList>
                <TabsTrigger value="week">Semana</TabsTrigger>
                <TabsTrigger value="month">Mes</TabsTrigger>
                <TabsTrigger value="quarter">Trimestre</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Miembros del Equipo</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                2 nuevos este mes
              </p>
              <AvatarGroup className="mt-3 justify-start">
                {teamMembers.slice(0, 5).map((member, i) => (
                  <Avatar key={i} className="border-background">
                    <span>{member.initials}</span>
                  </Avatar>
                ))}
                <Avatar className="bg-muted text-muted-foreground border-background">
                  <span>+3</span>
                </Avatar>
              </AvatarGroup>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proyectos Activos</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                8 proyectos en total
              </p>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm">Proyecto 1A (4 tareas)</span>
                </div>
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  <span className="text-sm">Proyecto 1B (3 tareas)</span>
                </div>
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
                  <span className="text-sm">Proyecto 1C (1 tarea)</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Horas Registradas</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">186</div>
              <p className="text-xs text-muted-foreground">
                +12% respecto al mes anterior
              </p>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>Objetivo mensual</span>
                  <span className="font-medium">186/200 horas</span>
                </div>
                <Progress value={93} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eficiencia</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                +5% respecto al mes anterior
              </p>
              <div className="mt-3 w-full bg-muted rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full"
                  style={{ width: '87%' }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Estado de los proyectos</CardTitle>
              <CardDescription>Distribución de proyectos por estado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Carga de trabajo del equipo</CardTitle>
              <CardDescription>Tareas asignadas vs. completadas por miembro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={workloadData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="assigned" name="Tareas asignadas" fill="#93c5fd" />
                    <Bar dataKey="completed" name="Tareas completadas" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gantt Chart */}
        <div className="mb-6">
          <GanttChart tasks={tasks} title="Planificación del Portafolio" />
        </div>

        {/* Team members and upcoming events */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Rendimiento del equipo</CardTitle>
              <CardDescription>Resumen de actividad por miembro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {teamMembers.map((member, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border-2 border-primary/10">
                      <span>{member.initials}</span>
                    </Avatar>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                        <div className="text-sm">
                          {member.completed}/{member.tasks} tareas
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 w-full">
                        <Progress 
                          value={(member.completed / member.tasks) * 100} 
                          className="h-2 flex-1"
                        />
                        <span className="text-xs font-medium">{Math.round((member.completed / member.tasks) * 100)}%</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {member.completed / member.tasks > 0.8 ? (
                        <Trophy className="h-5 w-5 text-amber-500" />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos eventos</CardTitle>
              <CardDescription>Reuniones y fechas importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <p className="font-medium">{event.title}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                      <span>•</span>
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <AvatarGroup className="justify-start -space-x-2">
                        {[...Array(4)].map((_, i) => (
                          <Avatar key={i} className="h-6 w-6 border-background">
                            <span className="text-[10px]">U{i+1}</span>
                          </Avatar>
                        ))}
                      </AvatarGroup>
                      {event.participants > 4 && (
                        <span className="text-xs text-muted-foreground">+{event.participants - 4} más</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-800 flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                Tareas completadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">72</div>
              <p className="text-xs text-green-700">+8% respecto a la semana pasada</p>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-800 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Tareas en riesgo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-800">15</div>
              <p className="text-xs text-amber-700">-3% respecto a la semana pasada</p>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-800 flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Tareas con retraso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-800">7</div>
              <p className="text-xs text-red-700">+2 desde la semana pasada</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
