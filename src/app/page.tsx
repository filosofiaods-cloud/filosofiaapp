
import { GradeSelector } from '@/components/GradeSelector';
import { Header } from '@/components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4">
        <GradeSelector />
      </main>
      <footer className="bg-muted text-muted-foreground py-4 text-center text-sm">
        © {new Date().getFullYear()} Carlitos ODS-4.0. Todos los derechos reservados.
      </footer>
    </div>
  );
}
