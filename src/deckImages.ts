import d0 from './imgs/screen.png';
import d1 from './imgs/screen2.png';
import d2 from './imgs/screen3.png';
import d3 from './imgs/screen4.png';
import d4 from './imgs/screen5.png';
import d5 from './imgs/screen6.png';

/** Versos distintos por posição (7 cartas na mesa; a 7ª reutiliza a 1ª). */
export const TIRAGEM_DECK_BACKS: readonly string[] = [d0, d1, d2, d3, d4, d5, d0];

export const HERO_DECK_IMAGES: readonly [string, string, string] = [d0, d1, d2];

export function cardBackForSlot(slotIndex: number): string {
  return TIRAGEM_DECK_BACKS[slotIndex % TIRAGEM_DECK_BACKS.length];
}
