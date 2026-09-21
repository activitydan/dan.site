// Italian is the site's primary language; English is the alternate.
//
// Scope: prose only. Navigation labels, section badges, metric labels, tech
// stack names, product titles and form field labels stay in English in both
// catalogues, because they read as part of the layout rather than as copy.
// Within a content block, though, headings are translated alongside their
// paragraph, so a card never mixes an English heading over Italian text.

export const DEFAULT_LANG = 'it';
export const LANGUAGES = ['it', 'en'];

export const translations = {
  it: {
    hero: {
      subtitle: 'Architetto di sistemi & sviluppatore potenziato dall’AI',
    },

    about: {
      bio: 'Sono Dan, sviluppatore full stack AI-native. Invece di passare settimane a scrivere codice ripetitivo a mano, lavoro a livello architetturale: progetto flussi di sistema disaccoppiati, schemi dati, contratti API e interfacce responsive con HTML, CSS e JavaScript. Dirigendo l’AI generativa come copilota di sviluppo, realizzo, correggo e pubblico applicazioni cloud pronte per la produzione su Vercel, in tempi ottimizzati.',
    },

    telemetry: {
      focus: {
        title: 'Direttore digitale',
        text: 'Direttore Digitale trasformatore e ottimizzatore dei processi aziendali attraverso la progettazione di architetture software, soluzioni web ed ecosistemi multi-piattaforma.',
      },
      past: {
        title: 'Trader multidisciplinare',
        text: 'Trader divergente in psicologia e fraud-analyzer con oltre 6 approcci di trading approvati e ben più di 10 strategie create e backtestate.',
      },
      profile: {
        role: 'Sviluppatore & Direttore & Analista',
      },
    },

    work: {
      projects: [
        {
          tagline: 'Generatore di battute basato su AI',
          description:
            'Un’applicazione web interattiva che mostra cosa si ottiene con prompt costruiti con precisione e streaming dei token sotto il secondo. Ho progettato prompt multi-shot con personalità definite e il rendering dello streaming lato client sulle API di Google Gemini.',
          problem:
            'I prompt generici producono umorismo piatto e prevedibile. Per ottenere una satira pungente e legata al contesto servono prompt di sistema multi-shot costruiti con cura, filtraggio dell’input e streaming dei token sotto il secondo.',
          solution:
            'Ho costruito un’esperienza web interattiva sulle API Gemini, con prompt di sistema few-shot dinamici, cambio di personalità e streaming a bassa latenza per battute che arrivano a effetto.',
          features: [
            'Risposte generate dall’AI',
            'Costruzione dei prompt',
            'Generazione istantanea',
            'Interfaccia interattiva',
          ],
          architectureFlow: [
            { title: 'Client cinetico', desc: 'Interfaccia vivace e interattiva con risposta immediata' },
            { title: 'Filtro dei prompt', desc: 'Validazione dell’input e controlli sui contenuti' },
            { title: 'Motore comico', desc: 'Prompt di sistema few-shot dinamici con scelta della personalità' },
            { title: 'Rendering in streaming', desc: 'Token consegnati sotto il secondo, con effetto di scrittura progressiva' },
          ],
          architectureDetails: [
            {
              title: 'Prompt multi-shot',
              desc: 'Ho costruito personalità comiche specifiche, ciascuna con i propri esempi, per ottenere battute taglienti in modo costante.',
            },
            {
              title: 'Streaming sotto il secondo',
              desc: 'Lo streaming dei token elimina le rotelline di caricamento: la battuta arriva carattere per carattere.',
            },
            {
              title: 'Nessuna attesa a freddo',
              desc: 'Pubblicato su infrastruttura serverless leggera sull’edge, che risponde immediatamente anche alla prima richiesta.',
            },
          ],
        },
      ],
    },

    skills: {
      categories: [
        {
          title: 'Frontend e interfacce',
          summary: 'Layout responsive, struttura a componenti e stili puliti, curati nel dettaglio.',
        },
        {
          title: 'AI generativa e prompt',
          summary: 'Schemi di prompt precisi e LLM diretti all’automazione del codice con Claude Code.',
        },
        {
          title: 'Dati e architettura',
          summary: 'Modellazione di dati complessi, calcolo analitico e Web App dedicate.',
        },
        {
          title: 'Cloud e distribuzione',
          summary: 'Hosting statico distribuito, pubblicazione continua, worker serverless sull’edge e gestione DNS.',
        },
        {
          title: 'Framework',
          summary: 'Framework progettati e realizzati con flussi di lavoro moderni assistiti dall’AI.',
        },
        {
          title: 'Fondamenti',
          summary: 'Principi di informatica, programmazione a oggetti, basi di algoritmi e lettura degli schemi dati.',
        },
      ],
    },

    timeline: {
      items: [
        {
          title: 'Bruciare le barche',
          headline: 'HTML5, CSS3 e fondamenti di programmazione',
          summary:
            'Nel 1519 Cortés arrivò sulle coste messicane con circa 500 uomini e 11 navi per conquistare l’Impero azteco. Visto che parte dell’equipaggio voleva la ritirata ed era pronta a ripartire, Cortés ordinò di distruggere la flotta.',
          closing: 'O ce la fai o sei fottuto',
        },
        {
          title: 'ChatUp: messaggistica in tempo reale',
          headline: 'Progettata e pubblicata in 5 giorni',
          summary:
            'Ho progettato e consegnato ChatUp in uno sprint intensivo di 5 giorni a giugno 2026. Ho definito l’architettura WebSocket full-duplex e gli schemi MongoDB, guidando la generazione del codice con l’AI per i canali Socket.io, con tempi di risposta sotto i 25 ms.',
        },
        {
          title: 'Roasting AI: generatore su LLM',
          headline: 'Realizzato e pubblicato in 3 giorni',
          summary:
            'Ho realizzato e pubblicato Roasting AI in uno sprint di 3 giorni a giugno 2026. Ho strutturato gli schemi di prompt comici multi-shot per le API di Google Gemini, implementato le risposte in streaming in React e costruito una logica di ripiego solida per non lasciare mai la richiesta senza risposta.',
        },
        {
          title: 'Generatore di CV e edge Cloudflare',
          headline: 'SaaS Next.js disaccoppiato e OAuth 2.0',
          summary:
            'Ho progettato e pubblicato nel 2026 una piattaforma SaaS distribuita sull’edge. Ho separato il livello di presentazione Next.js su Cloudflare Pages da un’API Express/PostgreSQL, protetto l’accesso con Google OAuth 2.0 PKCE e diretto Gemini AI per il punteggio ATS dei CV in tempo reale.',
        },
      ],
    },

    contact: {
      lead: 'Hai un’idea, una sfida full stack o un’opportunità di lavoro di cui parlare? Scrivimi direttamente qui sotto.',
      placeholderName: 'es. Marco Rossi',
      placeholderEmail: 'marco@azienda.it',
      placeholderMessage: 'Descrivi il progetto, i tempi o gli obiettivi tecnici...',
      signal: {
        awaiting: 'In attesa dei tuoi dati',
        progress: 'In corso',
        almost: 'Quasi pronto',
        ready: 'Pronto da inviare',
      },
      validation: 'Inserisci il tuo nome e un messaggio.',
      failure: 'Invio non riuscito. Riprova, oppure scrivimi direttamente via email.',
      flight: [
        'Preparazione al decollo...',
        'In viaggio lungo il canale di comunicazione...',
        'In avvicinamento alla destinazione...',
        'Messaggio consegnato!',
      ],
      successTitle: 'Messaggio inviato',
      availability: 'Disponibile per nuovi progetti e collaborazioni',
    },

    layout: {
      scrollHint: 'Scorri o clicca per la sezione successiva',
    },

    footer: {
      copyright: '© 2026 COSTRUITO CON DAN. Tutti i sistemi operativi.',
    },
  },

  en: {
    hero: {
      subtitle: 'System Architect & AI-Augmented Developer',
    },

    about: {
      bio: 'I’m Dan, an AI-native full stack developer. Rather than spending weeks writing boilerplate code by hand, I work at the architectural level: designing decoupled system flows, data schemas, API contracts, and responsive interfaces with HTML, CSS, and JavaScript. By directing generative AI as an engineering co-pilot, I build, debug, and ship production-ready cloud applications to Vercel, on optimised timelines.',
    },

    telemetry: {
      focus: {
        title: 'Digital director',
        text: 'A digital director transforming and optimising business processes through the design of software architectures, web solutions and multi-platform ecosystems.',
      },
      past: {
        title: 'Multidisciplinary trader',
        text: 'A trader with a divergent read on market psychology and fraud analysis, with more than 6 approved trading approaches and well over 10 strategies built and backtested.',
      },
      profile: {
        role: 'Developer & Director & Analyst',
      },
    },

    work: {
      projects: [
        {
          tagline: 'AI-Powered Roast Generator',
          description:
            'An interactive AI web application demonstrating precision prompt engineering and sub-second token streaming. Architected multi-shot persona prompts and structured client-side stream rendering using Google Gemini API.',
          problem:
            'Standard LLM prompts generate generic, sterile humor. Achieving sharp, dynamic, context-aware satire requires precise multi-shot system prompt framing, input sanitization, and sub-second token streaming.',
          solution:
            'Architected an interactive AI web experience leveraging Gemini API with dynamic few-shot system prompts, personality archetype switching, and low-latency token streaming for high-impact comedic punchlines.',
          features: [
            'AI-generated responses',
            'Prompt engineering',
            'Instant roast generation',
            'Interactive UI',
          ],
          architectureFlow: [
            { title: 'Kinetic Client', desc: 'Vibrant interactive prompt interface with real-time feedback' },
            { title: 'Prompt Sanitizer', desc: 'Input validation and content moderation checks' },
            { title: 'Humor Engine', desc: 'Dynamic few-shot system prompt framing with archetype tuning' },
            { title: 'Stream Renderer', desc: 'Sub-second token delivery with kinetic text typing effects' },
          ],
          architectureDetails: [
            {
              title: 'Multi-Shot Prompt Framing',
              desc: 'Curated specialized comedic personas with tailored few-shot exemplars to produce razor-sharp humor consistently.',
            },
            {
              title: 'Sub-Second Streaming',
              desc: 'Configured streaming token endpoints to eliminate loading spinners and deliver punchlines character by character.',
            },
            {
              title: 'Zero Cold-Start Latency',
              desc: 'Deployed on lightweight serverless edge infrastructure ensuring instantaneous response times.',
            },
          ],
        },
      ],
    },

    skills: {
      categories: [
        {
          title: 'Frontend & UI Craft',
          summary: 'Responsive layouts, component structure and clean, detailed styling.',
        },
        {
          title: 'Generative AI & Prompts',
          summary: 'Precise prompt schemas and LLMs directed at code automation with Claude Code.',
        },
        {
          title: 'Data & Architecture',
          summary: 'Modelling complex data, analytical computation and dedicated web apps.',
        },
        {
          title: 'Cloud & Deployment',
          summary: 'Edge-distributed static hosting, continuous deployment, serverless edge workers, and DNS routing.',
        },
        {
          title: 'Frameworks',
          summary: 'Frameworks architected and synthesized using modern AI-assisted engineering workflows.',
        },
        {
          title: 'Fundamentals',
          summary: 'Foundational computer science principles, OOP concepts, algorithm basics, and schema comprehension.',
        },
      ],
    },

    timeline: {
      items: [
        {
          title: 'Burn the boats',
          headline: 'HTML5, CSS3 & Programming Basics',
          summary:
            'In 1519 Cortés landed on the Mexican coast with around 500 men and 11 ships to conquer the Aztec Empire. With part of his crew wanting to turn back and ready to sail, Cortés ordered the fleet destroyed.',
          closing: 'You make it or you are finished',
        },
        {
          title: 'ChatUp: Real-Time Messaging App',
          headline: 'Architected & Shipped in 5 Days',
          summary:
            'Architected and delivered ChatUp in an intensive 5-day build sprint in June 2026. Designed the full-duplex WebSocket architecture and MongoDB schemas, directing AI code generation to implement Socket.io channels with sub-25ms response times.',
        },
        {
          title: 'Roasting AI: LLM Generator',
          headline: 'Engineered & Shipped in 3 Days',
          summary:
            'Engineered and deployed Roasting AI in a rapid 3-day sprint in June 2026. Structured multi-shot comedic prompt schemas for Google Gemini API, implemented streaming token responses in React, and built resilient fallback logic for instant comedic roasts.',
        },
        {
          title: 'AI Resume Builder & Cloudflare Edge',
          headline: 'Decoupled Next.js SaaS & OAuth 2.0',
          summary:
            'Architected and shipped an edge-deployed SaaS platform in 2026. Decoupled the Next.js presentation layer on Cloudflare Pages from an Express/PostgreSQL backend API, securing auth via Google OAuth 2.0 PKCE and directing Gemini AI for real-time ATS resume scoring.',
        },
      ],
    },

    contact: {
      lead: 'Have a project idea, a full-stack challenge, or an engineering opportunity to discuss? Send a direct message below.',
      placeholderName: 'e.g. Alex Mercer',
      placeholderEmail: 'alex@company.com',
      placeholderMessage: 'Describe your project, timeline, or engineering goals...',
      signal: {
        awaiting: 'Awaiting your details',
        progress: 'In progress',
        almost: 'Almost ready',
        ready: 'Ready to send',
      },
      validation: 'Please enter your name and message.',
      failure: 'Transmission failed. Please try again or use direct email.',
      flight: [
        'Preparing flight trajectory...',
        'Gliding across communications channel...',
        'Approaching destination...',
        'Transmission Delivered!',
      ],
      successTitle: 'Message Dispatched',
      availability: 'Available for new projects & opportunities',
    },

    layout: {
      scrollHint: 'Scroll down or click for next section',
    },

    footer: {
      copyright: '© 2026 BUILD WITH DAN. All systems operational.',
    },
  },
};
