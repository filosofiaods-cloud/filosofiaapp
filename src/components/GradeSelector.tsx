
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import type React from 'react';

interface GradeOption {
  id: string;
  title: string;
  description: React.ReactNode; 
  imageUrl: string;
  imageHint: string;
  buttonText?: string; 
}

const gradeOptions: GradeOption[] = [
  { 
    id: 'introduccion', 
    title: 'Décimo Grado', 
    description: (
      <>
        <span className="font-bold text-card-foreground">El ocaso de la Verdad y el nacimiento de la libertad ilimitada, amoral y "trans-humana".</span>
        <p className="mt-2 text-sm text-muted-foreground">Estudiarás la noción de apariencia en Arentdt, el pensamiento teleológico y el cambio de época. Recibirás una primera aproximación a la Sociedad de la información y del Conocimiento.</p>
      </>
    ), 
    imageUrl: '/images/filo10.png',
    imageHint: 'philosophy statue',
    buttonText: 'Comienza ya', 
  },
  { 
    id: 'avanzada', 
    title: 'Undécimo Grado', 
    description: (
      <>
        <span className="font-bold text-card-foreground">El ocaso de la tradición y el nacimiento de la realidad ciberfísica y "trans - humana".</span>
        <p className="mt-2 text-sm text-muted-foreground">Estudiarás los conceptos de juego y poder, profundizarás en la noción de "cambio de época", reflexionarás sobre la ética ambiental desde la perspectiva de la propuesta curricular "Carlitos ODS-4.0".</p>
      </>
    ), 
    imageUrl: '/images/filo11.png',
    imageHint: 'philosophy thinker',
    buttonText: 'Comienza ya',
  },
];

export function GradeSelector() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline text-primary mb-3">Carlitos ODS-4.0</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
          Una propuesta de ciudadanía para la Sociedad de la Información y del Conocimiento.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl mt-10">
        {gradeOptions.map((grade) => (
          <Card key={grade.id} className="shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
            <Image 
              src={grade.imageUrl} 
              alt={grade.title} 
              width={600} 
              height={400} 
              className="w-full h-48 object-cover"
              data-ai-hint={grade.imageHint}
            />
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl font-headline text-primary">{grade.title}</CardTitle>
              <CardDescription className="text-sm sm:text-md min-h-[8em]">{grade.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/${grade.id}`}>
                <Button className="w-full text-base sm:text-lg py-3 sm:py-6" size="lg">
                  {grade.buttonText || `Ir a ${grade.title}`} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
