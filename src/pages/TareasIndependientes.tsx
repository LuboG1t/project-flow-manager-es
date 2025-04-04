
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskList from '../components/project/TaskList';
import KanbanView from '../components/project/KanbanView';
import { Plus, Filter, SortDesc, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TareasIndependientes() {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  
  return (
    <Layout>
      <div className="container py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Tareas Independientes</h1>
            <p className="text-muted-foreground">Gestión de tareas sin proyecto asignado</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Tabs defaultValue={viewMode} onValueChange={(v) => setViewMode(v as 'list' | 'kanban')}>
              <TabsList>
                <TabsTrigger value="list">Lista</TabsTrigger>
                <TabsTrigger value="kanban">Kanban</TabsTrigger>
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
              <DropdownMenuItem>
                Nueva tarea
              </DropdownMenuItem>
              <DropdownMenuItem>
                Nueva subtarea
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex items-center gap-2">
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
        
        {viewMode === 'list' ? <TaskList /> : <KanbanView />}
      </div>
    </Layout>
  );
}
