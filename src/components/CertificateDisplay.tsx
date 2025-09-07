
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import Image from "next/image";

interface CertificateDisplayProps {
  completionTitle: string;
  studentName: string;
  completionDate?: string;
  type: 'grade' | 'period';
}

const SealIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 120 120"
    className="mx-auto"
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="silver-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style={{ stopColor: '#f0f0f0', stopOpacity: 1 }} />
        <stop offset="70%" style={{ stopColor: '#c0c0c0', stopOpacity: 1 }} />
        <stop offset="95%" style={{ stopColor: '#a9a9a9', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#888888', stopOpacity: 1 }} />
      </radialGradient>
      <path
        id="wreath-leaf"
        d="M 0,0 C 10,-5 20,-5 30,0 C 20,5 10,5 0,0 Z"
        fill="white"
      />
    </defs>
    <g transform="translate(60, 60)">
      {Array.from({ length: 16 }).map((_, i) => (
        <path
          key={i}
          d="M 50 0 L 55 10 L 60 0 Z"
          fill="url(#silver-gradient)"
          stroke="#a9a9a9"
          strokeWidth="0.5"
          transform={`rotate(${i * 22.5})`}
        />
      ))}
      <circle cx="0" cy="0" r="50" fill="url(#silver-gradient)" stroke="#a9a9a9" strokeWidth="1" />
      <circle cx="0" cy="0" r="40" fill="transparent" stroke="white" strokeWidth="1.5" />
      <g transform="scale(0.55)">
        <g transform="translate(-40, 0) scale(0.9)">
          <use href="#wreath-leaf" transform="translate(0, 0) rotate(20)" />
          <use href="#wreath-leaf" transform="translate(15, -15) rotate(0)" />
          <use href="#wreath-leaf" transform="translate(30, -35) rotate(-20)" />
          <use href="#wreath-leaf" transform="translate(45, -60) rotate(-40)" />
        </g>
        <g transform="translate(40, 0) scale(-0.9, 0.9)">
          <use href="#wreath-leaf" transform="translate(0, 0) rotate(-20)" />
          <use href="#wreath-leaf" transform="translate(-15, -15) rotate(0)" />
          <use href="#wreath-leaf" transform="translate(-30, -35) rotate(20)" />
          <use href="#wreath-leaf" transform="translate(-45, -60) rotate(40)" />
        </g>
      </g>
    </g>
  </svg>
);

const DiamondDecorator = () => (
    <span className="text-white/80 mx-4 text-sm">◇</span>
);

export function CertificateDisplay({
  completionTitle,
  studentName,
  type
}: CertificateDisplayProps) {

    const certificateMainTitle = type === 'grade'
    ? `CICLO DE FORMACIÓN - ${completionTitle.toUpperCase()}`
    : `${completionTitle.toUpperCase()}`;

    const completionText = type === 'grade'
    ? `Por haber terminado satisfactoriamente todas las actividades del ciclo y haber aprobado la evaluación final, correspondiente al diseño curricular Carlitos ODS-4.0`
    : `Por haber terminado satisfactoriamente todas las actividades del periodo y haber aprobado la evaluación final, correspondiente al ${completionTitle.toLowerCase()} del diseño curricular Carlitos ODS-4.0`;


  return (
    <div className="printable-certificate-component max-w-4xl mx-auto font-sans shadow-2xl">
      <Card className="border-0 rounded-lg overflow-hidden relative bg-white">
        {/* Blue Section */}
        <div id="blue-section" className="bg-[#a0ced9] text-white p-8 md:p-12 text-center">
          <div className="flex flex-col items-center justify-center mb-6">
            <Building2 className="h-8 w-8 mb-2" />
            <p className="text-sm tracking-widest font-light">CARLITOS ODS-4.0</p>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-wider mb-4">
            CERTIFICADO
          </h1>
          <div className="flex items-center justify-center mb-6">
            <div className="flex-grow border-t border-white/50"></div>
            <DiamondDecorator />
            <h2 className="text-lg md:text-xl font-semibold tracking-widest whitespace-nowrap">
                {certificateMainTitle}
            </h2>
            <DiamondDecorator />
            <div className="flex-grow border-t border-white/50"></div>
          </div>
          <p className="text-base md:text-lg mb-2">Otorgado a:</p>
          <p className="text-3xl md:text-4xl font-bold mb-4">
            {studentName || "Estudiante Dedicado"}
          </p>
          <p className="text-sm md:text-base max-w-2xl mx-auto">
            {completionText}
          </p>
        </div>

        {/* White Section */}
        <div className="bg-white px-8 pt-16 pb-8 flex flex-col md:flex-row items-center justify-between relative">
            {/* Seal positioned absolutely relative to this white section */}
            <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-32 h-32 flex items-center justify-center">
                 <div className="relative w-28 h-28">
                    <SealIcon />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 flex justify-center gap-1 mt-[-10px]">
                        {Array.from({length: 7}).map((_, i) => (
                            <div key={i} className="w-1 h-12 bg-[#a0ced9]"></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center md:text-left w-full md:w-auto">
                <div className="border-t-2 border-gray-400 w-48 mx-auto md:mx-0 mb-2"></div>
                <p className="text-sm text-gray-600">Dr. Richard Ayala Ardila</p>
            </div>
            <div className="w-24 h-24 relative mt-4 md:mt-0">
                <Image
                    src="/images/carlitos_personaje.png"
                    alt="Personaje Carlitos"
                    width={96}
                    height={96}
                    className="mx-auto"
                />
            </div>
        </div>

      </Card>
      
       <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Montserrat:wght@300;400;600;700&display=swap');

        .font-serif {
            font-family: 'Merriweather', serif;
        }
        .font-sans {
            font-family: 'Montserrat', sans-serif;
        }

        @media print {
          body * {
            visibility: hidden;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
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
            height: 100vh; /* Adjust for landscape */
            padding: 0; 
            margin: 0; 
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            display: flex; 
            flex-direction: column;
            align-items: center;
            justify-content: center;
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
         @page {
          size: landscape;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
