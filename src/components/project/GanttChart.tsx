
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Task {
  id: string;
  name: string;
  start: string;
  end: string;
  progress: number;
}

interface GanttChartProps {
  tasks: Task[];
  title?: string;
  className?: string;
}

export default function GanttChart({ tasks, title = "Planificación", className = "" }: GanttChartProps) {
  // Calculate date range for the chart
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 7);
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 60);

  // Calculate days in the range
  const daysInRange = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Format date as DD/MM
  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  // Generate dates for the header
  const dates = Array.from({ length: daysInRange }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date;
  });

  // Get position for a task bar
  const getTaskPosition = (taskStart: string) => {
    const taskStartDate = new Date(taskStart.split('/').reverse().join('-'));
    const daysDiff = Math.floor((taskStartDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysDiff);
  };

  // Get width for a task bar
  const getTaskWidth = (taskStart: string, taskEnd: string) => {
    const taskStartDate = new Date(taskStart.split('/').reverse().join('-'));
    const taskEndDate = new Date(taskEnd.split('/').reverse().join('-'));
    const daysDiff = Math.ceil((taskEndDate.getTime() - taskStartDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, daysDiff);
  };

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Timeline header */}
            <div className="flex border-b">
              <div className="w-[200px] flex-shrink-0 p-2 font-medium">Proyecto</div>
              <div className="flex-1 flex">
                {dates.map((date, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-8 text-center text-xs p-1 ${date.getDay() === 0 || date.getDay() === 6 ? 'bg-gray-100' : ''} ${
                      date.getDate() === today.getDate() &&
                      date.getMonth() === today.getMonth() &&
                      date.getFullYear() === today.getFullYear()
                        ? 'bg-blue-100'
                        : ''
                    }`}
                  >
                    {index % 7 === 0 && formatDate(date)}
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            {tasks.map((task) => (
              <div key={task.id} className="flex border-b hover:bg-gray-50">
                <div className="w-[200px] flex-shrink-0 p-2">{task.name}</div>
                <div className="flex-1 relative h-10 flex">
                  {/* Task bar */}
                  <div
                    className="absolute h-6 top-2 rounded bg-blue-500 flex items-center px-2 text-white text-xs"
                    style={{
                      left: `${getTaskPosition(task.start) * 32}px`,
                      width: `${getTaskWidth(task.start, task.end) * 32}px`,
                    }}
                  >
                    {task.progress}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
