
"use client";

import { useState, type FormEvent, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, LogIn, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

function LoginFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/');

  useEffect(() => {
    const redirect = searchParams.get('redirect');
    if (redirect) {
      setRedirectPath(redirect);
    }
  }, [searchParams]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "¡Inicio de Sesión Exitoso!",
        description: "Bienvenido/a de nuevo a tu viaje filosófico.",
        variant: "default",
        className: "bg-accent text-accent-foreground border-green-600",
      });
      router.push(redirectPath);
    } catch (firebaseError: any) {
      let friendlyError = 'Ocurrió un error durante el inicio de sesión. Inténtalo de nuevo.';
      if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password' || firebaseError.code === 'auth/invalid-credential') {
        friendlyError = 'Correo electrónico o contraseña incorrectos.';
      } else if (firebaseError.code === 'auth/invalid-email') {
        friendlyError = 'El formato del correo electrónico no es válido.';
      }
      setError(friendlyError);
      console.error('Error de Firebase:', firebaseError);
      toast({
        title: "Error de Inicio de Sesión",
        description: friendlyError,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <LogIn className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />
          <CardTitle className="text-2xl sm:text-3xl font-bold font-headline text-primary">Iniciar Sesión</CardTitle>
          <CardDescription className="text-sm sm:text-base">Ingresa tus credenciales para continuar tu exploración filosófica.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full text-sm sm:text-base" size="lg" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Iniciar Sesión
            </Button>
            <p className="text-xs sm:text-sm text-muted-foreground">
              ¿Aún no te has registrado en este viaje del saber?{' '}
              <Link href="/auth/register" className="font-semibold text-primary hover:underline">
                Registrarse
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
      <Button variant="link" onClick={() => router.push('/')} className="mt-6 sm:mt-8 text-muted-foreground text-xs sm:text-sm" disabled={isLoading}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
      </Button>
    </>
  );
}


export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="flex justify-center items-center h-32"><Loader2 className="h-12 w-12 animate-spin text-primary" /> <span className="ml-4">Cargando...</span></div>}>
        <LoginFormComponent />
      </Suspense>
    </div>
  );
}
