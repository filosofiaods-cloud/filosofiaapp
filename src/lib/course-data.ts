
import type { CourseContent, ClassItem } from '@/types';

const placeholderContentFilosofia = `
<h3 class="text-xl font-semibold mb-2">Objetivos de Reflexión</h3>
<ul class="list-disc list-inside mb-4">
  <li>Comprender los conceptos filosóficos fundamentales de esta lección.</li>
  <li>Aplicar el pensamiento crítico a los problemas planteados.</li>
  <li>Analizar diferentes perspectivas y argumentos filosóficos.</li>
</ul>
<h3 class="text-xl font-semibold mb-2">Introducción al Pensamiento</h3>
<p class="mb-4">Esta lección introduce conceptos cruciales. Exploraremos las bases del pensamiento filosófico y sentaremos los cimientos para debates más profundos.</p>
<h3 class="text-xl font-semibold mb-2">Conceptos Clave de la Filosofía</h3>
<p class="mb-4">"Cogito, ergo sum." La reflexión sobre la propia existencia es un pilar. Analizaremos las implicaciones de este y otros enunciados fundamentales que han moldeado el pensamiento occidental y oriental.</p>
<h3 class="text-xl font-semibold mb-2">Textos para Análisis y Discusión</h3>
<p class="mb-4">Se presentarán fragmentos de diálogos platónicos o de filósofos relevantes para fomentar el debate y la comprensión. ¿Qué significa "conocer"? ¿Es la realidad tal como la percibimos?</p>
<h3 class="text-xl font-semibold mb-2">Síntesis y Preguntas para la Continuación del Pensamiento</h3>
<p>Esta lección ofreció una visión general de los aspectos fundamentales del tema. Asegúrate de reflexionar sobre los conceptos clave y las preguntas planteadas. La filosofía es un viaje continuo.</p>
`;

const geniallyIframePeriodo1 = `<div style="width: 100%;"><div style="position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0;"><iframe title="2025 - Filosofía 10° Primer Periodo" frameborder="0" width="1200px" height="675px" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://view.genially.com/6764a42f839ad667dcfa992e" type="text/html" allowscriptaccess="always" allowfullscreen="true" scrolling="yes" allownetworking="all"></iframe> </div> </div>`;
const geniallyIframePeriodo2 = `<div style="width: 100%;"><div style="position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0;"><iframe title="2025 - Filosofía 10° Segundo periodo" frameborder="0" width="1200px" height="675px" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://view.genially.com/677008c2ff740f4fdee57a43" type="text/html" allowscriptaccess="always" allowfullscreen="true" scrolling="yes" allownetworking="all"></iframe> </div> </div>`;
const geniallyIframePeriodo3 = `<div style="width: 100%;"><div style="position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0;"><iframe title="2025 - Filosofía 10° Tercer periodo" frameborder="0" width="1200px" height="675px" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://view.genially.com/6770d46c8f8f54fd4b7ede23" type="text/html" allowscriptaccess="always" allowfullscreen="true" scrolling="yes" allownetworking="all"></iframe> </div> </div>`;
const geniallyIframePeriodo4 = `<div style="width: 100%;"><div style="position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0;"><iframe title="2025 - Filosofía 10° Cuarto periodo" frameborder="0" width="1200px" height="675px" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://view.genially.com/6772b5961e445e5f56720ba3" type="text/html" allowscriptaccess="always" allowfullscreen="true" scrolling="yes" allownetworking="all"></iframe> </div> </div>`;


const createClass = (id: string, title: string, baseContent: string, time: string, subtitle?: string, imageUrl?: string, imageHint?: string): ClassItem => {
    const item: ClassItem = {
        id,
        title,
        content: baseContent.replace('esta lección', title),
        estimatedTime: `${time}`,
        imageUrl: imageUrl || `https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=600&h=400&auto=format&fit=crop`,
        imageHint: imageHint || 'filosofia estudio'
    };
    if (subtitle) {
        item.subtitle = subtitle;
    }
    return item;
};

export const courseContent: CourseContent = {
  grades: [
    {
      id: 'introduccion',
      title: 'Décimo Grado',
      periods: [
        {
          id: '1',
          title: 'Primer Periodo. Apariencia (Arendt), Lenguaje y Pensamiento',
          description: 'Comprender la noción de "aparencia" expuesta por Hannah Arendt en su libro <em>La vida del espíritu</em>, entendiendo sus implicaciones para una reflexión "antropológica" centrada en el lenguaje y en el pensamiento.',
          classes: [
            {
              id: '1',
              title: 'Clase 1',
              content: geniallyIframePeriodo1,
              estimatedTime: 'Ve a la página 4, haz clic en la Clase 1 y desarrolla las actividades propuestas.',
              imageUrl: '/images/per1/clase1.png',
              imageHint: 'pensamiento abstracto'
            },
            {
              id: '2',
              title: 'Clase 2',
              content: geniallyIframePeriodo1,
              estimatedTime: 'Ve a la página 4, haz clic en la Clase 2 y desarrolla las actividades propuestas.',
              imageUrl: '/images/per1/clase2.png',
              imageHint: 'apariencia publica'
            },
            {
              id: '3',
              title: 'Clase 3',
              content: geniallyIframePeriodo1,
              estimatedTime: 'Ve a la página 4, haz clic en la Clase 3 y desarrolla las actividades propuestas.',
              imageUrl: '/images/per1/clase3.png',
              imageHint: 'accion politica'
            },
            {
              id: '4',
              title: 'Clase 4',
              content: geniallyIframePeriodo1,
              estimatedTime: 'Ve a la página 4, haz clic en la Clase 4 y desarrolla las actividades propuestas.',
              imageUrl: '/images/per1/clase4.png',
              imageHint: 'tragedia griega'
            },
            {
              id: '5',
              title: 'Clase 5',
              content: geniallyIframePeriodo1,
              estimatedTime: 'Ve a la página 4, haz clic en la Clase 5 y desarrolla las actividades propuestas.',
              imageUrl: '/images/per1/clase5.png',
              imageHint: 'heroe antiguo'
            },
             {
              id: '6',
              title: 'Clase 6',
              content: geniallyIframePeriodo1,
              estimatedTime: 'Ve a la página 4, haz clic en la Clase 6 y desarrolla las actividades propuestas.',
              imageUrl: '/images/per1/clase6.png',
              imageHint: 'catedral gotica'
            }
          ]
        },
        {
          id: '2',
          title: 'Segundo Periodo. El pensamiento teleológico',
          description: 'Indagación antropológica, histórica y filosófica sobre el sentido de lo humano, a la luz del pensamiento teleológico como hilo conductor',
           classes: [
              {
                id: '1',
                title: 'Clase 1',
                content: geniallyIframePeriodo2,
                estimatedTime: 'Ve a la página 4, haz clic en la Clase 1 y desarrolla las actividades propuestas.',
                imageUrl: '/images/per2/periodo2-clase1.png',
                imageHint: 'manuscrito antiguo'
              },
              {
                id: '2',
                title: 'Clase 2',
                content: geniallyIframePeriodo2,
                estimatedTime: 'Ve a la página 4, haz clic en la Clase 2 y desarrolla las actividades propuestas.',
                imageUrl: '/images/per2/periodo2-clase2.png',
                imageHint: 'brujula mapa'
              },
              {
                id: '3',
                title: 'Clase 3',
                content: geniallyIframePeriodo2,
                estimatedTime: 'Ve a la página 4, haz clic en la Clase 3 y desarrolla las actividades propuestas.',
                imageUrl: '/images/per2/periodo2-clase3.png',
                imageHint: 'filosofo griego'
              },
              {
                id: '4',
                title: 'Clase 4',
                content: geniallyIframePeriodo2,
                estimatedTime: 'Ve a la página 4, haz clic en la Clase 4 y desarrolla las actividades propuestas.',
                imageUrl: '/images/per2/periodo2-clase4.png',
                imageHint: 'reloj antiguo'
              },
              {
                id: '5',
                title: 'Clase 5',
                content: geniallyIframePeriodo2,
                estimatedTime: 'Ve a la página 4, haz clic en la Clase 5 y desarrolla las actividades propuestas.',
                imageUrl: '/images/per2/periodo2-clase5.png',
                imageHint: 'cosmos galaxia'
              },
              {
                id: '6',
                title: 'Clase 6',
                content: geniallyIframePeriodo2,
                estimatedTime: 'Ve a la página 4, haz clic en la Clase 6 y desarrolla las actividades propuestas.',
                imageUrl: '/images/per2/periodo2-clase6.png',
                imageHint: 'etica balanza'
              }
           ]
        },
        {
          id: '3',
          title: 'Tercer Periodo. El cambio de época',
          description: 'Indagación antropológica, histórica y filosófica sobre el sentido de lo humano, a la luz de la noción de "cambio de época", visto desde la perspectiva del filósofo Richard Ayala Ardila',
          classes: Array.from({ length: 6 }, (_, j) => ({
              id: `${j + 1}`,
              title: `Clase ${j + 1}`,
              content: geniallyIframePeriodo3,
              estimatedTime: `Ve a la página 4, haz clic en la Clase ${j + 1} y desarrolla las actividades propuestas.`,
              imageUrl: `/images/per3/periodo3-clase${j + 1}.png`,
              imageHint: 'debate publico'
          })),
        },
        {
          id: '4',
          title: 'Cuarto Periodo. La Sociedad de la Información y del Conocimiento',
          description: 'Indagación antropológica, histórica y filosófica sobre el sentido de lo humano, a la luz de la <em>"Sociedad de la información y del Conocimiento"</em>, vista desde la perspectiva del filósofo Richard Ayala Ardila',
          classes: Array.from({ length: 6 }, (_, j) => ({
              id: `${j + 1}`,
              title: `Clase ${j + 1}`,
              content: geniallyIframePeriodo4,
              estimatedTime: `Ve a la página 4, haz clic en la Clase ${j + 1} y desarrolla las actividades propuestas.`,
              imageUrl: `/images/per4/periodo4-clase${j + 1}.png`,
              imageHint: 'redes neuronales'
          })),
        },
      ],
    },
    {
      id: 'avanzada',
      title: 'Undécimo Grado',
      periods: [
         {
          id: '1',
          title: 'Módulo 1: Filosofía Moderna y Contemporánea',
          description: 'Profundiza en las corrientes filosóficas desde el Renacimiento hasta nuestros días.',
          classes: Array.from({ length: 6 }, (_, j) => createClass(
              `${j + 1}`, 
              `Lección ${j + 1}: Pensamiento en Evolución`, 
              placeholderContentFilosofia, 
              `${Math.floor(Math.random() * 20) + 50} minutos de lectura y reflexión`,
              undefined,
              'https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=600&h=400&auto=format&fit=crop',
              'arte renacentista'
          )),
        },
        {
          id: '2',
          title: 'Módulo 2: Filosofía de la Ciencia',
          description: 'Examina la naturaleza del método científico, las teorías y el progreso del conocimiento.',
          classes: Array.from({ length: 6 }, (_, j) => createClass(
              `${j + 1}`, 
              `Lección ${j + 1}: La Razón Científica`, 
              placeholderContentFilosofia, 
              `${Math.floor(Math.random() * 20) + 55} minutos de lectura y reflexión`,
              undefined,
              'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&h=400&auto=format&fit=crop',
              'microscopio laboratorio'
          )),
        },
        {
          id: '3',
          title: 'Módulo 3: Estética y Filosofía del Arte',
          description: 'Indaga sobre la belleza, la experiencia estética y el significado del arte.',
          classes: Array.from({ length: 6 }, (_, j) => createClass(
              `${j + 1}`, 
              `Lección ${j + 1}: La Experiencia de lo Bello`, 
              placeholderContentFilosofia, 
              `${Math.floor(Math.random() * 20) + 45} minutos de lectura y reflexión`,
              undefined,
              'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=600&h=400&auto=format&fit=crop',
              'escultura museo'
          )),
        },
        {
          id: '4',
          title: 'Módulo 4: Seminario de Investigación Filosófica',
          description: 'Desarrolla un proyecto de investigación sobre un tema filosófico de tu elección.',
          classes: Array.from({ length: 6 }, (_, j) => createClass(
              `${j + 1}`, 
              `Lección ${j + 1}: Profundización y Tesis`, 
              placeholderContentFilosofia, 
              `${Math.floor(Math.random() * 20) + 60} minutos de lectura y reflexión`,
              undefined,
              'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&h=400&auto=format&fit=crop',
              'escritorio estudio'
          )),
        },
      ],
    },
  ],
};

export const getGradeById = (gradeId: string) => courseContent.grades.find(g => g.id === gradeId);
export const getPeriodById = (gradeId: string, periodId: string) => getGradeById(gradeId)?.periods.find(p => p.id === periodId);
export const getClassById = (gradeId: string, periodId: string, classId: string) => getPeriodById(gradeId, periodId)?.classes.find(c => c.id === classId);

    

    





    




    

    

    

    






    

    

    

    

    






    





