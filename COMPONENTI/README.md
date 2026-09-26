# COMPONENTI

1313 componenti già pronti, copiati dai cataloghi open source di animazioni,
effetti e sfondi. È una libreria da cui pescare: finché non ne usi uno, non fa
parte del sito. Vite non include nel build nulla che non sia importato, Tailwind
legge solo `src/components/ui` ed ESLint salta questa cartella.

## Come usarne uno

Il modo giusto è la CLI di shadcn, che legge il file `.json` del componente:

```
npx shadcn@latest add ./COMPONENTI/magicui/marquee/marquee.json
```

Converte il componente in JavaScript, lo mette in `src/components/ui`, installa
le dipendenze che mancano e aggiunge a `src/styles/tailwind.css` le animazioni
che gli servono. Poi si importa così:

```jsx
import { Marquee } from '@/components/ui/marquee';
```

Oppure chiedi a Claude, per esempio: "usa il marquee di Magic UI nella hero".

Copiare a mano il file `.tsx` in `src/components/ui` funziona solo se il
componente non ha dipendenze né animazioni proprie: il `.json` le elenca.

## Cataloghi

| Catalogo | Componenti | Licenza | Fonte |
|---|---|---|---|
| [Magic UI](magicui/) | 78 | MIT | [magicuidesign/magicui](https://github.com/magicuidesign/magicui) @ `d7207e5` |
| [Motion Primitives](motion-primitives/) | 35 | MIT | [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives) @ `43a3188` |
| [Cult UI](cult-ui/) | 79 | MIT | [nolly-studio/cult-ui](https://github.com/nolly-studio/cult-ui) @ `ee98a5d` |
| [Kokonut UI](kokonutui/) | 50 | MIT | [kokonut-labs/kokonutui](https://github.com/kokonut-labs/kokonutui) @ `83eec6d` |
| [Eldora UI](eldoraui/) | 61 | MIT | [karthikmudunuri/eldoraui](https://github.com/karthikmudunuri/eldoraui) @ `6bb8fd2` |
| [SmoothUI](smoothui/) | 210 | MIT | [educlopez/smoothui](https://github.com/educlopez/smoothui) @ `b6312bc` |
| [Lucide Animated](lucide-animated/) | 467 | MIT | [pqoqubbw/icons](https://github.com/pqoqubbw/icons) @ `072c38b` |
| [UI Layouts](ui-layouts/) | 333 | MIT | [naymurdev/uilayout](https://github.com/naymurdev/uilayout) @ `88d827d` |

Ogni cartella ha il suo `README.md` con l'elenco dei componenti e la licenza
del catalogo, che la licenza MIT chiede di tenere insieme ai file.

## Cosa non c'è, e perché

- **React Bits e Animate UI.** La loro licenza (MIT + Commons Clause) permette
  di usare i componenti in un sito ma non di ridistribuirli in una raccolta, e
  questo repository è pubblico. Si usano uno alla volta, direttamente nel sito:
  `npx shadcn@latest add @react-bits/Aurora-JS-TW`.
- **Aceternity UI.** Il codice non è pubblicato su GitHub: si prende solo dal
  loro sito, con `npx shadcn@latest add @aceternity/<nome>`.
- **Atelier UI, ThreeCN, PaceUI GSAP, Tween UI, Skiper UI, Nexus UI, ScrollX
  UI, Crafter UI, Bjork UI, Morphiq, Liquefy UI, Mewo, Awwwarded UI.** Non ho
  un repository pubblico verificato da cui copiarli, e i loro siti non sono
  raggiungibili dall'ambiente cloud di Claude. Sono tutti registrati in
  `components.json`, quindi dal tuo computer `npx shadcn@latest add @<catalogo>/<nome>`
  funziona.

Le librerie di codice (motion, GSAP, React Three Fiber e le altre) non stanno
qui: sono pacchetti npm, già in `package.json`.
