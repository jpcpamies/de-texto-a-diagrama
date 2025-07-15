// Generador de títulos descriptivos para diagramas
export const generateDiagramTitle = (inputText: string, diagramType: string): string => {
  const text = inputText.toLowerCase().trim();
  
  // Títulos específicos por tipo de contenido
  const patterns = [
    {
      keywords: ['tortilla', 'receta', 'cocinar', 'ingredientes', 'patatas', 'cocina'],
      titles: ['Receta de Tortilla de Patatas', 'Proceso de Cocina', 'Elaboración de Tortilla']
    },
    {
      keywords: ['login', 'autenticar', 'autenticación', 'usuario', 'contraseña'],
      titles: ['Sistema de Autenticación', 'Proceso de Login', 'Flujo de Autenticación']
    },
    {
      keywords: ['compra', 'carrito', 'tienda', 'pago', 'ecommerce', 'checkout'],
      titles: ['Proceso de Compra', 'Flujo E-commerce', 'Sistema de Pagos']
    },
    {
      keywords: ['proceso', 'workflow', 'flujo', 'procedimiento'],
      titles: ['Flujo de Proceso', 'Workflow del Sistema', 'Procedimiento Operativo']
    },
    {
      keywords: ['registro', 'alta', 'crear usuario', 'signup'],
      titles: ['Registro de Usuario', 'Proceso de Alta', 'Creación de Cuenta']
    },
    {
      keywords: ['datos', 'información', 'procesamiento', 'análisis'],
      titles: ['Procesamiento de Datos', 'Análisis de Información', 'Flujo de Datos']
    },
    {
      keywords: ['clase', 'objeto', 'herencia', 'uml'],
      titles: ['Diagrama de Clases', 'Estructura UML', 'Modelo de Objetos']
    },
    {
      keywords: ['proyecto', 'desarrollo', 'software', 'aplicación'],
      titles: ['Desarrollo de Software', 'Ciclo de Proyecto', 'Proceso de Desarrollo']
    },
    {
      keywords: ['cliente', 'servicio', 'atención', 'soporte'],
      titles: ['Atención al Cliente', 'Proceso de Soporte', 'Servicio al Usuario']
    },
    {
      keywords: ['venta', 'comercial', 'negocio', 'marketing'],
      titles: ['Proceso de Ventas', 'Flujo Comercial', 'Sistema de Negocio']
    },
    {
      keywords: ['comunicación', 'mensaje', 'notificación', 'email'],
      titles: ['Sistema de Comunicación', 'Flujo de Mensajes', 'Proceso de Notificación']
    }
  ];

  // Buscar patrón que coincida
  for (const pattern of patterns) {
    const hasKeyword = pattern.keywords.some(keyword => text.includes(keyword));
    if (hasKeyword) {
      const randomIndex = Math.floor(Math.random() * pattern.titles.length);
      return pattern.titles[randomIndex];
    }
  }

  // Generar título basado en palabras clave principales
  const words = text.split(' ')
    .filter(word => word.length > 3)
    .filter(word => !['para', 'como', 'desde', 'hasta', 'donde', 'cuando', 'porque'].includes(word))
    .slice(0, 3);

  if (words.length >= 2) {
    const capitalizedWords = words.map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    );
    
    if (diagramType === 'classDiagram') {
      return `Diagrama de ${capitalizedWords.join(' ')}`;
    } else {
      return `Proceso de ${capitalizedWords.join(' ')}`;
    }
  }

  // Títulos por defecto según tipo de diagrama
  const defaultTitles = {
    flowchart: ['Diagrama de Flujo', 'Proceso del Sistema', 'Flujo de Trabajo'],
    classDiagram: ['Diagrama de Clases', 'Estructura de Objetos', 'Modelo UML'],
    sequenceDiagram: ['Diagrama de Secuencia', 'Interacciones del Sistema', 'Flujo de Comunicación'],
    erDiagram: ['Diagrama ER', 'Modelo de Datos', 'Estructura de Base de Datos'],
    gantt: ['Cronograma de Proyecto', 'Planificación Temporal', 'Diagrama de Gantt'],
    pie: ['Distribución de Datos', 'Análisis Estadístico', 'Gráfico Circular']
  };

  const typeKey = diagramType as keyof typeof defaultTitles;
  const titlesForType = defaultTitles[typeKey] || defaultTitles.flowchart;
  const randomIndex = Math.floor(Math.random() * titlesForType.length);
  
  return titlesForType[randomIndex];
};

// Función para generar título más creativo estilo NotebookLM
export const generateCreativeTitle = (inputText: string, diagramType: string): string => {
  const text = inputText.toLowerCase().trim();
  
  // Detectar el contexto principal
  const contexts = [
    {
      keywords: ['tortilla', 'receta', 'cocinar', 'ingredientes', 'patatas'],
      templates: [
        'Receta de Tortilla Española',
        'Técnica Culinaria Tradicional',
        'Preparación Gastronómica'
      ]
    },
    {
      keywords: ['usuario', 'login', 'autenticar'],
      templates: [
        'Autenticación de Usuarios',
        'Portal de Acceso',
        'Gestión de Identidades'
      ]
    },
    {
      keywords: ['compra', 'pago', 'tienda'],
      templates: [
        'Experiencia de Compra',
        'Journey del Cliente',
        'Ecosistema E-commerce'
      ]
    },
    {
      keywords: ['datos', 'proceso', 'información'],
      templates: [
        'Pipeline de Datos',
        'Arquitectura de Información',
        'Flujo de Procesamiento'
      ]
    },
    {
      keywords: ['proyecto', 'desarrollo'],
      templates: [
        'Metodología de Desarrollo',
        'Lifecycle del Proyecto',
        'Framework de Trabajo'
      ]
    }
  ];

  for (const context of contexts) {
    const hasContext = context.keywords.some(keyword => text.includes(keyword));
    if (hasContext) {
      const randomTemplate = context.templates[Math.floor(Math.random() * context.templates.length)];
      return randomTemplate;
    }
  }

  // Si no hay contexto específico, usar el generador básico
  return generateDiagramTitle(inputText, diagramType);
};