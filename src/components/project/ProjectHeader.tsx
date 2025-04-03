
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ListTodo, KanbanSquare, GanttChart, BarChart4, Calendar, Users, Share2, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface ProjectHeaderProps {
  project: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    team: string;
    portfolio: string;
  };
  activeView: 'list' | 'kanban' | 'gantt' | 'workload';
  onChangeView: (view: 'list' | 'kanban' | 'gantt' | 'workload') => void;
}

export default function ProjectHeader({ 
  project, 
  activeView,
  onChangeView
}: ProjectHeaderProps) {
  return (
    <div className="border-b pb-1">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="space-y-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/equipos/desarrollo">
                  <div className="bg-blue-100 text-blue-800 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium">
                    <Users size={12} />
                    <span>{project.team}</span>
                  </div>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/portfolios/1">
                  <div className="bg-purple-100 text-purple-800 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium">
                    <Briefcase size={12} />
                    <span>{project.portfolio}</span>
                  </div>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-medium">{project.name}</h1>
            <Badge variant="outline" className="text-xs">
              {project.startDate} - {project.endDate}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <span>AS</span>
          </Avatar>
          <Button variant="outline" size="sm">
            <Share2 className="mr-1 h-4 w-4" />
            Invitar
          </Button>
        </div>
      </div>
      
      <div className="px-6">
        <Tabs defaultValue={activeView} className="w-full" onValueChange={(v) => onChangeView(v as any)}>
          <TabsList className="grid grid-cols-4 w-fit">
            <TabsTrigger value="list" className="flex items-center gap-1.5">
              <ListTodo className="h-4 w-4" />
              <span>Lista</span>
            </TabsTrigger>
            <TabsTrigger value="kanban" className="flex items-center gap-1.5">
              <KanbanSquare className="h-4 w-4" />
              <span>Kanban</span>
            </TabsTrigger>
            <TabsTrigger value="gantt" className="flex items-center gap-1.5">
              <GanttChart className="h-4 w-4" />
              <span>Gantt</span>
            </TabsTrigger>
            <TabsTrigger value="workload" className="flex items-center gap-1.5">
              <BarChart4 className="h-4 w-4" />
              <span>Carga de trabajo</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
