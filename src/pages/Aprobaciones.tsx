
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, Calendar, Clock, ChevronRight, AlertTriangle, 
  XCircle, Loader2, Filter, SortDesc 
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface Approval {
  id: string;
  taskName: string;
  requestedBy: {
    name: string;
    initials: string;
  };
  project: string;
  date: string;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'high' | 'medium' | 'low';
  comments?: string;
}

export default function Aprobaciones() {
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');
  const [loadingState, setLoadingState] = useState<Record<string, string>>({});
  
  const approvals: Approval[] = [
    {
      id: 'apr-1',
      taskName: 'Finalización de Tarea 1',
      requestedBy: {
        name: 'Mariangel',
        initials: 'MA'
      },
      project: 'Proyecto 1A',
      date: '24/03/2025',
      dueDate: '28/03/2025',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 'apr-2',
      taskName: 'Revisión del Sistema de Gestión de Tickets',
      requestedBy: {
        name: 'Carlos',
        initials: 'CP'
      },
      project: 'Proyecto 1A',
      date: '22/03/2025',
      dueDate: '25/03/2025',
      status: 'pending',
      priority: 'medium',
      comments: 'Se requiere revisión prioritaria para continuar con el desarrollo.'
    },
    {
      id: 'apr-3',
      taskName: 'Aprobación de presupuesto adicional',
      requestedBy: {
        name: 'Luis',
        initials: 'LR'
      },
      project: 'Proyecto 1B',
      date: '20/03/2025',
      dueDate: '30/03/2025',
      status: 'pending',
      priority: 'low',
      comments: 'Justificación de gastos adicionales en anexo.'
    },
    {
      id: 'apr-4',
      taskName: 'Finalización de Fase de Diseño',
      requestedBy: {
        name: 'Guillermo',
        initials: 'GV'
      },
      project: 'Proyecto 1B',
      date: '15/03/2025',
      dueDate: '18/03/2025',
      status: 'approved',
      priority: 'high'
    },
    {
      id: 'apr-5',
      taskName: 'Cambio en el alcance del proyecto',
      requestedBy: {
        name: 'Ana',
        initials: 'AM'
      },
      project: 'Proyecto 1C',
      date: '12/03/2025',
      dueDate: '17/03/2025',
      status: 'rejected',
      priority: 'medium',
      comments: 'No se puede aprobar el cambio sin justificación detallada.'
    }
  ];
  
  const filteredApprovals = activeTab === 'pending'
    ? approvals.filter(a => a.status === 'pending')
    : approvals;
    
  const handleApprove = (id: string) => {
    setLoadingState(prev => ({ ...prev, [id]: 'approving' }));
    setTimeout(() => {
      toast.success('Solicitud aprobada correctamente');
      setLoadingState(prev => ({ ...prev, [id]: 'approved' }));
    }, 1000);
  };
  
  const handleReject = (id: string) => {
    setLoadingState(prev => ({ ...prev, [id]: 'rejecting' }));
    setTimeout(() => {
      toast.error('Solicitud rechazada');
      setLoadingState(prev => ({ ...prev, [id]: 'rejected' }));
    }, 1000);
  };
  
  const getStatusBadge = (status: Approval['status']) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center gap-1.5 text-yellow-600">
            <Clock className="h-4 w-4" />
            <span>Pendiente</span>
          </div>
        );
      case 'approved':
        return (
          <div className="flex items-center gap-1.5 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>Aprobado</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center gap-1.5 text-red-600">
            <XCircle className="h-4 w-4" />
            <span>Rechazado</span>
          </div>
        );
    }
  };
  
  const getPriorityBadge = (priority: Approval['priority']) => {
    const colors = {
      high: 'text-red-600',
      medium: 'text-amber-600',
      low: 'text-blue-600'
    };
    
    const labels = {
      high: 'Alta',
      medium: 'Media',
      low: 'Baja'
    };
    
    return (
      <span className={`inline-flex items-center gap-1.5 ${colors[priority]}`}>
        <AlertTriangle className="h-4 w-4" />
        <span>{labels[priority]}</span>
      </span>
    );
  };
  
  return (
    <Layout>
      <div className="container py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Aprobaciones</h1>
            <p className="text-muted-foreground">Gestiona las solicitudes de aprobación de tu equipo</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
              <TabsList>
                <TabsTrigger value="pending" className="flex items-center gap-1">
                  <span>Pendientes</span>
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full ml-1">
                    {approvals.filter(a => a.status === 'pending').length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="all">Todas</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="mb-4 flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <SortDesc className="h-4 w-4" />
            Ordenar
          </Button>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarea</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Proyecto</TableHead>
                <TableHead>Fecha solicitud</TableHead>
                <TableHead>Fecha límite</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApprovals.map((approval) => {
                const isLoading = loadingState[approval.id] === 'approving' || loadingState[approval.id] === 'rejecting';
                const isCompleted = loadingState[approval.id] === 'approved' || loadingState[approval.id] === 'rejected';
                
                return (
                  <TableRow key={approval.id} className="group">
                    <TableCell className="font-medium">
                      <div>
                        {approval.taskName}
                        {approval.comments && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{approval.comments}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <span className="text-xs">{approval.requestedBy.initials}</span>
                        </Avatar>
                        <span>{approval.requestedBy.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{approval.project}</TableCell>
                    <TableCell>{approval.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{approval.dueDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getPriorityBadge(approval.priority)}</TableCell>
                    <TableCell>{getStatusBadge(
                      isCompleted 
                        ? loadingState[approval.id] === 'approved' 
                          ? 'approved' 
                          : 'rejected'
                        : approval.status
                    )}</TableCell>
                    <TableCell className="text-right">
                      {approval.status === 'pending' && !isCompleted ? (
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="default" 
                            size="sm" 
                            onClick={() => handleApprove(approval.id)}
                            disabled={isLoading}
                          >
                            {isLoading && loadingState[approval.id] === 'approving' ? (
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                              <CheckCircle className="h-4 w-4 mr-1" />
                            )}
                            Aprobar
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleReject(approval.id)}
                            disabled={isLoading}
                          >
                            {isLoading && loadingState[approval.id] === 'rejecting' ? (
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                              <XCircle className="h-4 w-4 mr-1" />
                            )}
                            Rechazar
                          </Button>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm">Ver detalles</Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
