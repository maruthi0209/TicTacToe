export const emojiCategories = {
  animals: ['🐶', '🐱', '🐵', '🐰', '🦊', '🐻', '🐸', '🐯'],
  food: ['🍕', '🍟', '🍔', '🍩', '🌮', '🍎', '🍌', '🍓'],
  sports: ['⚽', '🏀', '🏈', '🎾', '🏐', '🏓', '🎱', '🏸'],
  nature: ['🌺', '🌸', '🌼', '🌻', '🌹', '🌷', '🌲', '🍄'],
  space: ['🌟', '⭐', '🌙', '☀️', '🪐', '🌍', '🚀', '🛸']
};

export const getCategoryDisplayName = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

export const getRandomEmoji = (category) => {
  const emojis = emojiCategories[category];
  return emojis[Math.floor(Math.random() * emojis.length)];
};