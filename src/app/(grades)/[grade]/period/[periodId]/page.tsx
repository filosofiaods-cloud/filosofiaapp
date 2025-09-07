
"use client";

import { useParams, useRouter } from 'next/navigation';
import { useProgress } from '@/context/ProgressContext';
import { getPeriodById } from '@/lib/course-data';
import { ClassCard } from '@/components/ClassCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckSquare, Loader2, ShieldQuestion, Award } from 'lucide-react';
import Link from 'next/link';

export default function PeriodPage() {
  const params = useParams();
  const router = useRouter();
  const gradeId = Array.isArray(params.grade) ? params.grade[0] : params.grade;
  const periodId = Array.isArray(params.periodId) ? params.periodId[0] : params.periodId;
  
  const { isLoading, isClassUnlocked, isClassCompleted, isPeriodCompleted } = useProgress();

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  const period = getPeriodById(gradeId, periodId);

  if (!period) {
    return <div className="text-center py-10">Módulo no encontrado. <Button onClick={() => router.push(`/${gradeId}`)}>Volver al Ciclo</Button></div>;
  }
  
  const periodCompleted = isPeriodCompleted(gradeId, periodId);
  const allClassesInPeriodCompleted = period.classes.every(classItem => isClassCompleted(gradeId, periodId, classItem.id));


  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
         <Button variant="outline" onClick={() => router.push(`/${gradeId}`)} className="flex items-center self-start sm:self-auto">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Periodos
        </Button>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary">{period.title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground" dangerouslySetInnerHTML={{ __html: period.description }} />
        </div>
      </div>

      {periodCompleted && (
        <div className="bg-green-100 border-l-4 border-accent text-accent-foreground p-4 sm:p-6 rounded-md shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center justify-center sm:justify-start"><Award className="h-6 w-6 sm:h-7 sm:w-7 mr-2 text-accent" />¡Período Completado!</h2>
            <p className="mt-1 text-sm sm:text-base text-green-800">Has completado todas las lecciones y la evaluación. ¡Obtén tu certificado!</p>
          </div>
          <Link href={`/${gradeId}/period/${periodId}/certificate`} className="w-full sm:w-auto">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
              Ver Certificado del Período
            </Button>
          </Link>
        </div>
      )}
      
      {allClassesInPeriodCompleted && !periodCompleted && (
        <div className="bg-primary/10 border-l-4 border-primary p-4 sm:p-6 rounded-md shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center justify-center sm:justify-start text-primary">
              <ShieldQuestion className="h-6 w-6 sm:h-7 sm:w-7 mr-2" />
              ¡Listos para la Evaluación!
            </h2>
            <p className="mt-1 text-sm sm:text-base text-muted-foreground">
              Has completado todas las lecciones. ¡Demuestra lo que has aprendido para finalizar el período!
            </p>
          </div>
          <Link href={`/${gradeId}/period/${periodId}/quiz`} className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
                Iniciar Evaluación Final
            </Button>
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {period.classes.map((classItem) => (
          <ClassCard
            key={classItem.id}
            gradeId={gradeId}
            periodId={periodId}
            classItem={classItem}
            isUnlocked={isClassUnlocked(gradeId, periodId, classItem.id)}
            isCompleted={isClassCompleted(gradeId, periodId, classItem.id)}
          />
        ))}
      </div>
    </div>
  );
}
