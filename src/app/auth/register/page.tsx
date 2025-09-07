
"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, UserPlus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/lib/firebase'; 
import { useToast } from '@/hooks/use-toast';
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    if (!fullName.trim()) {
      setError('Por favor, ingresa tu nombre completo.');
      toast({ title: "Error de Registro", description: 'Por favor, ingresa tu nombre completo.', variant: "destructive" });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      toast({ title: "Error de Registro", description: 'Las contraseñas no coinciden.', variant: "destructive" });
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      toast({ title: "Error de Registro", description: 'La contraseña debe tener al menos 6 caracteres.', variant: "destructive" });
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        // IMPORTANT: Update Firebase Auth profile FIRST to ensure auth state is propagated
        await updateProfile(user, {
          displayName: fullName
        });

        // NOW, save user data to Firestore
        if (db) { 
          try {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, {
              uid: user.uid,
              fullName: fullName,
              email: user.email,
              createdAt: Timestamp.fromDate(new Date()),
            });
          } catch (dbError: any) {
            console.error("Firestore write error:", dbError);
            let dbErrorMessage = "Tu cuenta fue creada, pero tus datos de perfil no pudieron guardarse. Contacta al soporte.";
            if (dbError.code === 'permission-denied') {
              dbErrorMessage = "Error de permisos: No se pudieron guardar tus datos de perfil. Revisa las reglas de seguridad de Firestore."
            }
             toast({
              title: "Error al Guardar Perfil",
              description: `${dbErrorMessage} (Código: ${dbError.code})`,
              variant: "destructive",
            });
          }
        } else {
          console.warn("Firestore (db) is not initialized. Skipping user data save to Firestore.");
          toast({
            title: "Advertencia de Registro",
            description: "Tu cuenta fue creada, pero tus datos de perfil no pudieron guardarse completamente. Contacta al soporte.",
            variant: "default", 
            className: "bg-yellow-100 text-yellow-800 border-yellow-500", 
          });
        }
      }
      
      toast({
        title: "¡Registro Exitoso!",
        description: "Tu cuenta ha sido creada y tus datos guardados. Ahora puedes iniciar sesión.",
        variant: "default",
        className: "bg-accent text-accent-foreground border-green-600",
      });
      router.push('/auth/login');
    } catch (firebaseError: any) {
      let friendlyError = `Ocurrió un error (${firebaseError.code || 'desconocido'}). Inténtalo de nuevo.`;
      if (firebaseError.code === 'auth/email-already-in-use') {
        friendlyError = 'Este correo electrónico ya está en uso por otro pensador.';
      } else if (firebaseError.code === 'auth/weak-password') {
        friendlyError = 'La contraseña es demasiado débil. Intenta una más robusta.';
      } else if (firebaseError.code === 'auth/invalid-email') {
        friendlyError = 'El formato del correo electrónico no es válido.';
      }
      console.error('Error de Firebase al registrar:', firebaseError);
      setError(friendlyError);
      toast({
        title: "Error de Registro",
        description: friendlyError,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />
          <CardTitle className="text-2xl sm:text-3xl font-bold font-headline text-primary">Crear cuenta</CardTitle>
          <CardDescription className="text-sm sm:text-base">Ingresa tus datos y únete a la comunidad Carlitos ODS-4.0</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Ej: Sócrates de Atenas"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full text-sm sm:text-base" size="lg" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Registrarse
            </Button>
            <p className="text-xs sm:text-sm text-muted-foreground">
              ¿Ya eres parte de este diálogo filosófico?{' '}
              <Link href="/auth/login" className="font-semibold text-primary hover:underline">
                Iniciar Sesión
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
       <Button variant="link" onClick={() => router.push('/')} className="mt-6 sm:mt-8 text-muted-foreground text-xs sm:text-sm" disabled={isLoading}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Ágora Principal
      </Button>
    </div>
  );
}
