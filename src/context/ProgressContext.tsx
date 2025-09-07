
"use client";

import type { UserProgress } from '@/types';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getGradeById, getPeriodById } from '@/lib/course-data';

interface ProgressContextType {
  progress: UserProgress;
  isLoading: boolean;
  completeClass: (gradeId: string, periodId: string, classId: string) => void;
  isClassCompleted: (gradeId: string, periodId: string, classId: string) => boolean;
  isPeriodCompleted: (gradeId: string, periodId: string) => boolean;
  isClassUnlocked: (gradeId: string, periodId: string, classId: string) => boolean;
  isPeriodUnlocked: (gradeId: string, periodId: string) => boolean;
  getCertificateEligibility: (gradeId: string) => boolean;
  getPeriodProgress: (gradeId: string, periodId: string) => number;
  completePeriodQuiz: (gradeId: string, periodId: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const defaultProgress: UserProgress = {
  completedClasses: {},
  completedPeriodQuizzes: {},
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem('userProgress');
      if (storedProgress) {
        const parsedProgress = JSON.parse(storedProgress);
        if (!parsedProgress.completedPeriodQuizzes) {
            parsedProgress.completedPeriodQuizzes = {};
        }
        setProgress(parsedProgress);
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage:", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('userProgress', JSON.stringify(progress));
      } catch (error) {
        console.error("Failed to save progress to localStorage:", error);
      }
    }
  }, [progress, isLoading]);

  const completeClass = useCallback((gradeId: string, periodId: string, classId: string) => {
    setProgress(prev => {
      const newCompletedClasses = { ...prev.completedClasses };
      if (!newCompletedClasses[gradeId]) {
        newCompletedClasses[gradeId] = {};
      }
      if (!newCompletedClasses[gradeId][periodId]) {
        newCompletedClasses[gradeId][periodId] = [];
      }
      if (!newCompletedClasses[gradeId][periodId].includes(classId)) {
        newCompletedClasses[gradeId][periodId] = [...newCompletedClasses[gradeId][periodId], classId];
      }
      return { ...prev, completedClasses: newCompletedClasses };
    });
  }, []);

  const isClassCompleted = useCallback((gradeId: string, periodId: string, classId: string): boolean => {
    return progress.completedClasses[gradeId]?.[periodId]?.includes(classId) ?? false;
  }, [progress.completedClasses]);

  const isPeriodQuizCompleted = useCallback((gradeId: string, periodId: string): boolean => {
    return progress.completedPeriodQuizzes?.[gradeId]?.includes(periodId) ?? false;
  }, [progress.completedPeriodQuizzes]);

  const isPeriodCompleted = useCallback((gradeId: string, periodId: string): boolean => {
    const periodData = getPeriodById(gradeId, periodId);
    if (!periodData) return false;
    
    const allClassesCompleted = periodData.classes.every(cls => isClassCompleted(gradeId, periodId, cls.id));
    const quizCompleted = isPeriodQuizCompleted(gradeId, periodId);

    return allClassesCompleted && quizCompleted;
  }, [isClassCompleted, isPeriodQuizCompleted]);
  
  const completePeriodQuiz = useCallback((gradeId: string, periodId: string) => {
    setProgress(prev => {
      const newCompletedQuizzes = { ...(prev.completedPeriodQuizzes || {}) };
      if (!newCompletedQuizzes[gradeId]) {
        newCompletedQuizzes[gradeId] = [];
      }
      if (!newCompletedQuizzes[gradeId].includes(periodId)) {
        newCompletedQuizzes[gradeId] = [...newCompletedQuizzes[gradeId], periodId];
      }
      return { ...prev, completedPeriodQuizzes: newCompletedQuizzes };
    });
  }, []);

  const isPeriodUnlocked = useCallback((gradeId: string, periodId: string): boolean => {
    const gradeData = getGradeById(gradeId);
    if (!gradeData) return false;

    const currentPeriodIndex = gradeData.periods.findIndex(p => p.id === periodId);
    if (currentPeriodIndex === -1) return false;
    if (currentPeriodIndex === 0) return true; // First period is always unlocked.
    
    const prevPeriodId = gradeData.periods[currentPeriodIndex - 1].id;
    return isPeriodCompleted(gradeId, prevPeriodId);
  }, [isPeriodCompleted]);

  const isClassUnlocked = useCallback((gradeId: string, periodId: string, classId: string): boolean => {
    if (!isPeriodUnlocked(gradeId, periodId)) return false;
    
    const period = getPeriodById(gradeId, periodId);
    if (!period) return false;

    const classIndex = period.classes.findIndex(c => c.id === classId);
    if (classIndex === -1) return false;
    if (classIndex === 0) return true; // First class of an unlocked period is unlocked
    
    const prevClassId = period.classes[classIndex - 1].id;
    return isClassCompleted(gradeId, periodId, prevClassId);
  }, [isPeriodUnlocked, isClassCompleted]);

  const getCertificateEligibility = useCallback((gradeId: string): boolean => {
    const gradeData = getGradeById(gradeId);
    if (!gradeData) return false;
    return gradeData.periods.every(period => isPeriodCompleted(gradeId, period.id));
  }, [isPeriodCompleted]);

  const getPeriodProgress = useCallback((gradeId: string, periodId: string): number => {
    const periodData = getPeriodById(gradeId, periodId);
    if (!periodData || periodData.classes.length === 0) return 0;
    const completedInPeriod = progress.completedClasses[gradeId]?.[periodId]?.length || 0;
    return (completedInPeriod / periodData.classes.length) * 100;
  }, [progress.completedClasses]);


  return (
    <ProgressContext.Provider value={{ 
      progress, 
      isLoading,
      completeClass, 
      isClassCompleted,
      isPeriodCompleted,
      isClassUnlocked,
      isPeriodUnlocked,
      getCertificateEligibility,
      getPeriodProgress,
      completePeriodQuiz
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
