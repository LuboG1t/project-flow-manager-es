
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Bell, CheckCircle, Clock, Calendar, AlertTriangle, ChevronRight, 
  MessageSquare, UserPlus, BadgeCheck, X, Share2 
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: 'assignment' | 'mention' | 'deadline' | 'approval' | 'sharing';
  message: string;
  project?: string;
  task?: string;
  user: {
    name: string;
    initials: string;
  };
  time: string;
  read: boolean;
  icon: React.ReactElement;
}

export default function Notificaciones() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'assignment',
      message: 'Te han asignado una nueva tarea',
      project: 'Proyecto 1A',
      task: 'Tarea 1',
      user: {
        name: 'Mariangel',
        initials: 'MA'
      },
      time: 'Hace 10 minutos',
      read: false,
      icon: <UserPlus className="h-5 w-5 text-blue-500" />
    },
    {
      id: '2',
      type: 'mention',
      message: 'Te han mencionado en un comentario',
      project: 'Proyecto 1A',
      task: 'Sistema de Gestión de Tickets',
      user: {
        name: 'Guillermo',
        initials: 'GV'
      },
      time: 'Hace 45 minutos',
      read: false,
      icon: <MessageSquare className="h-5 w-5 text-indigo-500" />
    },
    {
      id: '3',
      type: 'deadline',
      message: 'Una tarea está a punto de vencer',
      project: 'Proyecto 1A',
      task: 'Subtarea 1',
      user: {
        name: 'Sistema',
        initials: 'SYS'
      },
      time: 'Hace 2 horas',
      read: true,
      icon: <Clock className="h-5 w-5 text-yellow-500" />
    },
    {
      id: '4',
      type: 'approval',
      message: 'Tu tarea ha sido aprobada',
      project: 'Proyecto 1B',
      task: 'Estructura de la página',
      user: {
        name: 'Alejandro',
        initials: 'AS'
      },
      time: 'Hace 3 horas',
      read: true,
      icon: <BadgeCheck className="h-5 w-5 text-green-500" />
    },
    {
      id: '5',
      type: 'sharing',
      message: 'Han compartido un proyecto contigo',
      project: 'Proyecto 1C',
      user: {
        name: 'Carlos',
        initials: 'CP'
      },
      time: 'Hace 1 día',
      read: true,
      icon: <Share2 className="h-5 w-5 text-purple-500" />
    }
  ]);
  
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };
  
  const handleDelete = (id: string) => {
    setNotifications(prev => 
      prev.filter(n => n.id !== id)
    );
  };
  
  return (
    <Layout>
      <div className="container py-6 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Notificaciones</h1>
            <p className="text-muted-foreground">Mantente al día con tus proyectos y tareas</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Tabs 
              defaultValue="all" 
              value={filter} 
              onValueChange={(value) => setFilter(value as 'all' | 'unread')}
            >
              <TabsList>
                <TabsTrigger value="all" className="flex items-center gap-1">
                  <span>Todas</span>
                  <Badge variant="secondary" className="ml-1 bg-primary/10">
                    {notifications.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex items-center gap-1">
                  <span>No leídas</span>
                  <Badge variant="secondary" className="ml-1 bg-primary/10">
                    {notifications.filter(n => !n.read).length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>Marcar todas como leídas</Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-4 border rounded-lg flex items-start gap-4 transition-colors ${
                notification.read ? 'bg-card' : 'bg-primary/5'
              }`}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                {notification.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <span className="text-[10px]">{notification.user.initials}</span>
                      </Avatar>
                      <span className="text-sm font-medium">{notification.user.name}</span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    
                    <p className="mt-1 text-base font-medium">
                      {notification.message}
                    </p>
                    
                    {(notification.project || notification.task) && (
                      <div className="mt-1 flex items-center text-sm text-muted-foreground">
                        {notification.project && (
                          <>
                            <span>{notification.project}</span>
                            {notification.task && (
                              <>
                                <ChevronRight className="h-4 w-4 mx-1" />
                                <span>{notification.task}</span>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-1">
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7" 
                      onClick={() => handleDelete(notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-3">
                  <Button size="sm" variant="outline">Ver detalles</Button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredNotifications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No hay notificaciones {filter === 'unread' ? 'sin leer' : ''}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
