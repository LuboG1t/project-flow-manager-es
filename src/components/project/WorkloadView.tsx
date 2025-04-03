
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ResourceTask {
  name: string;
  project: string;
  hours: number[];
  total: number;
}

interface Resource {
  id: string;
  name: string;
  initials: string;
  role: string;
  tasks: ResourceTask[];
  totalHours: number;
  capacity: number;
}

export default function WorkloadView() {
  const [period, setPeriod] = React.useState('week');
  
  const resources: Resource[] = [
    {
      id: 'resource-1',
      name: 'Enrique González Díaz',
      initials: 'EG',
      role: 'Desarrollador (2)',
      capacity: 40,
      totalHours: 26,
      tasks: [
        {
          name: 'Creación de modelos y base de datos',
          project: 'Proyecto 1A',
          hours: [0, 0, 0, 0, 2, 4, 4, 0, 0, 4, 4, 4, 4, 0],
          total: 26
        },
        {
          name: 'Creación de componentes principales',
          project: 'Proyecto 1A', 
          hours: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          total: 0
        }
      ]
    },
    {
      id: 'resource-2',
      name: 'Lucia Boy',
      initials: 'LB',
      role: 'Diseñadora (1)',
      capacity: 40,
      totalHours: 16,
      tasks: [
        {
          name: 'Create Project Charter',
          project: 'Wayne Enterprises - Acme HRMS Onboarding',
          hours: [0, 0, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          total: 16
        }
      ]
    },
    {
      id: 'resource-3',
      name: 'Sin asignar',
      initials: '',
      role: '',
      capacity: 0,
      totalHours: 0,
      tasks: []
    }
  ];
  
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].slice(0, 14);
  const monthName = 'Mar';
  
  const getHoursClass = (hours: number, capacity: number) => {
    if (hours === 0) return 'bg-transparent text-muted-foreground';
    if (hours > (capacity / 5) * 0.8) return 'bg-red-100 text-red-800'; // Overallocated (>80% daily capacity)
    return 'bg-blue-100 text-blue-800'; // Allocated but not overallocated
  };
  
  return (
    <div className="flex-1 p-4 h-full overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Mar 1-Mar 31</h2>
          <p className="text-muted-foreground">252 horas</p>
        </div>
        
        <Select defaultValue={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Semana</SelectItem>
            <SelectItem value="month">Mes</SelectItem>
            <SelectItem value="quarter">Trimestre</SelectItem>
            <SelectItem value="year">Año</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="border rounded-md bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40 sticky top-0">
            <TableRow>
              <TableHead className="w-[250px]">Nombre</TableHead>
              <TableHead className="w-[80px] text-center bg-muted/60">Total</TableHead>
              {daysOfWeek.map(day => (
                <TableHead 
                  key={`day-${day}`} 
                  className={`w-[50px] text-center ${day % 7 === 6 || day % 7 === 0 ? 'bg-muted/20' : ''}`}
                >
                  <div className="flex flex-col items-center">
                    <span>{day}</span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map(resource => (
              <React.Fragment key={resource.id}>
                {/* Resource row */}
                <TableRow className="bg-muted/10 hover:bg-muted/20">
                  <TableCell className="p-2">
                    <div className="flex items-center gap-2">
                      {resource.initials ? (
                        <Avatar className="h-7 w-7 bg-primary">
                          <span className="text-xs">{resource.initials}</span>
                        </Avatar>
                      ) : (
                        <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-500">?</span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{resource.name}</p>
                        {resource.role && (
                          <p className="text-xs text-muted-foreground">{resource.role}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {resource.totalHours}
                  </TableCell>
                  {daysOfWeek.map(day => {
                    // Calculate total hours for this resource on this day
                    const totalHours = resource.tasks.reduce(
                      (sum, task) => sum + (task.hours[day - 1] || 0), 0
                    );
                    
                    return (
                      <TableCell 
                        key={`${resource.id}-day-${day}`} 
                        className={`text-center ${day % 7 === 6 || day % 7 === 0 ? 'bg-muted/5' : ''}`}
                      >
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${getHoursClass(totalHours, resource.capacity)}`}>
                          {totalHours > 0 ? totalHours : ''}
                        </span>
                      </TableCell>
                    );
                  })}
                </TableRow>
                
                {/* Task rows for this resource */}
                {resource.tasks.map((task, taskIdx) => (
                  <TableRow key={`${resource.id}-task-${taskIdx}`} className="hover:bg-muted/10">
                    <TableCell className="p-2 pl-10">
                      <div>
                        <p className="text-sm">{task.name}</p>
                        {task.project && (
                          <p className="text-xs text-muted-foreground">{task.project}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      {task.total}
                    </TableCell>
                    {daysOfWeek.map(day => {
                      const hours = task.hours[day - 1] || 0;
                      return (
                        <TableCell 
                          key={`${resource.id}-task-${taskIdx}-day-${day}`} 
                          className={`text-center ${day % 7 === 6 || day % 7 === 0 ? 'bg-muted/5' : ''}`}
                        >
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${hours > 0 ? 'text-muted-foreground' : ''}`}>
                            {hours > 0 ? hours : ''}
                          </span>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
