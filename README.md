# MISSIONE ENERGIA – Accendi la città!

Gioco didattico inclusivo per GitHub Pages dedicato alle fonti di energia.

## Novità di questa versione

- caratteri ad alta leggibilità (Atkinson Hyperlegible come font principale, con fallback leggibili);
- schede visive dedicate alle principali fonti di energia;
- livello **Esploratore** per un percorso più guidato;
- livello **Esperto** con **missioni a bivi**, risposte a step, esclusione dal percorso in caso di errore e badge/ricompense;
- compatibilità con smartphone, tablet e computer;
- strumenti accessibili: testo più grande, alto contrasto, lettura vocale.

## Struttura del gioco

### Livello Esploratore
1. associazione fonte → centrale;
2. associazione rete → utilizzo;
3. verifica finale.

### Livello Esperto
1. associazione fonte → centrale;
2. associazione rete → utilizzo;
3. **Missioni energia** a bivi;
4. verifica finale.

## Pubblicazione su GitHub Pages

1. caricare `index.html`, `style.css` e `game.js` nella root del repository;
2. attivare GitHub Pages da `Settings > Pages`;
3. scegliere il branch `main` e la cartella `/(root)`.

## Crediti

**Ideato e creato dal Prof. Marco Cigolotti**

Progettazione e sviluppo digitale con il supporto dell'intelligenza artificiale.

## Vite nel livello Esperto

- 5 vite iniziali, mostrate come cuori nella barra del punteggio.
- Ogni errore nelle missioni a bivi costa una vita e riporta al primo step della missione.
- Con zero vite appare una schermata **Game Over** con pulsante **Nuova partita**.
- I badge rimangono acquisiti finché la partita non termina.
- In **Accessibilità** è possibile attivare la modalità senza perdita di vite.
- Il livello Esploratore non ha penalità.
