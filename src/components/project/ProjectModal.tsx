
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Plus, X } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface ProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ open, onOpenChange }: ProjectModalProps) {
  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  const [team, setTeam] = React.useState<string[]>([]);
  
  const handleAddTeamMember = () => {
    setTeam([...team, `miembro-${team.length + 1}`]);
  };
  
  const handleRemoveTeamMember = (index: number) => {
    setTeam(team.filter((_, i) => i !== index));
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Crear nuevo proyecto</DialogTitle>
          <DialogDescription>
            Completa los detalles del proyecto para comenzar a trabajar con tu equipo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del proyecto</Label>
              <Input id="name" placeholder="Ingresa el nombre del proyecto" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Select defaultValue="internal">
                <SelectTrigger id="company">
                  <SelectValue placeholder="Selecciona una empresa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">Interna</SelectItem>
                  <SelectItem value="acme">Acme Inc.</SelectItem>
                  <SelectItem value="wayne">Wayne Enterprises</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fecha de inicio</Label>
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
                    {startDate ? format(startDate, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Fecha de finalización</Label>
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
                    {endDate ? format(endDate, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responsible">Responsable</Label>
              <Select>
                <SelectTrigger id="responsible">
                  <SelectValue placeholder="Selecciona un responsable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alejandro">Alejandro Sánchez</SelectItem>
                  <SelectItem value="maria">María González</SelectItem>
                  <SelectItem value="juan">Juan Pérez</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portafolio</Label>
              <Select>
                <SelectTrigger id="portfolio">
                  <SelectValue placeholder="Selecciona un portafolio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portfolio1">Portafolio 1</SelectItem>
                  <SelectItem value="portfolio2">Portafolio 2</SelectItem>
                  <SelectItem value="none">Sin portafolio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Equipo</Label>
              <Button variant="ghost" size="sm" onClick={handleAddTeamMember}>
                <Plus className="h-4 w-4 mr-1" />
                Añadir miembro
              </Button>
            </div>
            
            {team.length > 0 ? (
              <div className="space-y-3">
                {team.map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Select className="flex-1">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un miembro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alejandro">Alejandro Sánchez</SelectItem>
                        <SelectItem value="maria">María González</SelectItem>
                        <SelectItem value="juan">Juan Pérez</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select className="w-[180px]">
                      <SelectTrigger>
                        <SelectValue placeholder="Rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dev">Desarrollador</SelectItem>
                        <SelectItem value="designer">Diseñador</SelectItem>
                        <SelectItem value="pm">Project Manager</SelectItem>
                        <SelectItem value="qa">QA</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveTeamMember(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-dashed rounded-md p-6 text-center text-muted-foreground">
                <p>No hay miembros del equipo añadidos</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={handleAddTeamMember}>
                  <Plus className="h-4 w-4 mr-1" />
                  Añadir miembro
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="budget">Presupuesto estimado (€)</Label>
            <Input id="budget" type="number" placeholder="0.00" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe los objetivos y alcance del proyecto"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={() => onOpenChange(false)}>Crear proyecto</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
