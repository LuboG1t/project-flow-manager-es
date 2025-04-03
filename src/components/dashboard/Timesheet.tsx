
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, ChevronRight, CalendarRange } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TimesheetEntry {
  id: string;
  task: string;
  project: string;
  hours: Record<string, string>;
  total: string;
}

export default function Timesheet() {
  const [viewMode, setViewMode] = React.useState<'personal' | 'project'>('personal');
  const [selectedProject, setSelectedProject] = React.useState<string | null>(null);
  
  // Mock timesheet data
  const timesheetData = {
    tracking: {
      total: '13h 50m',
      capacity: '40h'
    },
    weekDays: [
      { day: 'Mon', date: '08 Nov' },
      { day: 'Tue', date: '09 Nov' },
      { day: 'Wed', date: '10 Nov' },
      { day: 'Thu', date: '11 Nov' },
      { day: 'Fri', date: '12 Nov' },
      { day: 'Sat', date: '13 Nov' },
      { day: 'Sun', date: '14 Nov' },
    ],
    entries: [
      {
        id: 'entry-1',
        task: 'Create Project Charter',
        project: 'Wayne Enterprises - Acme HRMS Onboarding',
        hours: {
          'Mon': '30m',
          'Tue': '1h 00m',
          'Wed': '45m',
          'Thu': '-',
          'Fri': '1h 30m',
          'Sat': '-',
          'Sun': '-',
        },
        total: '3h 45m'
      },
      {
        id: 'entry-2',
        task: 'Kick-off Preparation',
        project: 'Wayne Enterprises - Acme HRMS Onboarding',
        hours: {
          'Mon': '1h 00m',
          'Tue': '20m',
          'Wed': '2h 30m',
          'Thu': '15m',
          'Fri': '-',
          'Sat': '-',
          'Sun': '-',
        },
        total: '4h 05m'
      }
    ],
    totals: {
      'Mon': '1h 30m',
      'Tue': '1h 20m',
      'Wed': '3h 15m',
      'Thu': '15m',
      'Fri': '1h 30m',
      'Sat': '0m',
      'Sun': '0m',
      'total': '7h 50m'
    }
  };
  
  // Project timesheet data
  const projectTimesheetData = {
    tracking: {
      total: '49h 50m',
      capacity: '1760h'
    },
    resources: [
      {
        id: 'resource-1',
        name: 'Enrique González Díaz',
        initials: 'EG',
        entries: [
          {
            id: 'entry-1',
            task: 'Create Project Charter',
            project: 'Wayne Enterprises - Acme HRMS Onboarding',
            hours: {
              'Mon': '30m',
              'Tue': '1h 00m',
              'Wed': '45m',
              'Thu': '-',
              'Fri': '1h 30m',
              'Sat': '-',
              'Sun': '-',
            },
            total: '3h 45m'
          },
          {
            id: 'entry-2',
            task: 'Kick-off Preparation',
            project: 'Wayne Enterprises - Acme HRMS Onboarding',
            hours: {
              'Mon': '1h 00m',
              'Tue': '20m',
              'Wed': '2h 30m',
              'Thu': '15m',
              'Fri': '-',
              'Sat': '-',
              'Sun': '-',
            },
            total: '4h 05m'
          },
        ],
        subtotal: {
          'Mon': '1h 30m',
          'Tue': '1h 20m',
          'Wed': '3h 15m',
          'Thu': '15m',
          'Fri': '1h 30m',
          'Sat': '0m',
          'Sun': '0m',
          'total': '7h 50m'
        }
      },
      {
        id: 'resource-2',
        name: 'Lucia Boy',
        initials: 'LB',
        entries: [
          {
            id: 'entry-3',
            task: 'Create Project Charter',
            project: 'Wayne Enterprises - Acme HRMS Onboarding',
            hours: {
              'Mon': '30m',
              'Tue': '1h 00m',
              'Wed': '45m',
              'Thu': '-',
              'Fri': '1h 30m',
              'Sat': '-',
              'Sun': '-',
            },
            total: '3h 45m'
          },
          {
            id: 'entry-4',
            task: 'Kick-off Preparation',
            project: 'Wayne Enterprises - Acme HRMS Onboarding',
            hours: {
              'Mon': '1h 00m',
              'Tue': '20m',
              'Wed': '2h 30m',
              'Thu': '15m',
              'Fri': '-',
              'Sat': '-',
              'Sun': '-',
            },
            total: '4h 05m'
          },
        ],
        subtotal: {
          'Mon': '1h 30m',
          'Tue': '1h 20m',
          'Wed': '3h 15m',
          'Thu': '15m',
          'Fri': '1h 30m',
          'Sat': '0m',
          'Sun': '0m',
          'total': '7h 50m'
        }
      }
    ],
    totals: {
      'Mon': '1h 30m',
      'Tue': '1h 20m',
      'Wed': '3h 15m',
      'Thu': '15m',
      'Fri': '1h 30m',
      'Sat': '0m',
      'Sun': '0m',
      'total': '7h 50m'
    }
  };
  
  const renderPersonalTimesheet = () => {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">Tiempo total registrado</h2>
              <span className="text-xl font-bold">{timesheetData.tracking.total}</span>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-md font-medium">Capacidad de Srikrishnan</h2>
              <span className="text-md font-medium">{timesheetData.tracking.capacity}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-1.5" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-1.5">
              <span className="text-sm">08 Nov 21 - 14 Nov 21</span>
            </Button>
            <Button variant="outline" className="gap-1.5" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="border rounded-md bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[300px] bg-muted/70">Tasks</TableHead>
                {timesheetData.weekDays.map((day) => (
                  <TableHead 
                    key={day.day} 
                    className="text-center w-[100px]"
                  >
                    <div className="flex flex-col">
                      <span>{day.day}</span>
                      <span className="text-xs text-muted-foreground">{day.date}</span>
                    </div>
                  </TableHead>
                ))}
                <TableHead className="text-center bg-muted/70">Total time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timesheetData.entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="bg-muted/5">
                    <div>
                      <p className="font-medium">{entry.task}</p>
                      <p className="text-xs text-muted-foreground">{entry.project}</p>
                    </div>
                  </TableCell>
                  {timesheetData.weekDays.map((day) => (
                    <TableCell key={`${entry.id}-${day.day}`} className="text-center">
                      {entry.hours[day.day]}
                    </TableCell>
                  ))}
                  <TableCell className="text-center font-medium bg-muted/5">
                    {entry.total}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/20">
                <TableCell className="font-medium">Total time</TableCell>
                {timesheetData.weekDays.map((day) => (
                  <TableCell key={`total-${day.day}`} className="text-center font-medium">
                    {timesheetData.totals[day.day]}
                  </TableCell>
                ))}
                <TableCell className="text-center font-medium">
                  {timesheetData.totals.total}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </>
    );
  };
  
  const renderProjectTimesheet = () => {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">Tiempo total registrado</h2>
              <span className="text-xl font-bold">{projectTimesheetData.tracking.total}</span>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-md font-medium">Capacidad del equipo</h2>
              <span className="text-md font-medium">{projectTimesheetData.tracking.capacity}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Select defaultValue="proyecto-1a">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar proyecto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los proyectos</SelectItem>
                <SelectItem value="proyecto-1a">Proyecto 1A</SelectItem>
                <SelectItem value="proyecto-1b">Proyecto 1B</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="gap-1.5" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-1.5">
              <span className="text-sm">08 Nov 21 - 14 Nov 21</span>
            </Button>
            <Button variant="outline" className="gap-1.5" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="border rounded-md bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[300px] bg-muted/70">Tasks</TableHead>
                {timesheetData.weekDays.map((day) => (
                  <TableHead 
                    key={day.day} 
                    className="text-center w-[100px]"
                  >
                    <div className="flex flex-col">
                      <span>{day.day}</span>
                      <span className="text-xs text-muted-foreground">{day.date}</span>
                    </div>
                  </TableHead>
                ))}
                <TableHead className="text-center bg-muted/70">Total time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectTimesheetData.resources.map((resource) => (
                <React.Fragment key={resource.id}>
                  <TableRow className="bg-muted/10 hover:bg-muted/20">
                    <TableCell className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center">
                          <span className="text-xs">{resource.initials}</span>
                        </div>
                        <span className="font-medium">{resource.name}</span>
                      </div>
                    </TableCell>
                    {timesheetData.weekDays.map((day) => (
                      <TableCell key={`${resource.id}-${day.day}`} className="text-center">
                        {/* Empty cell for resource row */}
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      {/* Empty cell for resource row */}
                    </TableCell>
                  </TableRow>
                  
                  {/* Entries for this resource */}
                  {resource.entries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="py-2 pl-10">
                        <div>
                          <p className="text-sm">{entry.task}</p>
                          <p className="text-xs text-muted-foreground">{entry.project}</p>
                        </div>
                      </TableCell>
                      {timesheetData.weekDays.map((day) => (
                        <TableCell key={`${entry.id}-${day.day}`} className="text-center">
                          {entry.hours[day.day]}
                        </TableCell>
                      ))}
                      <TableCell className="text-center">
                        {entry.total}
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {/* Subtotal row for this resource */}
                  <TableRow className="border-t">
                    <TableCell className="text-sm bg-muted/5">
                      Subtotal time
                    </TableCell>
                    {timesheetData.weekDays.map((day) => (
                      <TableCell key={`${resource.id}-subtotal-${day.day}`} className="text-center text-sm bg-muted/5">
                        {resource.subtotal[day.day]}
                      </TableCell>
                    ))}
                    <TableCell className="text-center text-sm font-medium bg-muted/5">
                      {resource.subtotal.total}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
              
              {/* Total row */}
              <TableRow className="bg-muted/20">
                <TableCell className="font-medium">Total time</TableCell>
                {timesheetData.weekDays.map((day) => (
                  <TableCell key={`total-${day.day}`} className="text-center font-medium">
                    {projectTimesheetData.totals[day.day]}
                  </TableCell>
                ))}
                <TableCell className="text-center font-medium">
                  {projectTimesheetData.totals.total}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </>
    );
  };
  
  return (
    <div className="container py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Timesheet</h1>
          <p className="text-muted-foreground">Seguimiento del tiempo dedicado a las tareas</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select 
            defaultValue="personal" 
            onValueChange={(value) => setViewMode(value as 'personal' | 'project')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar vista" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="project">Por proyecto</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="gap-1.5">
            <CalendarRange className="h-4 w-4 mr-1" />
            <span>Esta semana</span>
          </Button>
        </div>
      </div>
      
      {viewMode === 'personal' ? renderPersonalTimesheet() : renderProjectTimesheet()}
    </div>
  );
}
