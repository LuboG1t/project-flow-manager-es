
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskList from '../components/project/TaskList';
import KanbanView from '../components/project/KanbanView';

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
        
        {viewMode === 'list' ? <TaskList /> : <KanbanView />}
      </div>
    </Layout>
  );
}
