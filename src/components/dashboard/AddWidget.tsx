
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface WidgetOption {
  id: string;
  title: string;
  description: string;
  type: string;
}

interface AddWidgetProps {
  onAddWidget: (widgetType: string) => void;
  widgetOptions: WidgetOption[];
}

export function AddWidget({ onAddWidget, widgetOptions }: AddWidgetProps) {
  const [selectedWidget, setSelectedWidget] = useState<string>('');
  const [open, setOpen] = useState(false);
  
  const handleAdd = () => {
    if (selectedWidget) {
      onAddWidget(selectedWidget);
      setSelectedWidget('');
      setOpen(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-dashed w-full h-[160px] flex-col gap-2">
          <Plus className="h-5 w-5" />
          <span>Añadir widget</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir nuevo widget</DialogTitle>
          <DialogDescription>
            Selecciona el tipo de widget que deseas añadir a tu dashboard.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Select value={selectedWidget} onValueChange={setSelectedWidget}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un widget" />
            </SelectTrigger>
            <SelectContent>
              {widgetOptions.map(option => (
                <SelectItem key={option.id} value={option.id}>
                  {option.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedWidget && (
            <div className="mt-4 p-3 border rounded-md bg-muted/20">
              <h4 className="font-medium">{widgetOptions.find(o => o.id === selectedWidget)?.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {widgetOptions.find(o => o.id === selectedWidget)?.description}
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleAdd} disabled={!selectedWidget}>Añadir widget</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
