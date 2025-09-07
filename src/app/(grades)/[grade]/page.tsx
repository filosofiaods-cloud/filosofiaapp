"use client";

import { useParams, useRouter } from 'next/navigation';
import { useProgress } from '@/context/ProgressContext';
import { getGradeById } from '@/lib/course-data';
import { PeriodCard } from '@/components/PeriodCard';
import { Button } from '@/components/ui/button';
import { Loader2, Award, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GradePage() {
  const params = useParams();
  const router = useRouter();
  const gradeId = Array.isArray(params.grade) ? params.grade[0] : params.grade;
  const { isLoading, isPeriodUnlocked, isPeriodCompleted, getCertificateEligibility, getPeriodProgress } = useProgress();

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  const grade = getGradeById(gradeId);

  if (!grade) {
    return <div className="text-center py-10">Ciclo de estudio no encontrado. <Button onClick={() => router.push('/')}>Ir al Inicio</Button></div>;
  }

  const certificateEligible = getCertificateEligibility(gradeId);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button variant="outline" onClick={() => router.push('/')} className="flex items-center self-start sm:self-auto">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Selección de Ciclo
        </Button>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary text-center sm:text-left">{grade.title}: Periodos</h1>
      </div>
      
      {certificateEligible && (
        <div className="bg-green-100 border-l-4 border-accent text-accent-foreground p-4 sm:p-6 rounded-md shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center justify-center sm:justify-start"><Award className="h-6 w-6 sm:h-7 sm:w-7 mr-2 text-accent" />¡Felicidades!</h2>
            <p className="mt-1 text-sm sm:text-base">Has completado todos los módulos para {grade.title}. ¡Puedes obtener tu certificado!</p>
          </div>
          <Link href={`/${gradeId}/certificate`} className="w-full sm:w-auto">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
              Ver Certificado
            </Button>
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {grade.periods.map((period) => (
          <PeriodCard
            key={period.id}
            gradeId={gradeId}
            period={period}
            isUnlocked={isPeriodUnlocked(gradeId, period.id)}
            isCompleted={isPeriodCompleted(gradeId, period.id)}
            progressPercentage={getPeriodProgress(gradeId, period.id)}
          />
        ))}
      </div>
    </div>
  );
}
