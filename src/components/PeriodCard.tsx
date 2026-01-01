
"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Lock, Zap, PieChart, ArrowRight } from 'lucide-react';
import type { Period as PeriodType } from '@/types';
import { Progress } from "@/components/ui/progress";

interface PeriodCardProps {
  gradeId: string;
  period: PeriodType;
  isUnlocked: boolean;
  isCompleted: boolean;
  progressPercentage: number;
}

export function PeriodCard({ gradeId, period, isUnlocked, isCompleted, progressPercentage }: PeriodCardProps) {
  let statusIcon, statusText, cardStyle, buttonText, buttonVariant;

  if (isCompleted) {
    statusIcon = <CheckCircle2 className="h-6 w-6 text-green-500" />;
    statusText = "Completado";
    cardStyle = "border-green-500 shadow-lg";
    buttonText = "Revisar Módulo";
    buttonVariant = "outline";
  } else if (isUnlocked) {
    statusIcon = <Zap className="h-6 w-6 text-blue-500" />;
    statusText = "En Progreso";
    cardStyle = "border-primary shadow-lg";
    buttonText = "Continuar Módulo";
    buttonVariant = "default";
  } else {
    statusIcon = <Lock className="h-6 w-6 text-gray-400" />;
    statusText = "Bloqueado";
    cardStyle = "bg-muted/50 border-gray-300 shadow-md";
    buttonText = "Bloqueado";
    buttonVariant = "secondary";
  }

  let displayTitle = period.title;
  if (gradeId === '11') {
    displayTitle = period.title.split('.')[0];
  }


  return (
    <Card className={`flex flex-col justify-between ${cardStyle} transition-all hover:shadow-xl`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl font-headline text-primary">{displayTitle}</CardTitle>
          {statusIcon}
        </div>
        <CardDescription className="text-sm text-muted-foreground">{statusText}</CardDescription>
        <CardDescription className="text-sm pt-1" dangerouslySetInnerHTML={{ __html: period.description }} />
      </CardHeader>
      <CardContent className="flex-grow">
        {isUnlocked && !isCompleted && (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-primary">Progreso</span>
              <span className="text-xs font-semibold text-primary">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2 [&>div]:bg-primary" />
          </div>
        )}
        {isCompleted && (
           <div className="mt-2">
             <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-green-600">Progreso</span>
                <span className="text-xs font-semibold text-green-600">100%</span>
              </div>
            <Progress value={100} className="h-2 [&>div]:bg-green-500" />
          </div>
        )}
         {!isUnlocked && (
          <div className="mt-2 opacity-50">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-500">Progreso</span>
              <span className="text-xs font-semibold text-gray-500">0%</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/${gradeId}/period/${period.id}`} className="w-full">
          <Button className="w-full" variant={buttonVariant as any} disabled={!isUnlocked}>
            {buttonText}
            {isUnlocked && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
