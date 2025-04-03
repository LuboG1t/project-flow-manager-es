
import React, { useState } from 'react';
import { X, Calendar, Clock, ChevronDown, CheckCircle, Circle, Upload, Paperclip, Link, ArrowRight, Play, MessageSquare, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Subtask {
  id: string;
  name: string;
  completed: boolean;
}

interface Comment {
  id: string;
  user: {
    name: string;
    initials: string;
  };
  text: string;
  date: string;
}

interface TaskDetailsProps {
  task: any;
  onClose: () => void;
}

export function TaskDetails({ task, onClose }: TaskDetailsProps) {
  const [newCommentText, setNewCommentText] = useState('');
  const [subtasks, setSubtasks] = useState<Subtask[]>([
    { id: 'st-1', name: 'Sistema de Gestión de Tickets', completed: false },
  ]);
  
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c-1',
      user: { name: 'Mariangel', initials: 'MA' },
      text: 'Intenta compartir un elemento @mencionando a gente...',
      date: 'Hoy, 14:32'
    }
  ]);

  const statusColors = {
    'completed': 'bg-status-completed/20 text-status-completed',
    'in-progress': 'bg-status-in-progress/20 text-status-in-progress',
    'in-review': 'bg-status-in-review/20 text-status-in-review',
    'new': 'bg-status-new/20 text-status-new',
  };

  const statusLabels = {
    'completed': 'Completado',
    'in-progress': 'En progreso',
    'in-review': 'En revisión',
    'new': 'Nuevo',
  };

  const handleToggleSubtask = (id: string) => {
    setSubtasks(prev => prev.map(st => 
      st.id === id ? { ...st, completed: !st.completed } : st
    ));
  };

  const handleAddComment = () => {
    if (newCommentText.trim()) {
      setComments(prev => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          user: { name: 'Usuario Actual', initials: 'UC' },
          text: newCommentText,
          date: 'Ahora'
        }
      ]);
      setNewCommentText('');
    }
  };
  
  return (
    <div className="w-[420px] border-l bg-background flex flex-col h-full animate-slide-in-right">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">Detalles de la tarea</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Información básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{task.name}</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Estado</p>
                <Select defaultValue={task.status}>
                  <SelectTrigger className={`w-full ${statusColors[task.status as keyof typeof statusColors]}`}>
                    <SelectValue placeholder={statusLabels[task.status as keyof typeof statusLabels]} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Nuevo</SelectItem>
                    <SelectItem value="in-progress">En progreso</SelectItem>
                    <SelectItem value="in-review">En revisión</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Asignado a</p>
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7 bg-primary">
                    <span className="text-xs">{task.assignedTo.initials}</span>
                  </Avatar>
                  <span className="text-sm">{task.assignedTo.name}</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Prioridad</p>
                <Select defaultValue={task.priority}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Fecha</p>
                <div className="flex items-center gap-1 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{task.startDate} - {task.endDate} ({task.duration})</span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Subtareas */}
          <div>
            <div className="flex items-center justify-between">
              <p className="font-medium flex items-center gap-2">
                <span className="text-muted-foreground">1</span> subtarea
              </p>
            </div>
            
            <div className="mt-2 space-y-2">
              {subtasks.map(subtask => (
                <div key={subtask.id} className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => handleToggleSubtask(subtask.id)}
                  >
                    {subtask.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                  <span className={subtask.completed ? 'line-through text-muted-foreground' : ''}>
                    {subtask.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Archivos */}
          <div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Archivos</p>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                <Upload className="h-3.5 w-3.5 mr-1" />
                Añadir archivos
              </Button>
            </div>
            
            <div className="mt-2 border border-dashed rounded-md p-4 text-center text-muted-foreground">
              <Paperclip className="h-5 w-5 mx-auto mb-1" />
              <p className="text-sm">Arrastra archivos aquí o haz clic para subir</p>
            </div>
          </div>
          
          {/* Dependencias */}
          <div>
            <div className="flex items-center justify-between">
              <p className="font-medium flex items-center gap-2">
                <span className="text-muted-foreground">2</span> dependencias
              </p>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                <Link className="h-3.5 w-3.5 mr-1" />
                Añadir dependencia
              </Button>
            </div>
            
            <div className="mt-2 border rounded-md p-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Tarea 1 depende de Subtarea 1</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Tarea 1 depende de Subtarea 2</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Time tracking */}
          <div>
            <p className="font-medium mb-2">Tiempo registrado</p>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Total: {task.timeSpent}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  Añadir tiempo
                </Button>
                <Button size="sm" className="h-8 text-xs">
                  <Play className="h-3.5 w-3.5 mr-1" />
                  Iniciar
                </Button>
              </div>
            </div>
          </div>
          
          {/* Aprobaciones */}
          <div>
            <p className="font-medium mb-2">Aprobaciones</p>
            <Button className="w-full" variant="outline">
              Solicitar aprobación
            </Button>
          </div>
          
          <Separator />
          
          {/* Comentarios */}
          <div>
            <p className="font-medium mb-3">Comentarios</p>
            
            <div className="space-y-4 mb-4">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <span className="text-xs">{comment.user.initials}</span>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{comment.user.name}</p>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="text-sm mt-0.5">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <span className="text-xs">TU</span>
              </Avatar>
              <div className="flex-1 rounded-md border overflow-hidden">
                <textarea 
                  className="w-full px-3 py-2 text-sm min-h-[60px] focus:outline-none resize-none" 
                  placeholder="Escribe un comentario..." 
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                ></textarea>
                <div className="bg-muted/50 px-3 py-1.5 flex justify-between items-center border-t">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <span className="text-lg">@</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <span className="text-lg">😊</span>
                    </Button>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={handleAddComment}
                    disabled={!newCommentText.trim()}
                  >
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
