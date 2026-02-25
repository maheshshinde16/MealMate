// Meal-specific image mappings
// Maps meal names to their specific image URLs or use dynamic fallback

const mealImages = {
  'pizza': 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=400&fit=crop',
  'Pizza': 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=400&fit=crop',
  'PIZZA': 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=400&fit=crop',
  
  'vada pav': '/images/Vada-Pav-Recipe-thumbnail.jpg',
  'VADA PAV': '/images/Vada-Pav-Recipe-thumbnail.jpg',
  'Vada Pav': '/images/Vada-Pav-Recipe-thumbnail.jpg',
  'vadapav': '/images/Vada-Pav-Recipe-thumbnail.jpg',

  'Chicken Biryani': '/images/Chicken-Biryani-thumbnail.webp',
  'CHICKEN BIRYANI': '/images/Chicken-Biryani-thumbnail.webp',
  'chicken biryani': '/images/Chicken-Biryani-thumbnail.webp',
  
  'Chicken Handi': '/images/Chicken-Handi-thumbnail.webp',
  'CHICKEN HANDI': '/images/Chicken-Handi-thumbnail.webp',
  'chicken handi': '/images/Chicken-Handi-thumbnail.webp'

};

export const getMealImageUrl = (mealName) => {
  if (!mealName) return null;
  return mealImages[mealName] || null;
};

export default mealImages;
