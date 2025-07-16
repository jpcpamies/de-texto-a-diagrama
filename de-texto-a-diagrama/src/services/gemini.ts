// Gemini AI service
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GenerateDiagramRequest, GenerateDiagramResponse, ApiResponse, DiagramData } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;

// Initialize Gemini AI
const initializeGemini = () => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }
  
  if (!genAI) {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  }
  
  return genAI;
};

// Detect diagram type from content
const detectDiagramType = (content: string): DiagramData['type'] => {
  const lowerContent = content.toLowerCase();
  
  if (lowerContent.includes('sequence') || lowerContent.includes('actor') || lowerContent.includes('participante')) {
    return 'sequence';
  }
  if (lowerContent.includes('class') || lowerContent.includes('inherit') || lowerContent.includes('extends')) {
    return 'classDiagram';
  }
  if (lowerContent.includes('entity') || lowerContent.includes('relationship') || lowerContent.includes('database')) {
    return 'erDiagram';
  }
  if (lowerContent.includes('journey') || lowerContent.includes('user journey') || lowerContent.includes('customer journey')) {
    return 'journey';
  }
  if (lowerContent.includes('gantt') || lowerContent.includes('timeline') || lowerContent.includes('schedule')) {
    return 'gantt';
  }
  if (lowerContent.includes('pie') || lowerContent.includes('chart') || lowerContent.includes('percentage')) {
    return 'pie';
  }
  if (lowerContent.includes('git') || lowerContent.includes('branch') || lowerContent.includes('commit')) {
    return 'gitgraph';
  }
  
  return 'flowchart';
};

// Generate system prompt for diagram generation
const generateSystemPrompt = (diagramType: DiagramData['type']) => {
  const basePrompt = `You are an expert in creating Mermaid diagrams. Your task is to convert natural language descriptions into valid Mermaid syntax.

IMPORTANT RULES:
1. Return ONLY the Mermaid code, no explanations or extra text
2. Use proper Mermaid syntax for ${diagramType} diagrams
3. Keep node labels concise but descriptive
4. Avoid special characters that might break Mermaid parsing
5. Use proper indentation and formatting
6. Make sure the diagram flows logically from the description

`;

  const typeSpecificPrompts = {
    flowchart: `Create a flowchart diagram using this syntax:
graph TD
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[Action 1]
    C -->|No| E[Action 2]
    D --> F[End]
    E --> F`,
    
    sequence: `Create a sequence diagram using this syntax:
sequenceDiagram
    participant A as Actor A
    participant B as Actor B
    A->>B: Message 1
    B-->>A: Response 1
    A->>B: Message 2`,
    
    classDiagram: `Create a class diagram using this syntax:
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    Animal <|-- Dog`,
    
    erDiagram: `Create an entity-relationship diagram using this syntax:
erDiagram
    CUSTOMER {
        string name
        string email
    }
    ORDER {
        int id
        date order_date
    }
    CUSTOMER ||--o{ ORDER : places`,
    
    journey: `Create a user journey diagram using this syntax:
journey
    title My Journey
    section Section 1
        Step 1: 5: User
        Step 2: 3: User
    section Section 2
        Step 3: 4: User`,
    
    gantt: `Create a Gantt chart using this syntax:
gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Planning
        Task 1: 2024-01-01, 7d
        Task 2: after task1, 5d`,
    
    pie: `Create a pie chart using this syntax:
pie title Chart Title
    "Category 1" : 45
    "Category 2" : 30
    "Category 3" : 25`,
    
    gitgraph: `Create a git graph using this syntax:
gitgraph:
    commit
    branch feature
    checkout feature
    commit
    checkout main
    merge feature`
  };

  return basePrompt + typeSpecificPrompts[diagramType];
};

export const generateDiagram = async (request: GenerateDiagramRequest): Promise<ApiResponse<GenerateDiagramResponse>> => {
  try {
    const ai = initializeGemini();
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    // Detect diagram type from input
    const diagramType = detectDiagramType(request.input);
    
    // Generate system prompt
    const systemPrompt = generateSystemPrompt(diagramType);
    
    // Create the full prompt
    const fullPrompt = `${systemPrompt}

User description: ${request.input}

${request.context ? `Additional context: ${request.context}` : ''}

Generate the Mermaid code:`;

    // Generate content
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up the response (remove markdown code blocks if present)
    const cleanedCode = text
      .replace(/^```mermaid\s*\n?/gm, '')
      .replace(/^```\s*$/gm, '')
      .trim();
    
    // Basic validation that we got something that looks like Mermaid
    if (!cleanedCode || cleanedCode.length < 10) {
      throw new Error('Generated code is too short or empty');
    }
    
    return {
      success: true,
      data: {
        mermaidCode: cleanedCode,
        diagramType,
        confidence: 0.85 // AI-generated confidence score
      }
    };
    
  } catch (error) {
    console.error('Gemini API error:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate diagram with AI'
    };
  }
};