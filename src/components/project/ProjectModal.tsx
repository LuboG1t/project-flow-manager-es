
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Plus, X } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Collaborator {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface ProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: {
    id: string;
    name: string;
    objectives: string;
    startDate: Date;
    endDate: Date;
    budget: string;
    lead: {
      id: string;
      name: string;
      avatar?: string;
    };
    collaborators: Collaborator[];
    progress?: number;
    taskCount?: number;
    taskStatus?: {
      completed: number;
      inProgress: number;
      pending: number;
    };
  };
}

const ProjectModal = ({ open, onOpenChange, project }: ProjectModalProps) => {
  const isEdit = !!project;
  
  const [name, setName] = useState(project?.name || '');
  const [objectives, setObjectives] = useState(project?.objectives || '');
  const [startDate, setStartDate] = useState<Date | undefined>(project?.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(project?.endDate);
  const [budget, setBudget] = useState(project?.budget || '');
  const [leader, setLeader] = useState(project?.lead?.id || '');
  const [collaborators, setCollaborators] = useState<Collaborator[]>(project?.collaborators || []);
  
  // Mock data
  const teamMembers = [
    { id: 'member1', name: 'Alejandro Sánchez', role: 'Gerente de Proyecto', avatar: '' },
    { id: 'member2', name: 'María López', role: 'Diseñadora', avatar: '' },
    { id: 'member3', name: 'Carlos Gómez', role: 'Desarrollador', avatar: '' },
    { id: 'member4', name: 'Laura Torres', role: 'Analista de QA', avatar: '' },
  ];
  
  const availableRoles = [
    'Gerente de Proyecto',
    'Desarrollador',
    'Diseñador',
    'Analista de QA',
    'Arquitecto',
    'Especialista UX',
    'Consultor'
  ];
  
  const handleAddCollaborator = (memberId: string, role: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member && !collaborators.some(c => c.id === memberId)) {
      setCollaborators([...collaborators, { 
        id: member.id, 
        name: member.name, 
        role, 
        avatar: member.avatar 
      }]);
    }
  };
  
  const handleRemoveCollaborator = (id: string) => {
    setCollaborators(collaborators.filter(c => c.id !== id));
  };
  
  const handleCreate = () => {
    // Aquí iría la lógica para crear o actualizar el proyecto
    const projectData = {
      name,
      objectives,
      startDate,
      endDate,
      budget,
      lead: teamMembers.find(m => m.id === leader),
      collaborators
    };
    
    console.log('Datos del proyecto:', projectData);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}</DialogTitle>
          <DialogDescription>
            {isEdit 
              ? 'Actualiza la información de tu proyecto existente.' 
              : 'Completa los detalles para crear un nuevo proyecto.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Nombre del Proyecto</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Ingresa el nombre del proyecto" 
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="objectives">Objetivos</Label>
            <Textarea 
              id="objectives" 
              value={objectives} 
              onChange={(e) => setObjectives(e.target.value)} 
              placeholder="Describe los objetivos del proyecto"
              className="min-h-[100px]" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label>Fecha de Inicio</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "PPP", { locale: es })
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-3">
              <Label>Fecha de Finalización</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, "PPP", { locale: es })
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="budget">Presupuesto Estimado</Label>
            <Input 
              id="budget" 
              value={budget} 
              onChange={(e) => setBudget(e.target.value)} 
              placeholder="Ej: $10,000" 
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="leader">Responsable del Proyecto</Label>
            <Select value={leader} onValueChange={setLeader}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un responsable" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-3">
            <Label>Colaboradores del Proyecto</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {collaborators.map(collaborator => (
                <div key={collaborator.id} className="flex items-center gap-1.5 bg-muted rounded-md p-1 pl-2 pr-1">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback>{collaborator.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{collaborator.name}</span>
                  <span className="text-xs text-muted-foreground">({collaborator.role})</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4" 
                    onClick={() => handleRemoveCollaborator(collaborator.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <Select onValueChange={(value) => setLeader(value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecciona un colaborador" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers
                    .filter(m => !collaborators.some(c => c.id === m.id))
                    .map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span>{member.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              
              <Select onValueChange={(role) => handleAddCollaborator(leader, role)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Rol" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" onClick={() => handleAddCollaborator(leader, 'Desarrollador')}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {isEdit && project?.taskCount && project?.progress !== undefined && project?.taskStatus && (
            <div className="grid gap-3">
              <Label>Estado del Proyecto</Label>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 border rounded-md bg-card">
                  <p className="text-sm text-muted-foreground">Tareas totales</p>
                  <h3 className="text-xl font-bold">{project.taskCount}</h3>
                </div>
                <div className="p-3 border rounded-md bg-card">
                  <p className="text-sm text-muted-foreground">Progreso</p>
                  <h3 className="text-xl font-bold">{project.progress}%</h3>
                </div>
                <div className="p-3 border rounded-md bg-card">
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <span className="flex items-center gap-1 text-green-600">
                      <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                      {project.taskStatus.completed} completadas
                    </span>
                    <span className="flex items-center gap-1 text-blue-600">
                      <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                      {project.taskStatus.inProgress} en progreso
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <span className="h-2 w-2 bg-gray-600 rounded-full"></span>
                      {project.taskStatus.pending} pendientes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleCreate}>{isEdit ? 'Guardar cambios' : 'Crear proyecto'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
