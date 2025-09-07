
"use client";

import { useParams, useRouter } from 'next/navigation';
import { useProgress } from '@/context/ProgressContext';
import { getClassById, getPeriodById } from '@/lib/course-data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ClassPage() {
  const params = useParams();
  const router = useRouter();
  const gradeId = Array.isArray(params.grade) ? params.grade[0] : params.grade;
  const periodId = Array.isArray(params.periodId) ? params.periodId[0] : params.periodId;
  const classId = Array.isArray(params.classId) ? params.classId[0] : params.classId;
  const { toast } = useToast();

  const { isLoading, isClassCompleted, isClassUnlocked, completeClass } = useProgress();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  const classItem = getClassById(gradeId, periodId, classId);
  const period = getPeriodById(gradeId, periodId);

  if (!classItem || !period) {
    return <div className="text-center py-10">Lección o Módulo no encontrado. <Button onClick={() => router.push(`/${gradeId}/period/${periodId}`)}>Volver al Módulo</Button></div>;
  }
  
  if (!isClassUnlocked(gradeId, periodId, classId) && !isClassCompleted(gradeId, periodId, classId)) {
     return (
      <div className="text-center py-10 px-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Lección Bloqueada</h2>
        <p className="text-muted-foreground mb-6 text-sm sm:text-base">Por favor, completa las lecciones anteriores para desbloquear esta.</p>
        <Button onClick={() => router.push(`/${gradeId}/period/${periodId}`)}>Volver al Módulo</Button>
      </div>
    );
  }

  const classCompleted = isClassCompleted(gradeId, periodId, classId);
  
  const handleActualComplete = () => {
     completeClass(gradeId, periodId, classId);
     toast({
      title: "¡Lección Completada!",
      description: "¡Excelente! Has finalizado esta lección. Puedes volver al módulo.",
      variant: "default",
      className: "bg-accent text-accent-foreground border-green-600",
    });
    router.push(`/${gradeId}/period/${periodId}`);
  }

  const preventCopy = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    toast({
      title: "Acción no permitida",
      description: "No es posible copiar el contenido de las lecciones.",
      variant: "destructive",
    });
  };

  const preventContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div 
      className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 bg-card p-6 sm:p-8 rounded-lg shadow-xl"
      onCopy={preventCopy}
      onContextMenu={preventContextMenu}
      style={{ userSelect: 'none' }}
    >
      <Button variant="outline" onClick={() => router.push(`/${gradeId}/period/${periodId}`)} className="flex items-center self-start text-xs sm:text-sm">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al listado de lecciones
      </Button>
      {classItem.title && <h1 className="text-2xl sm:text-3xl font-bold font-headline text-primary">{classItem.title}</h1>}
      {classItem.subtitle && (
        <p className="text-lg text-muted-foreground pt-1">{classItem.subtitle}</p>
      )}
      <p className="text-xs sm:text-sm pt-2 text-muted-foreground">{classItem.estimatedTime}</p>
      <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: classItem.content }} />
      <div className="flex flex-col sm:flex-row justify-end items-center gap-3 sm:gap-4 pt-4">
        {classCompleted ? (
           <div className="flex items-center gap-2 text-accent font-semibold p-3 bg-accent/10 rounded-md">
            <CheckCircle className="h-5 w-5" />
            <span>¡Lección Completada!</span>
          </div>
        ) : (
          <Button onClick={handleActualComplete} size="lg" className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3">
            <CheckCircle className="mr-2 h-5 w-5" /> Marcar como Completada
          </Button>
        )}
      </div>
    </div>
  );
}
