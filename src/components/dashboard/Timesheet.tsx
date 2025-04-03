
import React, { useState, useRef } from 'react';
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
import { Input } from '@/components/ui/input';

interface TimesheetEntry {
  id: string;
  task: string;
  project: string;
  hours: Record<string, string>;
  total: string;
}

export default function Timesheet() {
  const [viewMode, setViewMode] = useState<'personal' | 'project'>('personal');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const userInfo = {
    name: 'Alejandro Sánchez',
    role: 'Gerente de Proyecto',
    capacity: '40h semanales'
  };
  
  // Mock timesheet data
  const timesheetData = {
    tracking: {
      total: '13h 50m',
      capacity: '40h'
    },
    weekDays: [
      { day: 'Lun', date: '08 Nov' },
      { day: 'Mar', date: '09 Nov' },
      { day: 'Mie', date: '10 Nov' },
      { day: 'Jue', date: '11 Nov' },
      { day: 'Vie', date: '12 Nov' },
      { day: 'Sab', date: '13 Nov' },
      { day: 'Dom', date: '14 Nov' },
    ],
    entries: [
      {
        id: 'entry-1',
        task: 'Crear Acta de Proyecto',
        project: 'Wayne Enterprises - Implementación HRMS Acme',
        hours: {
          'Lun': '30m',
          'Mar': '1h 00m',
          'Mie': '45m',
          'Jue': '-',
          'Vie': '1h 30m',
          'Sab': '-',
          'Dom': '-',
        },
        total: '3h 45m'
      },
      {
        id: 'entry-2',
        task: 'Preparación Kick-off',
        project: 'Wayne Enterprises - Implementación HRMS Acme',
        hours: {
          'Lun': '1h 00m',
          'Mar': '20m',
          'Mie': '2h 30m',
          'Jue': '15m',
          'Vie': '-',
          'Sab': '-',
          'Dom': '-',
        },
        total: '4h 05m'
      }
    ],
    totals: {
      'Lun': '1h 30m',
      'Mar': '1h 20m',
      'Mie': '3h 15m',
      'Jue': '15m',
      'Vie': '1h 30m',
      'Sab': '0m',
      'Dom': '0m',
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
            task: 'Crear Acta de Proyecto',
            project: 'Wayne Enterprises - Implementación HRMS Acme',
            hours: {
              'Lun': '30m',
              'Mar': '1h 00m',
              'Mie': '45m',
              'Jue': '-',
              'Vie': '1h 30m',
              'Sab': '-',
              'Dom': '-',
            },
            total: '3h 45m'
          },
          {
            id: 'entry-2',
            task: 'Preparación Kick-off',
            project: 'Wayne Enterprises - Implementación HRMS Acme',
            hours: {
              'Lun': '1h 00m',
              'Mar': '20m',
              'Mie': '2h 30m',
              'Jue': '15m',
              'Vie': '-',
              'Sab': '-',
              'Dom': '-',
            },
            total: '4h 05m'
          },
        ],
        subtotal: {
          'Lun': '1h 30m',
          'Mar': '1h 20m',
          'Mie': '3h 15m',
          'Jue': '15m',
          'Vie': '1h 30m',
          'Sab': '0m',
          'Dom': '0m',
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
            task: 'Crear Acta de Proyecto',
            project: 'Wayne Enterprises - Implementación HRMS Acme',
            hours: {
              'Lun': '30m',
              'Mar': '1h 00m',
              'Mie': '45m',
              'Jue': '-',
              'Vie': '1h 30m',
              'Sab': '-',
              'Dom': '-',
            },
            total: '3h 45m'
          },
          {
            id: 'entry-4',
            task: 'Preparación Kick-off',
            project: 'Wayne Enterprises - Implementación HRMS Acme',
            hours: {
              'Lun': '1h 00m',
              'Mar': '20m',
              'Mie': '2h 30m',
              'Jue': '15m',
              'Vie': '-',
              'Sab': '-',
              'Dom': '-',
            },
            total: '4h 05m'
          },
        ],
        subtotal: {
          'Lun': '1h 30m',
          'Mar': '1h 20m',
          'Mie': '3h 15m',
          'Jue': '15m',
          'Vie': '1h 30m',
          'Sab': '0m',
          'Dom': '0m',
          'total': '7h 50m'
        }
      }
    ],
    totals: {
      'Lun': '1h 30m',
      'Mar': '1h 20m',
      'Mie': '3h 15m',
      'Jue': '15m',
      'Vie': '1h 30m',
      'Sab': '0m',
      'Dom': '0m',
      'total': '7h 50m'
    }
  };

  const handleCellClick = (entryId: string, day: string) => {
    const cellId = `${entryId}-${day}`;
    let initialValue = '';
    
    // Find the correct entry and get its hour value for the selected day
    if (viewMode === 'personal') {
      const entry = timesheetData.entries.find(e => e.id === entryId);
      if (entry) {
        initialValue = entry.hours[day];
      }
    } else {
      // Handle project view
      for (const resource of projectTimesheetData.resources) {
        const entry = resource.entries.find(e => e.id === entryId);
        if (entry) {
          initialValue = entry.hours[day];
          break;
        }
      }
    }
    
    if (initialValue === '-') {
      initialValue = '';
    }
    
    setEditingCell(cellId);
    setEditValue(initialValue);
    
    // Focus on the input after it's rendered
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };
  
  const handleSaveEdit = () => {
    // Here you would implement the logic to update the hour value in your data
    console.log('Saving edit for cell:', editingCell, 'with value:', editValue);
    
    // Reset editing state
    setEditingCell(null);
    setEditValue('');
  };
  
  const renderPersonalTimesheet = () => {
    return (
      <>
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-medium">{userInfo.name}</h2>
              <p className="text-muted-foreground">{userInfo.role}</p>
            </div>
            <div className="mt-2 md:mt-0 text-sm">
              <span className="font-medium">Capacidad:</span> {userInfo.capacity}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium">Tiempo total registrado:</h2>
              <span className="text-lg font-bold">{timesheetData.tracking.total}</span>
            </div>
            
            <div className="flex items-center gap-2 mt-2 md:mt-0">
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
        </div>
        
        <div className="border rounded-md bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[300px] bg-muted/70">Tareas</TableHead>
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
                <TableHead className="text-center bg-muted/70">Tiempo total</TableHead>
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
                    <TableCell 
                      key={`${entry.id}-${day.day}`} 
                      className="text-center p-0"
                      onClick={() => handleCellClick(entry.id, day.day)}
                    >
                      {editingCell === `${entry.id}-${day.day}` ? (
                        <div className="p-2">
                          <Input 
                            ref={inputRef}
                            value={editValue} 
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleSaveEdit}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                            className="h-8 text-center"
                          />
                        </div>
                      ) : (
                        <div className="p-4 cursor-pointer hover:bg-muted/20">
                          {entry.hours[day.day]}
                        </div>
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="text-center font-medium bg-muted/5">
                    {entry.total}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/20">
                <TableCell className="font-medium">Tiempo total</TableCell>
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
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-medium">Vista de proyecto</h2>
              <p className="text-muted-foreground">Seguimiento de tiempo por miembro del equipo</p>
            </div>
            <div className="mt-2 md:mt-0 text-sm">
              <span className="font-medium">Capacidad del equipo:</span> {projectTimesheetData.tracking.capacity}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium">Tiempo total registrado:</h2>
              <span className="text-lg font-bold">{projectTimesheetData.tracking.total}</span>
            </div>
            
            <div className="flex items-center gap-2 mt-2 md:mt-0">
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
        </div>
        
        <div className="border rounded-md bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[300px] bg-muted/70">Tareas</TableHead>
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
                <TableHead className="text-center bg-muted/70">Tiempo total</TableHead>
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
                        <TableCell 
                          key={`${entry.id}-${day.day}`} 
                          className="text-center p-0"
                          onClick={() => handleCellClick(entry.id, day.day)}
                        >
                          {editingCell === `${entry.id}-${day.day}` ? (
                            <div className="p-2">
                              <Input 
                                ref={inputRef}
                                value={editValue} 
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={handleSaveEdit}
                                onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                                className="h-8 text-center"
                              />
                            </div>
                          ) : (
                            <div className="p-4 cursor-pointer hover:bg-muted/20">
                              {entry.hours[day.day]}
                            </div>
                          )}
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
                      Tiempo subtotal
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
                <TableCell className="font-medium">Tiempo total</TableCell>
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
