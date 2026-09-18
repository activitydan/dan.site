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
      bio: 'Sono Dan, sviluppatore full stack AI-native. Invece di passare settimane a scrivere codice ripetitivo a mano, lavoro a livello architetturale: progetto flussi di sistema disaccoppiati, schemi dati, contratti API e interfacce responsive con HTML, CSS e Tailwind. Dirigendo l’AI generativa come copilota di sviluppo, realizzo, correggo e pubblico applicazioni cloud pronte per la produzione su Cloudflare Pages e Vercel, in tempi ottimizzati.',
    },

    telemetry: {
      focus: {
        title: 'Sistemi potenziati dall’AI',
        text: 'Progetto sistemi full stack disaccoppiati, definisco i contratti tra componenti e API e dirigo copiloti di AI generativa per implementare il codice rapidamente.',
      },
      past: {
        title: 'Trader multidisciplinare',
        text: 'Trader divergente in psicologia e fraud-analyzer con oltre 6 approcci di trading approvati e ben più di 10 strategie create e backtestate.',
      },
      profile: {
        role: 'Sviluppatore AI-native • 4º anno AIML',
        text: 'Disponibile per ruoli di ingegneria full stack, sviluppo assistito dall’AI e progetti di distribuzione cloud.',
      },
    },

    work: {
      projects: [
        {
          tagline: 'Generatore di CV e analizzatore ATS basato su AI',
          description:
            'Una piattaforma SaaS pronta per la produzione che trasforma i PDF in CV ottimizzati per i sistemi ATS. Costruita su un modello disaccoppiato che unisce un frontend Next.js sull’edge di Cloudflare Pages a un backend Express/PostgreSQL, protetto da Google OAuth 2.0 e sviluppato in coppia con l’AI.',
          problem:
            'Gli Applicant Tracking System, opachi per chi si candida, scartano fino al 75% dei CV validi per semplici errori di lettura del formato. Chi cerca lavoro riformatta tutto a mano, senza alcuna indicazione concreta su quali parole chiave contino davvero.',
          solution:
            'Ho progettato un’applicazione SaaS distribuita sull’edge che mette insieme Next.js, Cloudflare Pages e le API di Google Gemini. Ho strutturato la pipeline di lettura dei PDF e gli algoritmi di punteggio semantico ATS, guidando i copiloti AI nella scrittura del codice di produzione.',
          features: [
            'Lettura dei PDF e ottimizzazione ATS',
            'Frontend Next.js disaccoppiato sull’edge',
            'Google OAuth 2.0 e JWT sicuri',
            'Miglioramento del CV con Gemini AI',
          ],
          architectureFlow: [
            { title: 'Client sull’edge', desc: 'Routing statico distribuito e consegna delle risorse sotto gli 85 ms' },
            { title: 'Gateway di autenticazione', desc: 'Autenticazione PKCE con JWT di sessione cifrati' },
            { title: 'Microservizio API', desc: 'Lettura sicura dei PDF, limitazione delle richieste e validazione degli schemi' },
            { title: 'Intelligenza e archivio', desc: 'Punteggio ATS in tempo reale e pool di connessioni Prisma' },
          ],
          architectureDetails: [
            {
              title: 'Prestazioni disaccoppiate sull’edge',
              desc: 'Ho separato il livello di presentazione su Cloudflare Pages dal lettore di PDF, che è la parte pesante: il primo caricamento resta immediato e la latenza bassa ovunque nel mondo.',
            },
            {
              title: 'Prompt deterministici',
              desc: 'Ho scritto per le API di Google Gemini prompt con schema JSON rigido, per eliminare le allucinazioni ed estrarre i dati del CV in modo sempre coerente.',
            },
            {
              title: 'Sicurezza dei dati',
              desc: 'Nessun CV viene conservato: il documento è analizzato in memoria, valutato e restituito con cookie di sessione crittografici HTTP-only.',
            },
          ],
        },
        {
          tagline: 'Applicazione di chat web in tempo reale',
          description:
            'Una piattaforma di messaggistica moderna costruita su canali WebSocket full-duplex. Ho progettato l’architettura a eventi e gli schemi MongoDB, guidando la scrittura del codice con l’AI per ottenere messaggi istantanei con tempi di risposta sotto i 25 ms.',
          problem:
            'Le soluzioni classiche basate su polling HTTP generano traffico inutile verso il server, ritardano la consegna dei messaggi, spezzano il ritmo della conversazione e consumano la batteria dei dispositivi mobili.',
          solution:
            'Ho progettato un motore di comunicazione full-duplex con Socket.io ed Express.js, con rendering ottimistico dell’interfaccia, recupero automatico della connessione tramite heartbeat e archiviazione persistente delle conversazioni su MongoDB.',
          features: [
            'Messaggistica in tempo reale',
            'Interfaccia responsive',
            'Comunicazione immediata',
            'Esperienza di chat moderna',
          ],
          architectureFlow: [
            { title: 'Client reattivo', desc: 'Aggiornamenti ottimistici dell’interfaccia, senza ritardo sull’input' },
            { title: 'Gateway WebSocket', desc: 'Canali bidirezionali full-duplex con heartbeat' },
            { title: 'Broker di eventi', desc: 'Autenticazione dei socket tramite token e validazione dell’handshake' },
            { title: 'Storico persistente', desc: 'Conversazioni indicizzate e ordinamento composto' },
          ],
          architectureDetails: [
            {
              title: 'Motore socket full-duplex',
              desc: 'Il trasporto bidirezionale degli eventi riduce dell’80% il carico sulla CPU del server rispetto al long-polling tradizionale.',
            },
            {
              title: 'Interfaccia ottimistica',
              desc: 'I messaggi compaiono subito nell’interfaccia, prima della conferma del server, con annullamento automatico se la rete cade.',
            },
            {
              title: 'Connessione resiliente',
              desc: 'Riconnessione con attesa progressiva, così i messaggi persi vengono recuperati anche dopo un’interruzione della rete mobile.',
            },
          ],
        },
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
          title: 'Frontend e cura dell’interfaccia',
          summary: 'Layout responsive, ottimizzazione completa, struttura a componenti, stili puliti ed esperienze curate nel dettaglio.',
        },
        {
          title: 'AI generativa e costruzione dei prompt',
          summary: 'Schemi di prompt precisi e modelli LLM diretti all’automazione del codice e allo sviluppo assistito con Claude Code e strumenti AI.',
        },
        {
          title: 'Analisi dati e architettura di memorizzazione',
          summary: 'Specialista nella modellazione di dati complessi e calcolo analitico. Progetto e ottimizzo il bilanciamento tra design, efficienza e prestazioni di archiviazione dati, integrando modelli quantitativi e strutturando Web App dedicate.',
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
          title: 'Basi del web e logica di programmazione',
          headline: 'HTML5, CSS3 e fondamenti di programmazione',
          summary:
            'Ho iniziato a studiare logica di programmazione e sviluppo web a dicembre 2025. Ho imparato la struttura del frontend con HTML5, CSS3 e il CSS moderno, costruendo allo stesso tempo le basi del problem solving con Java, JavaScript e Python.',
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
      bio: 'I’m Dan, an AI-native full stack developer. Rather than spending weeks writing boilerplate code by hand, I work at the architectural level: designing decoupled system flows, data schemas, API contracts, and responsive interfaces with HTML, CSS, and Tailwind. By directing generative AI as an engineering co-pilot, I build, debug, and ship production-ready cloud applications to Cloudflare Pages and Vercel, on optimised timelines.',
    },

    telemetry: {
      focus: {
        title: 'AI-Augmented Systems',
        text: 'Architecting decoupled full-stack systems, designing component and API contracts, and directing generative AI co-pilots for rapid code implementation.',
      },
      past: {
        title: 'Multidisciplinary trader',
        text: 'A trader with a divergent read on market psychology and fraud analysis, with more than 6 approved trading approaches and well over 10 strategies built and backtested.',
      },
      profile: {
        role: 'AI-Native Developer • 4th-Year AIML',
        text: 'Open for full-stack engineering roles, AI-assisted development, and modern cloud deployment projects.',
      },
    },

    work: {
      projects: [
        {
          tagline: 'AI-Powered Resume Builder & ATS Analyzer',
          description:
            'A production-ready SaaS platform that transforms PDFs into ATS-optimized resumes. Architected with a decoupled model combining a Next.js edge frontend on Cloudflare Pages with an Express/PostgreSQL backend, secured by Google OAuth 2.0 and synthesized with AI pair-programming.',
          problem:
            'Opaque Applicant Tracking Systems (ATS) reject up to 75% of qualified resumes due to parsing mismatches. Job seekers face manual reformatting and lack real-time algorithmic guidance on keyword resonance.',
          solution:
            'Architected an edge-deployed SaaS application combining Next.js, Cloudflare Pages, and Google Gemini API. Structured the PDF parsing pipeline, semantic ATS scoring algorithms, and directed AI co-pilots to build the production codebase.',
          features: [
            'PDF parsing & ATS optimization',
            'Decoupled Next.js edge frontend',
            'Secure Google OAuth 2.0 & JWTs',
            'Gemini AI resume enhancement',
          ],
          architectureFlow: [
            { title: 'Edge Client', desc: 'Static edge routing & sub-85ms asset delivery' },
            { title: 'Auth Gateway', desc: 'PKCE authentication with encrypted session JWTs' },
            { title: 'API Microservice', desc: 'Secure PDF parsing, rate-limiting & schema validation' },
            { title: 'Intelligence & Store', desc: 'Real-time ATS scoring & Prisma connection pooling' },
          ],
          architectureDetails: [
            {
              title: 'Decoupled Edge Performance',
              desc: 'Separated the presentation layer on Cloudflare Pages from the compute-intensive PDF parser, ensuring lightning-fast initial page loads and global low latency.',
            },
            {
              title: 'Deterministic AI Prompting',
              desc: 'Engineered strict JSON schema prompts for Google Gemini API to eliminate hallucinations and extract structured resume data consistently.',
            },
            {
              title: 'Enterprise Data Security',
              desc: 'Zero persistence of raw resumes; resumes are parsed in memory, scored, and returned with HTTP-only cryptographic session cookies.',
            },
          ],
        },
        {
          tagline: 'Real-Time Web Chat Application',
          description:
            'A modern real-time chatting platform built on full-duplex WebSocket channels. Designed the event-driven system architecture and MongoDB schemas, guiding AI code synthesis to deliver instantaneous messaging with sub-25ms response times.',
          problem:
            'Standard HTTP polling solutions generate heavy server traffic and cause delayed message delivery, breaking conversational fluidity and draining mobile device batteries.',
          solution:
            'Designed a full-duplex WebSocket communication engine with Socket.io and Express.js, architecting optimistic UI rendering, automatic connection heartbeat recovery, and persistent MongoDB chat storage.',
          features: [
            'Real-time messaging',
            'Responsive interface',
            'Fast communication',
            'Modern chat experience',
          ],
          architectureFlow: [
            { title: 'Reactive Client', desc: 'Instant optimistic UI updates with zero input lag' },
            { title: 'WebSocket Gateway', desc: 'Full-duplex bidirectional channels with heartbeats' },
            { title: 'Event Broker', desc: 'Token-based socket authentication & handshake validation' },
            { title: 'Persistent History', desc: 'Indexed conversation threads & compound sorting' },
          ],
          architectureDetails: [
            {
              title: 'Full-Duplex Socket Engine',
              desc: 'Implemented bi-directional event transport that reduces server CPU load by 80% compared to traditional long-polling.',
            },
            {
              title: 'Optimistic UI Pipeline',
              desc: 'Messages render instantly in the client interface before server confirmation, with rollback handlers on network interruption.',
            },
            {
              title: 'Resilient Connection State',
              desc: 'Configured exponential backoff re-connection protocols for seamless message catch-up across dropped mobile connections.',
            },
          ],
        },
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
          title: 'Frontend & UI Craft (Hands-On)',
          summary: 'Responsive layouts, full optimisation, component structure, clean styling, and high-fidelity user experiences.',
        },
        {
          title: 'Generative AI & Prompt Design',
          summary: 'Precise prompt schemas and LLMs directed at code automation and AI-assisted development with Claude Code and other AI tools.',
        },
        {
          title: 'Data Analysis & Storage Architecture',
          summary: 'Specialised in modelling complex data and analytical computation. I design and tune the balance between design, efficiency and data storage performance, integrating quantitative models and building dedicated web apps.',
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
          title: 'Web Foundations & Core Logic',
          headline: 'HTML5, CSS3 & Programming Basics',
          summary:
            'Started exploring programming logic and web development in December 2025. Mastered core frontend structure with HTML5, CSS3, and modern CSS, while building foundational problem-solving skills in Java, JavaScript, and Python.',
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
