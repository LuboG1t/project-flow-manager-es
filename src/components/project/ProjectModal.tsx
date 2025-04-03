import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ProjectModal({ open, onClose }: ProjectModalProps) {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    company: '',
    startDate: undefined,
    endDate: undefined,
  });

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: '', role: '' },
  ]);

  const [currentTeamMember, setCurrentTeamMember] = useState({ id: 0, name: '', role: '' });

  const handleChange = (field: string, value: any) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleAddTeamMember = () => {
    const newId = teamMembers.length > 0 ? Math.max(...teamMembers.map(member => member.id)) + 1 : 1;
    setTeamMembers([...teamMembers, { id: newId, name: '', role: '' }]);
  };

  const handleRemoveTeamMember = (id: number) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const updateTeamMember = (id: number, field: string, value: string) => {
    setTeamMembers(
      teamMembers.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Nuevo proyecto</AlertDialogTitle>
          <AlertDialogDescription>
            Completa los campos para crear un nuevo proyecto.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input id="name" value={formValues.name} onChange={(e) => handleChange("name", e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descripción
            </Label>
            <Textarea id="description" value={formValues.description} onChange={(e) => handleChange("description", e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">
              Empresa
            </Label>
            <Select
              name="company"
              value={formValues.company}
              onValueChange={(value) => handleChange("company", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar empresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interna">Interna</SelectItem>
                <SelectItem value="empresa-a">Empresa A</SelectItem>
                <SelectItem value="empresa-b">Empresa B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Fecha de inicio
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !formValues.startDate && "text-muted-foreground"
                  )}
                >
                  {formValues.startDate ? format(formValues.startDate, "PPP") : (
                    <span>Seleccionar fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formValues.startDate}
                  onSelect={(date) => handleChange("startDate", date)}
                  disabled={(date) =>
                    date > (formValues.endDate || new Date("2100-01-01"))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              Fecha de fin
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !formValues.endDate && "text-muted-foreground"
                  )}
                >
                  {formValues.endDate ? format(formValues.endDate, "PPP") : (
                    <span>Seleccionar fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formValues.endDate}
                  onSelect={(date) => handleChange("endDate", date)}
                  disabled={(date) =>
                    date < (formValues.startDate || new Date("1900-01-01"))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="team">Equipo</Label>
              <Button type="button" variant="secondary" size="sm" onClick={handleAddTeamMember}>
                <Plus className="h-4 w-4 mr-2" />
                Añadir miembro
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Nombre"
                    value={member.name}
                    onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                  />
                  <Select
                    name="teamRole" 
                    value={currentTeamMember.role}
                    onValueChange={(value) => setCurrentTeamMember({ ...currentTeamMember, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pm">Gerente de Proyecto</SelectItem>
                      <SelectItem value="developer">Desarrollador</SelectItem>
                      <SelectItem value="designer">Diseñador</SelectItem>
                      <SelectItem value="tester">Tester</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveTeamMember(member.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction>Crear</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
