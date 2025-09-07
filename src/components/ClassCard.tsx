
"use client";

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Lock, PlayCircle } from 'lucide-react';
import type { ClassItem as ClassItemType } from '@/types';
import Image from 'next/image';

interface ClassCardProps {
  gradeId: string;
  periodId: string;
  classItem: ClassItemType;
  isUnlocked: boolean;
  isCompleted: boolean;
}

export function ClassCard({ gradeId, periodId, classItem, isUnlocked, isCompleted }: ClassCardProps) {
  let statusIcon, cardStyle, buttonText, buttonVariant;

  if (isCompleted) {
    statusIcon = <CheckCircle2 className="h-5 w-5 text-green-500" />;
    cardStyle = "border-green-500";
    buttonText = "Revisar Lección";
    buttonVariant = "outline";
  } else if (isUnlocked) {
    statusIcon = <PlayCircle className="h-5 w-5 text-blue-500" />;
    cardStyle = "border-primary";
    buttonText = "Iniciar Lección";
    buttonVariant = "default";
  } else {
    statusIcon = <Lock className="h-5 w-5 text-gray-400" />;
    cardStyle = "bg-muted/50 border-gray-300 opacity-70";
    buttonText = "Bloqueada";
    buttonVariant = "secondary";
  }

  return (
    <Card className={`${cardStyle} transition-all hover:shadow-lg overflow-hidden flex flex-col`}>
      <CardHeader className="p-0 relative h-48">
        <Image 
          src={classItem.imageUrl || '/images/placeholder.png'}
          alt={classItem.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          data-ai-hint={classItem.imageHint || 'filosofia estudio'}
        />
        <div className="absolute top-2 right-2 bg-background/80 rounded-full p-1 shadow-md">
          {statusIcon}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-lg mb-2">{classItem.title}</h3>
          <p className="text-muted-foreground text-sm flex-grow">{classItem.estimatedTime}</p>
      </CardContent>
       <CardFooter className="p-4 pt-0">
          <Link href={`/${gradeId}/period/${periodId}/class/${classItem.id}`} className="w-full">
            <Button className="w-full" variant={buttonVariant as any} disabled={!isUnlocked}>
              {buttonText}
            </Button>
          </Link>
        </CardFooter>
    </Card>
  );
}
