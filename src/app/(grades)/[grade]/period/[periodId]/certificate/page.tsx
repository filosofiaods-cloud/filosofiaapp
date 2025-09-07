
"use client";

import { useParams, useRouter } from 'next/navigation';
import { useProgress } from '@/context/ProgressContext';
import { getGradeById, getPeriodById } from '@/lib/course-data';
import { CertificateDisplay } from '@/components/CertificateDisplay';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Loader2, ShieldAlert, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function PeriodCertificatePage() {
  const params = useParams();
  const router = useRouter();
  const gradeId = Array.isArray(params.grade) ? params.grade[0] : params.grade;
  const periodId = Array.isArray(params.periodId) ? params.periodId[0] : params.periodId;
  
  const { isLoading: progressLoading, isPeriodCompleted } = useProgress();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [studentName, setStudentName] = useState("Estudiante Dedicado");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user?.displayName) {
        setStudentName(user.displayName);
      } else if (user) {
        setStudentName(user.email?.split('@')[0] || "Estudiante");
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (progressLoading || authLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  const period = getPeriodById(gradeId, periodId);
  const grade = getGradeById(gradeId);

  if (!period || !grade) {
    return <div className="text-center py-10">Período o ciclo de estudio no encontrado. <Button onClick={() => router.push('/')}>Volver al inicio</Button></div>;
  }
  
  if (!currentUser) {
     return (
      <div className="text-center py-10 max-w-lg mx-auto px-4">
        <User className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-destructive mb-4" />
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Acceso Denegado</h2>
        <p className="text-muted-foreground mb-8 text-sm sm:text-base">
          Debes iniciar sesión para ver tu certificado.
        </p>
        <Button onClick={() => router.push(`/auth/login?redirect=/${gradeId}/period/${periodId}/certificate`)} size="lg" className="text-sm sm:text-base">
          Iniciar Sesión
        </Button>
      </div>
    );
  }

  const isEligible = isPeriodCompleted(gradeId, periodId);

  if (!isEligible) {
    return (
      <div className="text-center py-10 max-w-lg mx-auto px-4">
        <ShieldAlert className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-destructive mb-4" />
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Certificado Aún No Obtenido</h2>
        <p className="text-muted-foreground mb-8 text-sm sm:text-base">
          No has completado todas las lecciones y la evaluación requerida para el período {period.title}. 
          ¡Sigue esforzándote para obtener tu certificado!
        </p>
        <Button onClick={() => router.push(`/${gradeId}/period/${periodId}`)} size="lg" className="text-sm sm:text-base">
          <ArrowLeft className="mr-2 h-5 w-5" /> Volver a Lecciones de {period.title}
        </Button>
      </div>
    );
  }
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 no-print">
        <Button variant="outline" onClick={() => router.push(`/${gradeId}/period/${periodId}`)} className="flex items-center self-start sm:self-center text-xs sm:text-sm">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a {period.title}
        </Button>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-primary text-center sm:text-left">Tu Certificado de Período</h1>
        <Button onClick={handlePrint} variant="default" className="self-end sm:self-center text-xs sm:text-sm">
          <Download className="mr-2 h-4 w-4" /> Imprimir/Descargar
        </Button>
      </div>
      
      <CertificateDisplay 
        completionTitle={period.title} 
        studentName={studentName}
        type="period"
        periodId={periodId}
        gradeTitle={grade.title}
      />

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-certificate-component,
          .printable-certificate-component * {
            visibility: visible;
          }
          .printable-certificate-component {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            min-height: 100vh;
            padding: 20px; 
            margin: 0 auto; 
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            display: flex; 
            flex-direction: column;
            align-items: center;
          }
          header, footer, nav, button, [role="button"], aside, .no-print {
            display: none !important;
          }
           body {
             background-color: white !important; 
           }
           main {
             padding: 0 !important;
             margin: 0 !important;
             max-width: 100vw !important;
           }
        }
      `}</style>
    </div>
  );
}
