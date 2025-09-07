
"use client";

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldQuestion, ArrowLeft } from 'lucide-react';

export default function DeprecatedQuizPage() {
  const router = useRouter();
  const params = useParams();
  
  const gradeId = Array.isArray(params.grade) ? params.grade[0] : params.grade;
  const periodId = Array.isArray(params.periodId) ? params.periodId[0] : params.periodId;

  const handleGoBack = () => {
    if (gradeId && periodId) {
      router.push(`/${gradeId}/period/${periodId}`);
    } else {
      router.back();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-center py-12 px-4">
        <Card className="shadow-xl border-primary/50">
            <CardHeader className="items-center">
                <ShieldQuestion className="mx-auto h-16 w-16 text-primary mb-4" />
                <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
                    Evaluaciones al Final del Período
                </CardTitle>
                <CardDescription className="pt-2 text-base sm:text-lg text-muted-foreground max-w-prose">
                    ¡Hemos mejorado la estructura del curso para que sea más fluida!
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-muted-foreground text-md sm:text-lg">
                    Ahora, en lugar de una evaluación por lección, encontrarás una <strong>única evaluación final</strong> al completar todas las lecciones del período.
                </p>
                <p className="text-muted-foreground text-md sm:text-lg">
                    ¡Sigue adelante para desbloquearla!
                </p>
                <Button onClick={handleGoBack} size="lg" className="mt-4">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Volver a las Lecciones
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
