/**
 * Farm to Fork — Menu Data
 * All menu items with categories, descriptions, pricing, and images.
 */

export const menuData = [
  {
    id: 1,
    name: 'Fresh Garden Salad',
    description:
      'Crisp mixed greens with cherry tomatoes, cucumber, thinly sliced red onion & a light house balsamic vinaigrette.',
    price: 9.5,
    category: 'Starters',
    imageUrl:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    bestSeller: false,
  },
  {
    id: 2,
    name: 'Classic Caesar Salad',
    description:
      'Crisp romaine lettuce, garlic butter croutons, shaved parmesan cheese, and our signature Caesar dressing.',
    price: 10.5,
    category: 'Starters',
    imageUrl:
      'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop',
    bestSeller: true,
  },
  {
    id: 3,
    name: 'Heirloom Tomato Bruschetta',
    description:
      'Toasted artisanal baguette topped with diced heirloom tomatoes, fresh basil, garlic, and extra virgin olive oil.',
    price: 8.5,
    category: 'Starters',
    imageUrl:
      'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=800&auto=format&fit=crop',
    bestSeller: false,
  },
  {
    id: 4,
    name: 'Grilled Chicken Breast',
    description:
      'Herb-marinated free-range chicken breast served over roasted seasonal vegetables and garlic mashed potatoes.',
    price: 22.5,
    category: 'Mains',
    imageUrl:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop',
    bestSeller: true,
  },

  {
    id: 6,
    name: 'Creamy Mushroom Pasta',
    description:
      'Fettuccine tossed in a rich truffle cream sauce with wild mushrooms and topped with fresh parmesan.',
    price: 19.0,
    category: 'Mains',
    imageUrl:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=800&auto=format&fit=crop',
    bestSeller: false,
  },
  {
    id: 7,
    name: 'Pan-Seared Salmon',
    description:
      'Wild-caught salmon fillet with a lemon butter glaze, served over wild rice and sautéed asparagus.',
    price: 26.5,
    category: 'Mains',
    imageUrl:
      'https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=800&auto=format&fit=crop',
    bestSeller: false,
  },
  {
    id: 8,
    name: 'Chocolate Fudge Cake',
    description:
      'Decadent, rich, and moist multi-layer chocolate cake served with a scoop of Madagascar vanilla bean ice cream.',
    price: 10.0,
    category: 'Desserts',
    imageUrl: '/chocolate-cake.png',
    bestSeller: true,
  },
  {
    id: 9,
    name: 'Fresh Fruit Tart',
    description:
      'A buttery, flaky pastry tart crust generously filled with smooth vanilla custard and topped with seasonal fruits.',
    price: 9.5,
    category: 'Desserts',
    imageUrl: '/fruit-tart.png',
    bestSeller: false,
  },
  // ──── Drinks ────
  {
    id: 10,
    name: 'Fresh Pressed Orange Juice',
    description:
      'Freshly squeezed Valencia oranges served chilled with a sprig of mint. Pure, sweet, and refreshing.',
    price: 6.0,
    category: 'Drinks',
    imageUrl:
      'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=800&auto=format&fit=crop',
    bestSeller: false,
  },
  {
    id: 11,
    name: 'Iced Matcha Latte',
    description:
      'Ceremonial-grade Japanese matcha whisked with oat milk over ice. Earthy, creamy, and energizing.',
    price: 7.5,
    category: 'Drinks',
    imageUrl:
      'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop',
    bestSeller: true,
  },
  {
    id: 12,
    name: 'Tropical Berry Smoothie',
    description:
      'A vibrant blend of strawberries, blueberries, mango, and banana with Greek yogurt and local honey.',
    price: 8.0,
    category: 'Drinks',
    imageUrl:
      'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=800&auto=format&fit=crop',
    bestSeller: false,
  },
  {
    id: 13,
    name: 'Sparkling Lavender Lemonade',
    description:
      'House-made lemonade infused with French lavender syrup and sparkling water. Floral and effervescent.',
    price: 6.5,
    category: 'Drinks',
    imageUrl:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop',
    bestSeller: true,
  },
  {
    id: 14,
    name: 'Masala Chai',
    description:
      'Traditional spiced Indian tea with cardamom, cinnamon, ginger, and cloves. Steamed with whole milk.',
    price: 5.5,
    category: 'Drinks',
    imageUrl: '/masala-chai.jpg',
    bestSeller: false,
  },
  {
    id: 15,
    name: 'Cold Brew Coffee',
    description:
      'Slow-steeped for 18 hours using single-origin beans. Smooth, bold, and naturally sweet. Served over ice.',
    price: 6.0,
    category: 'Drinks',
    imageUrl:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop',
    bestSeller: false,
  },
];

// ──── Bar Menu (separate from main menu, dark theme) ────
export const barData = [
  {
    id: 101,
    name: 'Classic Old Fashioned',
    description:
      'Bourbon, Angostura bitters, raw sugar, and a twist of orange peel. Stirred, not shaken.',
    price: 14.0,
    spirit: 'Bourbon',
    imageUrl:
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop',
    signature: true,
  },
  {
    id: 102,
    name: 'Espresso Martini',
    description:
      'Freshly pulled espresso shaken with premium vodka, coffee liqueur, and a touch of vanilla.',
    price: 15.0,
    spirit: 'Vodka',
    imageUrl:
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
    signature: true,
  },
  {
    id: 103,
    name: 'Garden Mojito',
    description:
      'Fresh mint from our garden muddled with lime, white rum, cane sugar, and topped with soda.',
    price: 13.0,
    spirit: 'Rum',
    imageUrl:
      'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=800&auto=format&fit=crop',
    signature: false,
  },
  {
    id: 104,
    name: 'Aperol Spritz',
    description:
      'The Italian classic — Aperol, Prosecco, and a splash of soda water with a fresh orange slice.',
    price: 13.5,
    spirit: 'Aperol',
    imageUrl:
      'https://images.unsplash.com/photo-1560512823-829485b8bf24?q=80&w=800&auto=format&fit=crop',
    signature: false,
  },
  {
    id: 105,
    name: 'Whiskey Sour',
    description:
      'Rye whiskey shaken with fresh lemon juice, simple syrup, and a frothy egg white crown.',
    price: 14.0,
    spirit: 'Whiskey',
    imageUrl:
      'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800&auto=format&fit=crop',
    signature: false,
  },
  {
    id: 106,
    name: 'Negroni',
    description:
      'Equal parts London dry gin, sweet vermouth, and Campari. Stirred and served over a large ice sphere.',
    price: 14.5,
    spirit: 'Gin',
    imageUrl:
      'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=800&auto=format&fit=crop',
    signature: true,
  },
];

export const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

export const LEAF_IMG_URL = '/leaf-decor.png';

/**
 * Secret code to toggle Bar visibility.
 * The person in charge taps the footer copyright 5 times
 * within 3 seconds, OR types "ftf" on the keyboard.
 */
export const SECRET_TAP_COUNT = 5;
export const SECRET_TAP_WINDOW_MS = 3000;
export const SECRET_KEYBOARD_CODE = 'ftf';
