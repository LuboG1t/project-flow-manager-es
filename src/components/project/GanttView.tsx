
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown, ChevronRight, CalendarRange, RotateCcw, Network, Calendar
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Task {
  id: string;
  name: string;
  type: 'phase' | 'task' | 'milestone';
  startDate: string;
  endDate: string;
  duration: string;
  progress: number;
  assignee?: {
    name: string;
    initials: string;
  };
  subtasks?: Task[];
  collapsed?: boolean;
}

export default function GanttView() {
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({
    'task-1': true,
    'task-2': false,
    'task-3': true,
  });

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'phase-1',
      name: 'Pre-Kickoff',
      type: 'phase',
      startDate: '01 Feb',
      endDate: '03 Feb',
      duration: '3d',
      progress: 100,
      subtasks: [
        {
          id: 'task-1',
          name: 'Sales to onboarding handoff',
          type: 'task',
          startDate: '01 Feb',
          endDate: '02 Feb',
          duration: '2d',
          progress: 100,
          assignee: {
            name: 'Project Manager',
            initials: 'PM'
          },
        },
        {
          id: 'task-2',
          name: 'Schedule kick-off meeting',
          type: 'task',
          startDate: '03 Feb',
          endDate: '03 Feb',
          duration: '1d',
          progress: 100,
          assignee: {
            name: 'Project Manager',
            initials: 'PM'
          },
        }
      ]
    },
    {
      id: 'phase-2',
      name: 'Kickoff',
      type: 'phase',
      startDate: '04 Feb',
      endDate: '09 Feb',
      duration: '6d',
      progress: 80,
      subtasks: [
        {
          id: 'task-3',
          name: 'Kickoff call',
          type: 'task',
          startDate: '05 Feb',
          endDate: '06 Feb',
          duration: '2d',
          progress: 100,
          assignee: {
            name: 'Project Manager',
            initials: 'PM'
          },
        },
        {
          id: 'task-4',
          name: 'Document business goals',
          type: 'task',
          startDate: '08 Feb',
          endDate: '09 Feb',
          duration: '2d',
          progress: 60,
          assignee: {
            name: 'Project Manager',
            initials: 'PM'
          },
        }
      ]
    },
    {
      id: 'phase-3',
      name: 'Setup and Launch',
      type: 'phase',
      startDate: '08 Feb',
      endDate: '16 May',
      duration: '74d',
      progress: 30,
      subtasks: [
        {
          id: 'task-5',
          name: 'Share set up documents',
          type: 'task',
          startDate: '10 Feb',
          endDate: '11 Feb',
          duration: '2d',
          progress: 0,
          assignee: {
            name: 'Product Manager',
            initials: 'PM'
          },
        },
        {
          id: 'task-6',
          name: 'Account setup',
          type: 'task',
          startDate: '20 Feb',
          endDate: '14 Mar',
          duration: '17d',
          progress: 30,
          assignee: {
            name: 'Developer',
            initials: 'DV'
          },
        }
      ]
    },
    {
      id: 'mile-1',
      name: '1 week usage feedback and review',
      type: 'milestone',
      startDate: '28 Apr',
      endDate: '28 Apr',
      duration: '1d',
      progress: 0
    },
    {
      id: 'mile-2',
      name: '1 month usage feedback and review',
      type: 'milestone',
      startDate: '31 May',
      endDate: '31 May',
      duration: '1d',
      progress: 0
    }
  ]);
  
  const toggleTask = (taskId: string) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };
  
  // Helper function to render the task status row with appropriate indent
  const renderTaskRow = (task: Task, level = 0) => {
    const isExpanded = expandedTasks[task.id] !== false;
    const hasChildren = task.subtasks && task.subtasks.length > 0;
    const indent = level * 20; // 20px indent per level
    
    return (
      <React.Fragment key={task.id}>
        <TableRow className={task.type === 'phase' ? 'bg-muted/40' : ''}>
          <TableCell className="w-[300px] py-2">
            <div className="flex items-center" style={{ paddingLeft: `${indent}px` }}>
              {hasChildren ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 mr-1"
                  onClick={() => toggleTask(task.id)}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              ) : (
                <div className="w-7"></div>
              )}
              
              {task.type === 'milestone' ? (
                <div className="w-3 h-3 rotate-45 bg-green-500 mr-2"></div>
              ) : (
                <div className={`w-3 h-3 rounded-full ${task.type === 'phase' ? 'bg-primary' : 'bg-secondary-foreground'} mr-2`}></div>
              )}
              
              <span className={task.type === 'phase' ? 'font-medium' : ''}>
                {task.name}
              </span>
            </div>
          </TableCell>
          <TableCell className="py-2">{task.startDate}</TableCell>
          <TableCell className="py-2">{task.endDate}</TableCell>
          <TableCell className="py-2">{task.duration}</TableCell>
        </TableRow>
        
        {isExpanded && hasChildren &&
          task.subtasks?.map(subtask => renderTaskRow(subtask, level + 1))
        }
      </React.Fragment>
    );
  };
  
  // Generate week headers
  const weeks = [
    { id: 'w1', name: 'Week', dates: '2022 January 30', days: [
      { day: '01 Feb', isToday: false },
      { day: '02 Feb', isToday: false },
      { day: '03 Feb', isToday: false },
      { day: '04 Feb', isToday: false },
      { day: '05 Feb', isToday: true },
      { day: '06 Feb', isToday: false },
      { day: '07 Feb', isToday: false },
    ]},
    { id: 'w2', name: 'Week', dates: '2022 February 06', days: [
      { day: '08 Feb', isToday: false },
      { day: '09 Feb', isToday: false },
      { day: '10 Feb', isToday: false },
      { day: '11 Feb', isToday: false },
      { day: '12 Feb', isToday: false },
      { day: '13 Feb', isToday: false },
      { day: '14 Feb', isToday: false },
    ]}
  ];
  
  const dayWidth = 80; // Width for each day cell
  
  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>Baseline</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Network className="h-4 w-4" />
            <span>Ruta crítica</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Select defaultValue={timeframe} onValueChange={(value: any) => setTimeframe(value)}>
            <SelectTrigger className="w-[120px] h-8 text-sm">
              <SelectValue placeholder="Seleccionar vista" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mes</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Año</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M3.25 1C3.25 0.585786 3.58579 0.25 4 0.25H11C11.4142 0.25 11.75 0.585786 11.75 1C11.75 1.41421 11.4142 1.75 11 1.75H4C3.58579 1.75 3.25 1.41421 3.25 1ZM0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H14C14.4142 6.25 14.75 6.58579 14.75 7C14.75 7.41421 14.4142 7.75 14 7.75H1C0.585786 7.75 0.25 7.41421 0.25 7ZM6.25 13C6.25 12.5858 6.58579 12.25 7 12.25H8C8.41421 12.25 8.75 12.5858 8.75 13C8.75 13.4142 8.41421 13.75 8 13.75H7C6.58579 13.75 6.25 13.4142 6.25 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-180">
              <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H7.50003C7.22389 8 7.00003 7.77614 7.00003 7.5V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="flex">
          <div className="flex-shrink-0 border-r">
            <Table>
              <TableHeader className="bg-background sticky top-0 z-10">
                <TableRow>
                  <TableHead className="w-[300px]">Project plan</TableHead>
                  <TableHead className="w-[80px]">Start date</TableHead>
                  <TableHead className="w-[80px]">Due date</TableHead>
                  <TableHead className="w-[80px]">Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map(task => renderTaskRow(task))}
              </TableBody>
            </Table>
          </div>
          
          <div className="overflow-auto">
            <div>
              <div className="flex">
                {weeks.map((week) => (
                  <div 
                    key={week.id} 
                    className="flex flex-col"
                    style={{ minWidth: `${week.days.length * dayWidth}px` }}
                  >
                    <div className="h-8 border-b flex items-center justify-center text-xs text-muted-foreground">
                      {week.dates}
                    </div>
                    <div className="h-8 border-b flex">
                      {week.days.map((day, idx) => (
                        <div 
                          key={day.day}
                          className={`flex-1 flex items-center justify-center text-xs ${day.isToday ? 'font-medium text-primary' : 'text-muted-foreground'}`}
                          style={{ 
                            minWidth: `${dayWidth}px`,
                            borderRight: idx < week.days.length - 1 ? '1px solid var(--border)' : 'none'
                          }}
                        >
                          {day.day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Vertical grid for days */}
                    <div className="relative">
                      <div className="absolute inset-0 flex">
                        {week.days.map((day, idx) => (
                          <div 
                            key={day.day}
                            className={`flex-1 ${day.isToday ? 'bg-red-50 relative' : ''}`}
                            style={{ 
                              minWidth: `${dayWidth}px`,
                              borderRight: idx < week.days.length - 1 ? '1px solid var(--border)' : 'none'
                            }}
                          >
                            {day.isToday && (
                              <div className="absolute inset-0 border-l-2 border-red-500 z-10"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Gantt chart rows */}
              <div className="relative">
                {tasks.map((task, taskIndex) => (
                  <div 
                    key={task.id} 
                    className="relative h-9 flex items-center"
                    style={{ 
                      borderBottom: '1px solid var(--border)',
                      backgroundColor: task.type === 'phase' ? 'rgba(0,0,0,0.02)' : 'transparent'
                    }}
                  >
                    {task.type === 'phase' && task.subtasks ? (
                      // Phase representation (no bar)
                      <div className="h-full w-full"></div>
                    ) : task.type === 'milestone' ? (
                      // Milestone representation (diamond)
                      <div className="absolute" style={{ left: '300px', top: '50%', transform: 'translateY(-50%)' }}>
                        <div className="w-5 h-5 rotate-45 bg-green-500 transform -translate-x-1/2 -translate-y-1/2" style={{ marginLeft: '4px' }}></div>
                      </div>
                    ) : (
                      // Task bar representation
                      <div className="absolute flex items-center" style={{ 
                        left: task.id === 'task-1' ? '60px' : task.id === 'task-3' ? '220px' : '380px', 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        width: task.id === 'task-1' ? '160px' : '120px',
                        height: '18px'
                      }}>
                        <div className={`relative rounded-sm h-full w-full ${
                          task.id.startsWith('task-1') || task.id === 'task-2' ? 'bg-blue-500' : 
                          task.id === 'task-3' ? 'bg-green-500' : 'bg-primary'
                        }`}>
                          <div className="absolute inset-0 flex items-center justify-between px-2 text-white text-xs">
                            <div className="flex items-center gap-1 truncate">
                              <span className="truncate">{task.name}</span>
                            </div>
                            
                            {task.assignee && (
                              <Avatar className="h-4 w-4 bg-white text-blue-500">
                                <span className="text-[8px]">{task.assignee.initials}</span>
                              </Avatar>
                            )}
                          </div>
                          <div 
                            className="absolute top-0 left-0 bottom-0 bg-opacity-20 bg-white"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Render subtasks only if parent is expanded */}
                    {expandedTasks[task.id] !== false && task.subtasks?.map((subtask, subIndex) => (
                      <div 
                        key={subtask.id}
                        className="absolute h-9 flex items-center" 
                        style={{ 
                          top: `${(taskIndex + subIndex + 1) * 37}px`,
                          left: 0,
                          width: '100%',
                          borderBottom: '1px solid var(--border)'
                        }}
                      >
                        {subtask.type === 'milestone' ? (
                          <div className="absolute" style={{ 
                            left: subtask.id === 'task-2' ? '300px' : '400px', 
                            top: '50%', 
                            transform: 'translateY(-50%)' 
                          }}>
                            <div className="w-5 h-5 rotate-45 bg-green-500"></div>
                          </div>
                        ) : (
                          <div className="absolute flex items-center" style={{ 
                            left: subtask.id === 'task-1' ? '60px' : subtask.id === 'task-2' ? '300px' : '220px', 
                            top: '50%', 
                            transform: 'translateY(-50%)', 
                            width: subtask.id === 'task-1' ? '100px' : '80px',
                            height: '18px'
                          }}>
                            <div className={`relative rounded-sm h-full w-full ${
                              subtask.id === 'task-1' ? 'bg-blue-500' : 
                              subtask.id === 'task-2' ? 'bg-blue-500' : 'bg-primary'
                            }`}>
                              <div className="absolute inset-0 flex items-center justify-between px-2 text-white text-xs">
                                <span className="truncate">{subtask.name}</span>
                                {subtask.assignee && (
                                  <Avatar className="h-4 w-4 bg-white text-blue-500">
                                    <span className="text-[8px]">{subtask.assignee.initials}</span>
                                  </Avatar>
                                )}
                              </div>
                              <div 
                                className="absolute top-0 left-0 bottom-0 bg-opacity-20 bg-white"
                                style={{ width: `${subtask.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
