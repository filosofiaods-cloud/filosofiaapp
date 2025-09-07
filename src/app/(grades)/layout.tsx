
"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Header } from '@/components/Header';
import { Loader2 } from 'lucide-react';

export default function GradesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoadingAuth && !currentUser) {
      if (!pathname.startsWith('/auth')) {
        router.push(`/auth/login?redirect=${pathname}`);
      } else {
         router.push('/auth/login');
      }
    }
  }, [isLoadingAuth, currentUser, router, pathname]);

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </main>
        <footer className="bg-muted text-muted-foreground py-4 text-center text-sm">
          © {new Date().getFullYear()} Carlitos ODS-4.0. Todos los derechos reservados.
        </footer>
      </div>
    );
  }

  if (!currentUser) {
     return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
          <p className="text-muted-foreground mr-4">Redirigiendo a inicio de sesión...</p>
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </main>
        <footer className="bg-muted text-muted-foreground py-4 text-center text-sm">
          © {new Date().getFullYear()} Carlitos ODS-4.0. Todos los derechos reservados.
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-muted text-muted-foreground py-4 text-center text-sm">
        © {new Date().getFullYear()} Carlitos ODS-4.0. Todos los derechos reservados.
      </footer>
    </div>
  );
}
