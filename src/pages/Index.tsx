
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowUpRight, Clock, Activity, CheckCircle, AlertTriangle, BarChart2, PieChart as PieChartIcon } from "lucide-react";
import GanttView from "../components/project/GanttView";

const progressData = [
  { name: 'Proyecto 1A', progress: 75 },
  { name: 'Proyecto 1B', progress: 40 },
  { name: 'Proyecto 2', progress: 20 },
  { name: 'Proyecto 3', progress: 10 },
];

const activityData = [
  { name: 'Lun', tasks: 4 },
  { name: 'Mar', tasks: 7 },
  { name: 'Mié', tasks: 3 },
  { name: 'Jue', tasks: 5 },
  { name: 'Vie', tasks: 8 },
  { name: 'Sáb', tasks: 2 },
  { name: 'Dom', tasks: 0 },
];

const taskStatusData = [
  { name: 'Completadas', value: 15, color: '#22c55e' },
  { name: 'En Progreso', value: 10, color: '#3b82f6' },
  { name: 'No Iniciadas', value: 8, color: '#9ca3af' },
  { name: 'Retrasadas', value: 4, color: '#ef4444' },
];

export default function Index() {
  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tareas Totales</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">37</div>
              <p className="text-xs text-muted-foreground">
                +12% respecto al mes anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tareas Completadas</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                +25% respecto al mes anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tiempo Registrado</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120h</div>
              <p className="text-xs text-muted-foreground">
                +5% respecto al mes anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tareas Retrasadas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">4</div>
              <p className="text-xs text-muted-foreground">
                -10% respecto al mes anterior
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Actividad reciente</CardTitle>
              <CardDescription>Tareas completadas por día</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle>Estado de tareas</CardTitle>
              <Tabs defaultValue="chart">
                <TabsList className="grid w-[160px] grid-cols-2">
                  <TabsTrigger value="chart">
                    <PieChartIcon className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <BarChart2 className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent value="chart" className="mt-0">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="list" className="mt-0">
                <div className="space-y-4">
                  {taskStatusData.map((status) => (
                    <div key={status.name} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2`} style={{ backgroundColor: status.color }} />
                      <span className="flex-1">{status.name}</span>
                      <span className="font-medium">{status.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle>Progreso de proyectos</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                Ver todos <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {progressData.map((project) => (
                  <div key={project.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-muted-foreground">{project.progress}%</div>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Equipo</CardTitle>
              <CardDescription>
                Miembros activos del equipo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>CP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Carlos Pérez</p>
                    <p className="text-xs text-muted-foreground">Desarrollador</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">8 tareas</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>AG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Ana Gómez</p>
                    <p className="text-xs text-muted-foreground">Diseñadora</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">5 tareas</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>MT</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Miguel Torres</p>
                    <p className="text-xs text-muted-foreground">QA</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">3 tareas</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>LS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Laura Sánchez</p>
                    <p className="text-xs text-muted-foreground">PM</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">10 tareas</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Vista Gantt</CardTitle>
            <CardDescription>
              Planificación temporal de proyectos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GanttView projectId="project-1a" />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
