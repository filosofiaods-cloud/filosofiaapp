
"use client";
import Link from 'next/link';
import { BookOpenText, User, UserPlus, LogIn, LogOut } from 'lucide-react'; 
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react'; 
import { onAuthStateChanged, signOut as firebaseSignOut, type User as FirebaseUser } from 'firebase/auth'; 
import { auth } from '@/lib/firebase'; 
import { useToast } from '@/hooks/use-toast';
import { getGradeById, getPeriodById, getClassById } from '@/lib/course-data';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe(); 
  }, []);

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast({
        title: "Sesión Cerrada",
        description: "Has cerrado sesión exitosamente.",
      });
      router.push('/'); 
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  let breadcrumb = "Inicio";
  const pathParts = pathname.split('/').filter(Boolean);

  if (pathParts.length > 0) {
    if (pathParts[0] === 'auth') {
      if (pathParts[1] === 'register') breadcrumb = "Registro";
      else if (pathParts[1] === 'login') breadcrumb = "Iniciar Sesión";
    } else {
      const gradeData = getGradeById(pathParts[0]);
      if (gradeData) {
        breadcrumb = gradeData.title;
        if (pathParts[1] === 'period' && pathParts[2]) {
          const periodData = getPeriodById(pathParts[0], pathParts[2]);
          breadcrumb += periodData ? ` / ${periodData.title.substring(0,15)}...` : ` / Módulo ${pathParts[2]}`;
          if (pathParts[3] === 'class' && pathParts[4]) {
            const classData = getClassById(pathParts[0], pathParts[2], pathParts[4]);
            breadcrumb += classData ? ` / ${classData.title.substring(0, 10)}...` : ` / Lección`;
            if (pathParts[5] === 'quiz') {
              breadcrumb += ` / Evaluación`;
            }
          }
        } else if (pathParts[1] === 'certificate') {
          breadcrumb += ` / Certificado`;
        }
      }
    }
  }


  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BookOpenText className="h-7 w-7 sm:h-8 sm:w-8" />
            <h1 className="text-xl sm:text-2xl font-headline font-semibold">Carlitos ODS-4.0</h1>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            {pathname !== '/' && (
              <Link href="/" className="hover:underline hidden sm:inline">
                Inicio
              </Link>
            )}
            {pathname !== '/' && <span className="text-gray-300 hidden sm:inline">| {breadcrumb}</span>}
            
            {!isLoading && (
              <>
                {currentUser ? (
                  <>
                    <span className="items-center gap-1 hidden sm:flex">
                      <User className="h-4 w-4" />
                      {currentUser.displayName || currentUser.email?.split('@')[0]}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary-foreground hover:bg-primary/80 px-2 sm:px-3"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-1 h-4 w-4" />
                      <span className="hidden sm:inline">Cerrar Sesión</span>
                    </Button>
                  </>
                ) : (
                  <>
                    {!pathname.startsWith('/auth/login') && (
                      <Link href="/auth/login">
                        <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary/80 px-2 sm:px-3">
                          <LogIn className="mr-1 h-4 w-4" />
                          <span className="hidden sm:inline">Iniciar Sesión</span>
                        </Button>
                      </Link>
                    )}
                    {!pathname.startsWith('/auth/register') && (
                      <Link href="/auth/register">
                        <Button variant="secondary" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground px-2 sm:px-3">
                          <UserPlus className="mr-1 h-4 w-4" />
                           <span className="hidden sm:inline">Registrarse</span>
                        </Button>
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
