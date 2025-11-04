// Topic configuration for the game
export interface Topic {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export const TOPICS: Topic[] = [
  {
    id: "animals",
    name: "Animals",
    emoji: "🐶",
    description: "Guess the animal emojis",
    color: "bg-gradient-to-br from-green-100 to-emerald-200",
  },
  {
    id: "food",
    name: "Food & Drinks",
    emoji: "🍕",
    description: "Guess the food emojis",
    color: "bg-gradient-to-br from-orange-100 to-yellow-200",
  },
  {
    id: "transportation",
    name: "Transportation",
    emoji: "🚗",
    description: "Guess the vehicle emojis",
    color: "bg-gradient-to-br from-blue-100 to-cyan-200",
  },
];
