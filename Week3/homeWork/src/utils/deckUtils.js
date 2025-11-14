export function shuffle(array, rng = Math.random) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const LEVEL_TO_GRID = { 1: [4, 4], 2: [4, 6], 3: [6, 6] };

export function buildDeck(level = 1) {
  const [rows, cols] = LEVEL_TO_GRID[level] ?? [4, 4];
  const total = rows * cols;

  // 카드 총 개수는 짝수여야 합니다 (짝 맞추는 게임이니까)
  if (total % 2 !== 0) throw new Error("카드 개수는 짝수여야 해요.");

  const pairs = total / 2;
  const base = Array.from({ length: pairs }, (_, i) => i + 1);

  // 각 숫자 값을 2장씩 생성하고, 고유 id를 부여
  const duplicated = [];
  for (let i = 0; i < base.length; i += 1) {
    const v = base[i];
    duplicated.push({ id: `${v}-a`, value: v });
    duplicated.push({ id: `${v}-b`, value: v });
  }

  // 매 게임마다 다른 배치를 위해 마지막에 셔플
  return shuffle(duplicated);
}