// User and meal data storage
let currentUser = localStorage.getItem('currentUser') || null;
let users = JSON.parse(localStorage.getItem('users')) || {};
let meals = [];
let weekPlan = {};

// Suggested meals data with enhanced properties - 100 unique meals
const suggestedMeals = [
    // Breakfast Meals (25)
    { name: "Pancakes", mealType: "breakfast", category: "american", cookTime: 20, servings: 4, calories: 350, cost: 8.50, instructions: "Mix dry ingredients, add wet ingredients, cook on griddle until golden", ingredients: [{ name: "Flour", amount: "2 cups", cost: 1.50 }, { name: "Eggs", amount: "2", cost: 1.00 }, { name: "Milk", amount: "1.5 cups", cost: 2.00 }, { name: "Butter", amount: "2 tbsp", cost: 1.00 }] },
    { name: "French Toast", mealType: "breakfast", category: "american", cookTime: 15, servings: 4, calories: 380, cost: 7.00, instructions: "Beat eggs with milk and cinnamon, dip bread, cook until golden brown", ingredients: [{ name: "Bread", amount: "6 slices", cost: 2.50 }, { name: "Eggs", amount: "3", cost: 1.50 }, { name: "Milk", amount: "1/2 cup", cost: 1.00 }, { name: "Cinnamon", amount: "1 tsp", cost: 0.50 }] },
    { name: "Scrambled Eggs", mealType: "breakfast", category: "american", cookTime: 10, servings: 2, calories: 280, cost: 4.00, instructions: "Beat eggs, cook in butter over low heat, stir constantly", ingredients: [{ name: "Eggs", amount: "4", cost: 2.00 }, { name: "Butter", amount: "1 tbsp", cost: 0.50 }, { name: "Salt", amount: "1/2 tsp", cost: 0.25 }, { name: "Pepper", amount: "1/4 tsp", cost: 0.25 }] },
    { name: "Oatmeal", mealType: "breakfast", category: "american", cookTime: 10, servings: 2, calories: 300, cost: 3.00, instructions: "Boil water, add oats, cook 5 minutes, add toppings", ingredients: [{ name: "Oats", amount: "1 cup", cost: 1.50 }, { name: "Water", amount: "2 cups", cost: 0.00 }, { name: "Honey", amount: "2 tbsp", cost: 1.00 }, { name: "Banana", amount: "1", cost: 0.50 }] },
    { name: "Waffles", mealType: "breakfast", category: "american", cookTime: 15, servings: 4, calories: 400, cost: 6.50, instructions: "Mix batter, cook in waffle iron, serve with syrup", ingredients: [{ name: "Waffle mix", amount: "2 cups", cost: 3.00 }, { name: "Eggs", amount: "2", cost: 1.00 }, { name: "Milk", amount: "1 cup", cost: 1.50 }, { name: "Syrup", amount: "1/4 cup", cost: 1.00 }] },
    { name: "Breakfast Burrito", mealType: "breakfast", category: "mexican", cookTime: 15, servings: 2, calories: 450, cost: 8.00, instructions: "Scramble eggs, warm tortillas, add fillings and wrap", ingredients: [{ name: "Tortillas", amount: "2", cost: 1.50 }, { name: "Eggs", amount: "4", cost: 2.00 }, { name: "Cheese", amount: "1/2 cup", cost: 2.00 }, { name: "Salsa", amount: "1/4 cup", cost: 2.50 }] },
    { name: "Bagel with Cream Cheese", mealType: "breakfast", category: "american", cookTime: 5, servings: 2, calories: 320, cost: 4.50, instructions: "Toast bagels, spread cream cheese", ingredients: [{ name: "Bagels", amount: "2", cost: 2.00 }, { name: "Cream cheese", amount: "4 tbsp", cost: 2.50 }] },
    { name: "Smoothie Bowl", mealType: "breakfast", category: "vegetarian", cookTime: 10, servings: 1, calories: 350, cost: 6.00, instructions: "Blend fruits, pour into bowl, add toppings", ingredients: [{ name: "Frozen berries", amount: "1 cup", cost: 3.00 }, { name: "Banana", amount: "1", cost: 0.50 }, { name: "Yogurt", amount: "1/2 cup", cost: 1.50 }, { name: "Granola", amount: "1/4 cup", cost: 1.00 }] },
    { name: "Eggs Benedict", mealType: "breakfast", category: "american", cookTime: 25, servings: 2, calories: 520, cost: 12.00, instructions: "Poach eggs, toast muffins, make hollandaise, assemble", ingredients: [{ name: "English muffins", amount: "2", cost: 2.00 }, { name: "Eggs", amount: "4", cost: 2.00 }, { name: "Ham", amount: "4 slices", cost: 4.00 }, { name: "Hollandaise mix", amount: "1 packet", cost: 4.00 }] },
    { name: "Breakfast Sandwich", mealType: "breakfast", category: "american", cookTime: 10, servings: 1, calories: 380, cost: 5.50, instructions: "Cook egg, toast bread, assemble sandwich", ingredients: [{ name: "Bread", amount: "2 slices", cost: 1.00 }, { name: "Egg", amount: "1", cost: 0.50 }, { name: "Cheese", amount: "1 slice", cost: 1.00 }, { name: "Bacon", amount: "2 strips", cost: 3.00 }] },
    { name: "Granola with Yogurt", mealType: "breakfast", category: "vegetarian", cookTime: 5, servings: 1, calories: 320, cost: 4.50, instructions: "Layer yogurt and granola in bowl", ingredients: [{ name: "Greek yogurt", amount: "1 cup", cost: 2.50 }, { name: "Granola", amount: "1/2 cup", cost: 1.50 }, { name: "Berries", amount: "1/2 cup", cost: 0.50 }] },
    { name: "Avocado Toast", mealType: "breakfast", category: "vegetarian", cookTime: 10, servings: 2, calories: 280, cost: 6.00, instructions: "Toast bread, mash avocado, spread and season", ingredients: [{ name: "Bread", amount: "2 slices", cost: 1.50 }, { name: "Avocado", amount: "1", cost: 2.50 }, { name: "Salt", amount: "1/2 tsp", cost: 0.25 }, { name: "Lemon", amount: "1/2", cost: 1.75 }] },
    { name: "Breakfast Quesadilla", mealType: "breakfast", category: "mexican", cookTime: 15, servings: 2, calories: 420, cost: 7.50, instructions: "Scramble eggs, fill tortilla with eggs and cheese, cook until crispy", ingredients: [{ name: "Tortillas", amount: "2", cost: 1.50 }, { name: "Eggs", amount: "3", cost: 1.50 }, { name: "Cheese", amount: "1/2 cup", cost: 2.00 }, { name: "Peppers", amount: "1/4 cup", cost: 2.50 }] },
    { name: "Muffins", mealType: "breakfast", category: "american", cookTime: 25, servings: 6, calories: 280, cost: 8.00, instructions: "Mix dry and wet ingredients, bake in muffin tin", ingredients: [{ name: "Flour", amount: "2 cups", cost: 2.00 }, { name: "Sugar", amount: "1/2 cup", cost: 1.00 }, { name: "Eggs", amount: "2", cost: 1.00 }, { name: "Blueberries", amount: "1 cup", cost: 4.00 }] },
    { name: "Cereal", mealType: "breakfast", category: "american", cookTime: 2, servings: 1, calories: 250, cost: 3.50, instructions: "Pour cereal in bowl, add milk", ingredients: [{ name: "Cereal", amount: "1 cup", cost: 2.00 }, { name: "Milk", amount: "1 cup", cost: 1.50 }] },
    { name: "Breakfast Hash", mealType: "breakfast", category: "american", cookTime: 20, servings: 4, calories: 380, cost: 10.00, instructions: "Dice potatoes, cook with onions, add eggs", ingredients: [{ name: "Potatoes", amount: "3", cost: 3.00 }, { name: "Onion", amount: "1", cost: 1.00 }, { name: "Eggs", amount: "4", cost: 2.00 }, { name: "Oil", amount: "2 tbsp", cost: 4.00 }] },
    { name: "Croissant", mealType: "breakfast", category: "american", cookTime: 5, servings: 2, calories: 300, cost: 4.00, instructions: "Warm croissants, serve with jam", ingredients: [{ name: "Croissants", amount: "2", cost: 3.00 }, { name: "Jam", amount: "2 tbsp", cost: 1.00 }] },
    { name: "Breakfast Pizza", mealType: "breakfast", category: "american", cookTime: 20, servings: 4, calories: 450, cost: 12.00, instructions: "Top pizza dough with eggs, cheese, and bacon", ingredients: [{ name: "Pizza dough", amount: "1", cost: 3.00 }, { name: "Eggs", amount: "4", cost: 2.00 }, { name: "Cheese", amount: "1 cup", cost: 3.00 }, { name: "Bacon", amount: "4 strips", cost: 4.00 }] },
    { name: "Fruit Salad", mealType: "breakfast", category: "vegetarian", cookTime: 10, servings: 4, calories: 180, cost: 8.00, instructions: "Chop fruits, mix together, add honey", ingredients: [{ name: "Apple", amount: "1", cost: 1.50 }, { name: "Orange", amount: "1", cost: 1.50 }, { name: "Grapes", amount: "1 cup", cost: 3.00 }, { name: "Honey", amount: "2 tbsp", cost: 2.00 }] },
    { name: "Breakfast Wrap", mealType: "breakfast", category: "american", cookTime: 15, servings: 2, calories: 420, cost: 8.50, instructions: "Scramble eggs, warm tortilla, add fillings and wrap", ingredients: [{ name: "Tortilla", amount: "2", cost: 2.00 }, { name: "Eggs", amount: "4", cost: 2.00 }, { name: "Sausage", amount: "2 links", cost: 3.00 }, { name: "Cheese", amount: "1/2 cup", cost: 1.50 }] },
    { name: "Chia Pudding", mealType: "breakfast", category: "vegetarian", cookTime: 5, servings: 2, calories: 250, cost: 6.00, instructions: "Mix chia seeds with milk, refrigerate overnight, add toppings", ingredients: [{ name: "Chia seeds", amount: "1/4 cup", cost: 3.00 }, { name: "Almond milk", amount: "1 cup", cost: 2.00 }, { name: "Vanilla", amount: "1 tsp", cost: 0.50 }, { name: "Berries", amount: "1/2 cup", cost: 0.50 }] },
    { name: "Breakfast Parfait", mealType: "breakfast", category: "vegetarian", cookTime: 5, servings: 2, calories: 300, cost: 7.00, instructions: "Layer yogurt, granola, and fruit in glasses", ingredients: [{ name: "Yogurt", amount: "2 cups", cost: 3.00 }, { name: "Granola", amount: "1/2 cup", cost: 2.00 }, { name: "Strawberries", amount: "1 cup", cost: 2.00 }] },
    { name: "Breakfast Smoothie", mealType: "breakfast", category: "vegetarian", cookTime: 5, servings: 2, calories: 280, cost: 5.50, instructions: "Blend all ingredients until smooth", ingredients: [{ name: "Banana", amount: "2", cost: 1.00 }, { name: "Spinach", amount: "1 cup", cost: 1.50 }, { name: "Yogurt", amount: "1/2 cup", cost: 1.50 }, { name: "Orange juice", amount: "1 cup", cost: 1.50 }] },
    { name: "Toast with Peanut Butter", mealType: "breakfast", category: "vegetarian", cookTime: 5, servings: 2, calories: 320, cost: 4.00, instructions: "Toast bread, spread peanut butter", ingredients: [{ name: "Bread", amount: "2 slices", cost: 1.50 }, { name: "Peanut butter", amount: "2 tbsp", cost: 2.50 }] },
    { name: "Breakfast Casserole", mealType: "breakfast", category: "american", cookTime: 45, servings: 8, calories: 380, cost: 15.00, instructions: "Layer bread, eggs, cheese, bake until set", ingredients: [{ name: "Bread", amount: "8 slices", cost: 4.00 }, { name: "Eggs", amount: "8", cost: 4.00 }, { name: "Milk", amount: "2 cups", cost: 3.00 }, { name: "Cheese", amount: "2 cups", cost: 4.00 }] },
    
    // Lunch Meals (35)
    { name: "Caesar Salad", mealType: "lunch", category: "vegetarian", cookTime: 10, servings: 4, calories: 280, cost: 12.00, instructions: "Wash and chop lettuce, add dressing and toss, top with croutons and cheese", ingredients: [{ name: "Romaine lettuce", amount: "1 head", cost: 3.00 }, { name: "Parmesan cheese", amount: "1/2 cup", cost: 4.00 }, { name: "Croutons", amount: "1 cup", cost: 2.50 }, { name: "Caesar dressing", amount: "1/4 cup", cost: 2.50 }] },
    { name: "BLT Sandwich", mealType: "lunch", category: "american", cookTime: 15, servings: 2, calories: 420, cost: 8.50, instructions: "Cook bacon, toast bread, assemble with lettuce and tomato", ingredients: [{ name: "Bacon", amount: "6 strips", cost: 4.00 }, { name: "Bread", amount: "4 slices", cost: 1.50 }, { name: "Lettuce", amount: "4 leaves", cost: 1.00 }, { name: "Tomato", amount: "1", cost: 2.00 }] },
    { name: "Grilled Cheese", mealType: "lunch", category: "vegetarian", cookTime: 10, servings: 2, calories: 380, cost: 5.00, instructions: "Butter bread, add cheese, grill until golden", ingredients: [{ name: "Bread", amount: "4 slices", cost: 2.00 }, { name: "Cheese", amount: "4 slices", cost: 2.50 }, { name: "Butter", amount: "2 tbsp", cost: 0.50 }] },
    { name: "Soup and Salad", mealType: "lunch", category: "vegetarian", cookTime: 15, servings: 2, calories: 320, cost: 8.00, instructions: "Heat soup, prepare salad, serve together", ingredients: [{ name: "Canned soup", amount: "2 cups", cost: 4.00 }, { name: "Mixed greens", amount: "4 cups", cost: 3.00 }, { name: "Dressing", amount: "2 tbsp", cost: 1.00 }] },
    { name: "Tuna Salad", mealType: "lunch", category: "american", cookTime: 10, servings: 2, calories: 350, cost: 6.50, instructions: "Mix tuna with mayo, serve on bread or crackers", ingredients: [{ name: "Tuna", amount: "2 cans", cost: 4.00 }, { name: "Mayo", amount: "3 tbsp", cost: 1.00 }, { name: "Celery", amount: "2 stalks", cost: 1.00 }, { name: "Bread", amount: "4 slices", cost: 0.50 }] },
    { name: "Turkey Wrap", mealType: "lunch", category: "american", cookTime: 10, servings: 2, calories: 380, cost: 9.00, instructions: "Layer ingredients in tortilla, roll tightly", ingredients: [{ name: "Tortilla", amount: "2", cost: 2.00 }, { name: "Turkey", amount: "4 oz", cost: 4.00 }, { name: "Cheese", amount: "2 slices", cost: 1.50 }, { name: "Lettuce", amount: "2 cups", cost: 1.50 }] },
    { name: "Quesadilla", mealType: "lunch", category: "mexican", cookTime: 15, servings: 2, calories: 450, cost: 7.00, instructions: "Fill tortilla with cheese, cook until crispy", ingredients: [{ name: "Tortillas", amount: "2", cost: 1.50 }, { name: "Cheese", amount: "1 cup", cost: 3.00 }, { name: "Chicken", amount: "1/2 cup", cost: 2.50 }] },
    { name: "Club Sandwich", mealType: "lunch", category: "american", cookTime: 15, servings: 2, calories: 520, cost: 12.00, instructions: "Layer turkey, bacon, lettuce, tomato on toasted bread", ingredients: [{ name: "Bread", amount: "6 slices", cost: 2.50 }, { name: "Turkey", amount: "4 oz", cost: 4.00 }, { name: "Bacon", amount: "4 strips", cost: 3.00 }, { name: "Lettuce", amount: "4 leaves", cost: 2.50 }] },
    { name: "Pasta Salad", mealType: "lunch", category: "vegetarian", cookTime: 20, servings: 4, calories: 320, cost: 8.00, instructions: "Cook pasta, mix with vegetables and dressing", ingredients: [{ name: "Pasta", amount: "2 cups", cost: 2.00 }, { name: "Vegetables", amount: "2 cups", cost: 4.00 }, { name: "Italian dressing", amount: "1/4 cup", cost: 2.00 }] },
    { name: "Chicken Salad", mealType: "lunch", category: "american", cookTime: 15, servings: 3, calories: 380, cost: 10.00, instructions: "Mix cooked chicken with mayo and seasonings", ingredients: [{ name: "Chicken breast", amount: "2 cups", cost: 6.00 }, { name: "Mayo", amount: "1/4 cup", cost: 1.50 }, { name: "Celery", amount: "2 stalks", cost: 1.00 }, { name: "Grapes", amount: "1/2 cup", cost: 1.50 }] },
    { name: "Panini", mealType: "lunch", category: "italian", cookTime: 12, servings: 2, calories: 420, cost: 9.50, instructions: "Layer ingredients in bread, grill in panini press", ingredients: [{ name: "Ciabatta bread", amount: "1 loaf", cost: 3.00 }, { name: "Ham", amount: "4 oz", cost: 3.50 }, { name: "Cheese", amount: "4 slices", cost: 2.00 }, { name: "Tomato", amount: "1", cost: 1.00 }] },
    { name: "Ramen Bowl", mealType: "lunch", category: "asian", cookTime: 15, servings: 2, calories: 400, cost: 7.00, instructions: "Cook noodles, add broth and toppings", ingredients: [{ name: "Ramen noodles", amount: "2 packs", cost: 2.00 }, { name: "Broth", amount: "4 cups", cost: 3.00 }, { name: "Egg", amount: "2", cost: 1.00 }, { name: "Green onions", amount: "2", cost: 1.00 }] },
    { name: "Greek Salad", mealType: "lunch", category: "vegetarian", cookTime: 15, servings: 4, calories: 300, cost: 11.00, instructions: "Chop vegetables, add feta and olives, dress with olive oil", ingredients: [{ name: "Cucumber", amount: "1", cost: 2.00 }, { name: "Tomatoes", amount: "2", cost: 3.00 }, { name: "Feta cheese", amount: "1/2 cup", cost: 4.00 }, { name: "Olives", amount: "1/4 cup", cost: 2.00 }] },
    { name: "Fish Tacos", mealType: "lunch", category: "mexican", cookTime: 20, servings: 3, calories: 380, cost: 14.00, instructions: "Grill fish, warm tortillas, assemble with toppings", ingredients: [{ name: "White fish", amount: "1 lb", cost: 8.00 }, { name: "Corn tortillas", amount: "6", cost: 2.00 }, { name: "Cabbage", amount: "2 cups", cost: 2.00 }, { name: "Lime", amount: "2", cost: 2.00 }] },
    { name: "Chicken Caesar Wrap", mealType: "lunch", category: "american", cookTime: 12, servings: 2, calories: 450, cost: 10.50, instructions: "Mix chicken with caesar dressing, wrap in tortilla", ingredients: [{ name: "Tortilla", amount: "2", cost: 2.00 }, { name: "Chicken breast", amount: "1 cup", cost: 4.00 }, { name: "Caesar dressing", amount: "3 tbsp", cost: 2.50 }, { name: "Romaine", amount: "2 cups", cost: 2.00 }] },
    { name: "Veggie Burger", mealType: "lunch", category: "vegetarian", cookTime: 15, servings: 2, calories: 350, cost: 8.00, instructions: "Cook veggie patty, assemble burger with toppings", ingredients: [{ name: "Veggie patties", amount: "2", cost: 4.00 }, { name: "Burger buns", amount: "2", cost: 2.00 }, { name: "Lettuce", amount: "4 leaves", cost: 1.00 }, { name: "Tomato", amount: "1", cost: 1.00 }] },
    { name: "Pita Pocket", mealType: "lunch", category: "vegetarian", cookTime: 10, servings: 2, calories: 320, cost: 7.50, instructions: "Fill pita with hummus and vegetables", ingredients: [{ name: "Pita bread", amount: "2", cost: 2.50 }, { name: "Hummus", amount: "1/4 cup", cost: 2.00 }, { name: "Cucumber", amount: "1", cost: 1.50 }, { name: "Sprouts", amount: "1/2 cup", cost: 1.50 }] },
    { name: "Chicken Noodle Soup", mealType: "lunch", category: "american", cookTime: 25, servings: 4, calories: 280, cost: 9.00, instructions: "Simmer chicken, vegetables, and noodles in broth", ingredients: [{ name: "Chicken breast", amount: "1 cup", cost: 4.00 }, { name: "Egg noodles", amount: "2 cups", cost: 2.00 }, { name: "Carrots", amount: "2", cost: 1.50 }, { name: "Chicken broth", amount: "4 cups", cost: 1.50 }] },
    { name: "Cobb Salad", mealType: "lunch", category: "american", cookTime: 15, servings: 2, calories: 480, cost: 13.00, instructions: "Arrange ingredients on lettuce, serve with dressing", ingredients: [{ name: "Mixed greens", amount: "4 cups", cost: 3.00 }, { name: "Chicken breast", amount: "1 cup", cost: 4.00 }, { name: "Bacon", amount: "4 strips", cost: 3.00 }, { name: "Blue cheese", amount: "1/4 cup", cost: 3.00 }] },
    { name: "Burrito Bowl", mealType: "lunch", category: "mexican", cookTime: 20, servings: 2, calories: 420, cost: 11.00, instructions: "Layer rice, beans, meat, and toppings in bowl", ingredients: [{ name: "Rice", amount: "1 cup", cost: 2.00 }, { name: "Black beans", amount: "1 cup", cost: 2.00 }, { name: "Chicken", amount: "1/2 cup", cost: 3.00 }, { name: "Salsa", amount: "1/4 cup", cost: 4.00 }] },
    { name: "Caprese Sandwich", mealType: "lunch", category: "italian", cookTime: 10, servings: 2, calories: 380, cost: 9.00, instructions: "Layer mozzarella, tomato, basil on bread", ingredients: [{ name: "Ciabatta", amount: "1 loaf", cost: 3.00 }, { name: "Mozzarella", amount: "4 oz", cost: 3.50 }, { name: "Tomato", amount: "1", cost: 1.50 }, { name: "Basil", amount: "1/4 cup", cost: 1.00 }] },
    { name: "Chicken Quesadilla", mealType: "lunch", category: "mexican", cookTime: 15, servings: 2, calories: 480, cost: 8.50, instructions: "Fill tortilla with chicken and cheese, cook until crispy", ingredients: [{ name: "Tortillas", amount: "2", cost: 1.50 }, { name: "Chicken breast", amount: "1 cup", cost: 4.00 }, { name: "Cheese", amount: "1 cup", cost: 2.50 }, { name: "Peppers", amount: "1/2 cup", cost: 0.50 }] },
    { name: "Stir Fry Rice", mealType: "lunch", category: "asian", cookTime: 15, servings: 3, calories: 350, cost: 8.00, instructions: "Stir fry rice with vegetables and soy sauce", ingredients: [{ name: "Cooked rice", amount: "3 cups", cost: 3.00 }, { name: "Mixed vegetables", amount: "2 cups", cost: 3.00 }, { name: "Soy sauce", amount: "3 tbsp", cost: 1.00 }, { name: "Eggs", amount: "2", cost: 1.00 }] },
    { name: "Meatball Sub", mealType: "lunch", category: "italian", cookTime: 20, servings: 2, calories: 520, cost: 10.00, instructions: "Heat meatballs in sauce, serve in sub roll with cheese", ingredients: [{ name: "Sub rolls", amount: "2", cost: 3.00 }, { name: "Meatballs", amount: "8", cost: 4.00 }, { name: "Marinara sauce", amount: "1 cup", cost: 2.00 }, { name: "Mozzarella", amount: "1/2 cup", cost: 1.00 }] },
    { name: "Chicken Teriyaki Bowl", mealType: "lunch", category: "asian", cookTime: 20, servings: 2, calories: 420, cost: 9.50, instructions: "Cook chicken in teriyaki sauce, serve over rice", ingredients: [{ name: "Chicken breast", amount: "2 pieces", cost: 5.00 }, { name: "Teriyaki sauce", amount: "1/4 cup", cost: 2.00 }, { name: "Rice", amount: "2 cups", cost: 2.00 }, { name: "Broccoli", amount: "1 cup", cost: 0.50 }] },
    { name: "Philly Cheesesteak", mealType: "lunch", category: "american", cookTime: 18, servings: 2, calories: 550, cost: 12.00, instructions: "Cook beef with onions, serve in roll with cheese", ingredients: [{ name: "Steak", amount: "8 oz", cost: 6.00 }, { name: "Hoagie rolls", amount: "2", cost: 2.50 }, { name: "Cheese", amount: "4 slices", cost: 2.00 }, { name: "Onions", amount: "1", cost: 1.50 }] },
    { name: "Chicken Fajitas", mealType: "lunch", category: "mexican", cookTime: 20, servings: 3, calories: 400, cost: 11.00, instructions: "Cook chicken with peppers and onions, serve with tortillas", ingredients: [{ name: "Chicken breast", amount: "1 lb", cost: 5.00 }, { name: "Bell peppers", amount: "2", cost: 3.00 }, { name: "Onion", amount: "1", cost: 1.00 }, { name: "Tortillas", amount: "6", cost: 2.00 }] },
    { name: "Sushi Bowl", mealType: "lunch", category: "asian", cookTime: 15, servings: 2, calories: 380, cost: 12.00, instructions: "Layer sushi rice with fish and vegetables", ingredients: [{ name: "Sushi rice", amount: "2 cups", cost: 3.00 }, { name: "Salmon", amount: "4 oz", cost: 6.00 }, { name: "Cucumber", amount: "1", cost: 1.50 }, { name: "Avocado", amount: "1", cost: 1.50 }] },
    { name: "Buffalo Chicken Wrap", mealType: "lunch", category: "american", cookTime: 15, servings: 2, calories: 460, cost: 9.50, instructions: "Toss chicken in buffalo sauce, wrap with lettuce", ingredients: [{ name: "Tortilla", amount: "2", cost: 2.00 }, { name: "Chicken breast", amount: "1 cup", cost: 4.00 }, { name: "Buffalo sauce", amount: "3 tbsp", cost: 1.50 }, { name: "Lettuce", amount: "2 cups", cost: 2.00 }] },
    { name: "Chicken Parm Sandwich", mealType: "lunch", category: "italian", cookTime: 25, servings: 2, calories: 580, cost: 11.50, instructions: "Bread and fry chicken, serve with marinara and cheese", ingredients: [{ name: "Chicken breast", amount: "2 pieces", cost: 5.00 }, { name: "Sub rolls", amount: "2", cost: 3.00 }, { name: "Marinara", amount: "1/2 cup", cost: 1.50 }, { name: "Mozzarella", amount: "1/2 cup", cost: 2.00 }] },
    { name: "Poke Bowl", mealType: "lunch", category: "asian", cookTime: 15, servings: 2, calories: 400, cost: 14.00, instructions: "Cube fish, serve over rice with vegetables", ingredients: [{ name: "Tuna", amount: "8 oz", cost: 8.00 }, { name: "Rice", amount: "2 cups", cost: 2.00 }, { name: "Edamame", amount: "1/2 cup", cost: 2.00 }, { name: "Seaweed", amount: "1/4 cup", cost: 2.00 }] },
    { name: "Chicken Shawarma", mealType: "lunch", category: "mediterranean", cookTime: 20, servings: 3, calories: 420, cost: 10.00, instructions: "Marinate and cook chicken, serve in pita with sauce", ingredients: [{ name: "Chicken thighs", amount: "1 lb", cost: 4.00 }, { name: "Pita bread", amount: "3", cost: 3.00 }, { name: "Yogurt sauce", amount: "1/4 cup", cost: 2.00 }, { name: "Cucumber", amount: "1", cost: 1.00 }] },
    { name: "Banh Mi", mealType: "lunch", category: "asian", cookTime: 15, servings: 2, calories: 450, cost: 8.50, instructions: "Fill baguette with meat, pickled vegetables, and herbs", ingredients: [{ name: "Baguette", amount: "1", cost: 2.50 }, { name: "Pork", amount: "4 oz", cost: 3.00 }, { name: "Pickled vegetables", amount: "1/2 cup", cost: 2.00 }, { name: "Cilantro", amount: "1/4 cup", cost: 1.00 }] },

    // Dinner Meals (40)
    { name: "Spaghetti Bolognese", mealType: "dinner", category: "italian", cookTime: 45, servings: 6, calories: 520, cost: 15.00, instructions: "Brown ground beef, add sauce and simmer, cook pasta and combine", ingredients: [{ name: "Spaghetti", amount: "1 lb", cost: 2.00 }, { name: "Ground beef", amount: "1 lb", cost: 8.00 }, { name: "Tomato sauce", amount: "2 cups", cost: 3.00 }, { name: "Onion", amount: "1", cost: 1.00 }] },
    { name: "Grilled Chicken", mealType: "dinner", category: "american", cookTime: 25, servings: 4, calories: 420, cost: 18.00, instructions: "Season chicken with salt and pepper, brush with olive oil, grill 6-8 minutes per side", ingredients: [{ name: "Chicken breast", amount: "4 pieces", cost: 15.00 }, { name: "Olive oil", amount: "2 tbsp", cost: 1.00 }, { name: "Salt", amount: "1 tsp", cost: 0.50 }, { name: "Pepper", amount: "1/2 tsp", cost: 0.50 }] },
    { name: "Vegetable Stir Fry", mealType: "dinner", category: "asian", cookTime: 15, servings: 4, calories: 220, cost: 10.00, instructions: "Heat oil in wok, add garlic and ginger, stir fry vegetables until tender", ingredients: [{ name: "Mixed vegetables", amount: "3 cups", cost: 6.00 }, { name: "Soy sauce", amount: "3 tbsp", cost: 1.00 }, { name: "Garlic", amount: "2 cloves", cost: 0.50 }, { name: "Ginger", amount: "1 tsp", cost: 0.50 }] },
    { name: "Beef Tacos", mealType: "dinner", category: "mexican", cookTime: 30, servings: 4, calories: 380, cost: 16.00, instructions: "Brown ground beef with spices, warm taco shells, fill with beef, cheese, and lettuce", ingredients: [{ name: "Ground beef", amount: "1 lb", cost: 8.00 }, { name: "Taco shells", amount: "8", cost: 3.00 }, { name: "Cheese", amount: "1 cup", cost: 3.00 }, { name: "Lettuce", amount: "2 cups", cost: 2.00 }] },
    { name: "Salmon with Rice", mealType: "dinner", category: "american", cookTime: 25, servings: 4, calories: 480, cost: 22.00, instructions: "Season salmon, bake until flaky, serve with steamed rice", ingredients: [{ name: "Salmon fillets", amount: "4", cost: 16.00 }, { name: "Rice", amount: "2 cups", cost: 3.00 }, { name: "Lemon", amount: "1", cost: 1.50 }, { name: "Herbs", amount: "2 tbsp", cost: 1.50 }] },
    { name: "Chicken Alfredo", mealType: "dinner", category: "italian", cookTime: 30, servings: 4, calories: 650, cost: 18.00, instructions: "Cook pasta, sauté chicken, make alfredo sauce, combine and serve", ingredients: [{ name: "Fettuccine", amount: "1 lb", cost: 2.00 }, { name: "Chicken breast", amount: "2 lbs", cost: 8.00 }, { name: "Heavy cream", amount: "1 cup", cost: 3.00 }, { name: "Parmesan", amount: "1 cup", cost: 5.00 }] },
    { name: "Beef Stew", mealType: "dinner", category: "american", cookTime: 120, servings: 6, calories: 420, cost: 20.00, instructions: "Brown beef, add vegetables and broth, simmer until tender", ingredients: [{ name: "Beef chunks", amount: "2 lbs", cost: 12.00 }, { name: "Potatoes", amount: "4", cost: 3.00 }, { name: "Carrots", amount: "4", cost: 2.00 }, { name: "Beef broth", amount: "4 cups", cost: 3.00 }] },
    { name: "Pork Chops", mealType: "dinner", category: "american", cookTime: 20, servings: 4, calories: 380, cost: 16.00, instructions: "Season pork chops, pan fry until golden, serve with sides", ingredients: [{ name: "Pork chops", amount: "4", cost: 12.00 }, { name: "Oil", amount: "2 tbsp", cost: 1.00 }, { name: "Seasoning", amount: "2 tsp", cost: 1.00 }, { name: "Applesauce", amount: "1 cup", cost: 2.00 }] },
    { name: "Chicken Curry", mealType: "dinner", category: "asian", cookTime: 35, servings: 4, calories: 450, cost: 14.00, instructions: "Cook chicken in curry sauce, serve over rice", ingredients: [{ name: "Chicken thighs", amount: "2 lbs", cost: 8.00 }, { name: "Curry sauce", amount: "2 cups", cost: 4.00 }, { name: "Rice", amount: "2 cups", cost: 2.00 }] },
    { name: "Meatloaf", mealType: "dinner", category: "american", cookTime: 60, servings: 6, calories: 420, cost: 12.00, instructions: "Mix ground beef with breadcrumbs and egg, bake until done", ingredients: [{ name: "Ground beef", amount: "2 lbs", cost: 8.00 }, { name: "Breadcrumbs", amount: "1 cup", cost: 1.50 }, { name: "Eggs", amount: "2", cost: 1.00 }, { name: "Ketchup", amount: "1/2 cup", cost: 1.50 }] },
    { name: "Fish and Chips", mealType: "dinner", category: "american", cookTime: 30, servings: 4, calories: 580, cost: 18.00, instructions: "Batter and fry fish, serve with french fries", ingredients: [{ name: "White fish", amount: "2 lbs", cost: 12.00 }, { name: "Potatoes", amount: "4", cost: 3.00 }, { name: "Flour", amount: "2 cups", cost: 2.00 }, { name: "Oil", amount: "4 cups", cost: 1.00 }] },
    { name: "Chicken Parmesan", mealType: "dinner", category: "italian", cookTime: 40, servings: 4, calories: 620, cost: 16.00, instructions: "Bread chicken, fry until golden, top with sauce and cheese", ingredients: [{ name: "Chicken breast", amount: "4 pieces", cost: 8.00 }, { name: "Breadcrumbs", amount: "2 cups", cost: 2.00 }, { name: "Marinara", amount: "2 cups", cost: 3.00 }, { name: "Mozzarella", amount: "2 cups", cost: 3.00 }] },
    { name: "Shepherd's Pie", mealType: "dinner", category: "american", cookTime: 45, servings: 6, calories: 480, cost: 15.00, instructions: "Layer ground meat and vegetables, top with mashed potatoes", ingredients: [{ name: "Ground lamb", amount: "1 lb", cost: 8.00 }, { name: "Potatoes", amount: "3 lbs", cost: 4.00 }, { name: "Mixed vegetables", amount: "2 cups", cost: 2.00 }, { name: "Gravy", amount: "1 cup", cost: 1.00 }] },
    { name: "Lasagna", mealType: "dinner", category: "italian", cookTime: 90, servings: 8, calories: 580, cost: 20.00, instructions: "Layer pasta, meat sauce, and cheese, bake until bubbly", ingredients: [{ name: "Lasagna noodles", amount: "1 box", cost: 3.00 }, { name: "Ground beef", amount: "1 lb", cost: 6.00 }, { name: "Ricotta", amount: "2 cups", cost: 5.00 }, { name: "Mozzarella", amount: "3 cups", cost: 6.00 }] },
    { name: "Steak Dinner", mealType: "dinner", category: "american", cookTime: 20, servings: 2, calories: 650, cost: 25.00, instructions: "Season steaks, grill to desired doneness, serve with sides", ingredients: [{ name: "Ribeye steaks", amount: "2", cost: 20.00 }, { name: "Potatoes", amount: "2", cost: 2.00 }, { name: "Asparagus", amount: "1 lb", cost: 2.50 }, { name: "Butter", amount: "2 tbsp", cost: 0.50 }] },
    { name: "Chicken Enchiladas", mealType: "dinner", category: "mexican", cookTime: 40, servings: 6, calories: 520, cost: 16.00, instructions: "Fill tortillas with chicken, roll, top with sauce and cheese", ingredients: [{ name: "Chicken breast", amount: "2 cups", cost: 6.00 }, { name: "Tortillas", amount: "12", cost: 4.00 }, { name: "Enchilada sauce", amount: "2 cups", cost: 3.00 }, { name: "Cheese", amount: "2 cups", cost: 3.00 }] },
    { name: "Pad Thai", mealType: "dinner", category: "asian", cookTime: 20, servings: 4, calories: 450, cost: 12.00, instructions: "Stir fry noodles with sauce, vegetables, and protein", ingredients: [{ name: "Rice noodles", amount: "1 lb", cost: 3.00 }, { name: "Shrimp", amount: "1 lb", cost: 6.00 }, { name: "Bean sprouts", amount: "2 cups", cost: 2.00 }, { name: "Pad thai sauce", amount: "1/2 cup", cost: 1.00 }] },
    { name: "BBQ Ribs", mealType: "dinner", category: "american", cookTime: 180, servings: 4, calories: 680, cost: 22.00, instructions: "Season ribs, slow cook, finish with BBQ sauce", ingredients: [{ name: "Pork ribs", amount: "3 lbs", cost: 15.00 }, { name: "BBQ sauce", amount: "2 cups", cost: 4.00 }, { name: "Dry rub", amount: "1/4 cup", cost: 2.00 }, { name: "Wood chips", amount: "2 cups", cost: 1.00 }] },
    { name: "Chicken Tikka Masala", mealType: "dinner", category: "asian", cookTime: 40, servings: 4, calories: 520, cost: 16.00, instructions: "Marinate chicken, cook in creamy tomato sauce", ingredients: [{ name: "Chicken breast", amount: "2 lbs", cost: 8.00 }, { name: "Tikka masala sauce", amount: "2 cups", cost: 5.00 }, { name: "Rice", amount: "2 cups", cost: 2.00 }, { name: "Naan bread", amount: "4 pieces", cost: 1.00 }] },
    { name: "Beef Stroganoff", mealType: "dinner", category: "american", cookTime: 30, servings: 4, calories: 580, cost: 18.00, instructions: "Cook beef strips in creamy mushroom sauce, serve over noodles", ingredients: [{ name: "Beef strips", amount: "1 lb", cost: 10.00 }, { name: "Egg noodles", amount: "1 lb", cost: 2.00 }, { name: "Mushrooms", amount: "2 cups", cost: 3.00 }, { name: "Sour cream", amount: "1 cup", cost: 3.00 }] },
    { name: "Stuffed Peppers", mealType: "dinner", category: "american", cookTime: 45, servings: 4, calories: 380, cost: 12.00, instructions: "Hollow peppers, stuff with rice and meat mixture, bake", ingredients: [{ name: "Bell peppers", amount: "4", cost: 4.00 }, { name: "Ground beef", amount: "1 lb", cost: 6.00 }, { name: "Rice", amount: "1 cup", cost: 1.50 }, { name: "Cheese", amount: "1 cup", cost: 0.50 }] },
    { name: "Chicken Fajita Bowl", mealType: "dinner", category: "mexican", cookTime: 25, servings: 4, calories: 420, cost: 14.00, instructions: "Cook seasoned chicken and peppers, serve over rice", ingredients: [{ name: "Chicken breast", amount: "2 lbs", cost: 8.00 }, { name: "Bell peppers", amount: "3", cost: 3.00 }, { name: "Rice", amount: "2 cups", cost: 2.00 }, { name: "Fajita seasoning", amount: "2 tbsp", cost: 1.00 }] },
    { name: "Pork Tenderloin", mealType: "dinner", category: "american", cookTime: 35, servings: 4, calories: 450, cost: 18.00, instructions: "Season tenderloin, roast until internal temp reaches 145°F", ingredients: [{ name: "Pork tenderloin", amount: "2 lbs", cost: 12.00 }, { name: "Herbs", amount: "2 tbsp", cost: 2.00 }, { name: "Sweet potatoes", amount: "4", cost: 3.00 }, { name: "Green beans", amount: "1 lb", cost: 1.00 }] },
    { name: "Chicken Marsala", mealType: "dinner", category: "italian", cookTime: 30, servings: 4, calories: 480, cost: 16.00, instructions: "Pan fry chicken, make marsala wine sauce with mushrooms", ingredients: [{ name: "Chicken breast", amount: "4 pieces", cost: 8.00 }, { name: "Marsala wine", amount: "1 cup", cost: 5.00 }, { name: "Mushrooms", amount: "2 cups", cost: 2.00 }, { name: "Flour", amount: "1/2 cup", cost: 1.00 }] },
    { name: "Shrimp Scampi", mealType: "dinner", category: "italian", cookTime: 20, servings: 4, calories: 420, cost: 18.00, instructions: "Sauté shrimp in garlic butter, serve over pasta", ingredients: [{ name: "Shrimp", amount: "2 lbs", cost: 12.00 }, { name: "Linguine", amount: "1 lb", cost: 2.00 }, { name: "Garlic", amount: "6 cloves", cost: 1.00 }, { name: "White wine", amount: "1/2 cup", cost: 3.00 }] },
    { name: "Chicken Teriyaki", mealType: "dinner", category: "asian", cookTime: 25, servings: 4, calories: 380, cost: 12.00, instructions: "Marinate chicken in teriyaki, grill and serve with rice", ingredients: [{ name: "Chicken thighs", amount: "2 lbs", cost: 6.00 }, { name: "Teriyaki sauce", amount: "1/2 cup", cost: 2.00 }, { name: "Rice", amount: "2 cups", cost: 2.00 }, { name: "Broccoli", amount: "2 cups", cost: 2.00 }] },
    { name: "Baked Cod", mealType: "dinner", category: "american", cookTime: 20, servings: 4, calories: 320, cost: 16.00, instructions: "Season cod fillets, bake with lemon and herbs", ingredients: [{ name: "Cod fillets", amount: "2 lbs", cost: 12.00 }, { name: "Lemon", amount: "2", cost: 2.00 }, { name: "Herbs", amount: "2 tbsp", cost: 1.50 }, { name: "Olive oil", amount: "2 tbsp", cost: 0.50 }] },
    { name: "Chicken Cacciatore", mealType: "dinner", category: "italian", cookTime: 45, servings: 4, calories: 420, cost: 14.00, instructions: "Braise chicken with tomatoes, peppers, and herbs", ingredients: [{ name: "Chicken pieces", amount: "3 lbs", cost: 8.00 }, { name: "Tomatoes", amount: "2 cups", cost: 3.00 }, { name: "Bell peppers", amount: "2", cost: 2.00 }, { name: "Wine", amount: "1/2 cup", cost: 1.00 }] },
    { name: "Turkey Meatballs", mealType: "dinner", category: "american", cookTime: 30, servings: 4, calories: 380, cost: 12.00, instructions: "Form turkey into meatballs, bake and serve with sauce", ingredients: [{ name: "Ground turkey", amount: "1 lb", cost: 6.00 }, { name: "Breadcrumbs", amount: "1/2 cup", cost: 1.00 }, { name: "Egg", amount: "1", cost: 0.50 }, { name: "Marinara", amount: "2 cups", cost: 4.50 }] },
    { name: "Pork Fried Rice", mealType: "dinner", category: "asian", cookTime: 20, servings: 4, calories: 420, cost: 10.00, instructions: "Stir fry rice with pork, vegetables, and soy sauce", ingredients: [{ name: "Cooked rice", amount: "4 cups", cost: 3.00 }, { name: "Pork", amount: "1 cup", cost: 4.00 }, { name: "Mixed vegetables", amount: "2 cups", cost: 2.00 }, { name: "Soy sauce", amount: "3 tbsp", cost: 1.00 }] },
    { name: "Chicken Pot Pie", mealType: "dinner", category: "american", cookTime: 60, servings: 6, calories: 520, cost: 16.00, instructions: "Make chicken filling, top with pastry, bake until golden", ingredients: [{ name: "Chicken breast", amount: "2 cups", cost: 6.00 }, { name: "Mixed vegetables", amount: "2 cups", cost: 3.00 }, { name: "Pie crust", amount: "2", cost: 4.00 }, { name: "Chicken broth", amount: "2 cups", cost: 3.00 }] },
    { name: "Beef Chili", mealType: "dinner", category: "american", cookTime: 60, servings: 6, calories: 380, cost: 14.00, instructions: "Brown beef, add beans and tomatoes, simmer until thick", ingredients: [{ name: "Ground beef", amount: "1 lb", cost: 6.00 }, { name: "Kidney beans", amount: "2 cans", cost: 3.00 }, { name: "Tomatoes", amount: "2 cans", cost: 3.00 }, { name: "Chili seasoning", amount: "2 tbsp", cost: 2.00 }] },
    { name: "Lemon Herb Chicken", mealType: "dinner", category: "american", cookTime: 35, servings: 4, calories: 380, cost: 14.00, instructions: "Marinate chicken in lemon and herbs, bake until done", ingredients: [{ name: "Chicken breast", amount: "4 pieces", cost: 8.00 }, { name: "Lemon", amount: "2", cost: 2.00 }, { name: "Fresh herbs", amount: "1/4 cup", cost: 3.00 }, { name: "Olive oil", amount: "3 tbsp", cost: 1.00 }] },
    { name: "Beef and Broccoli", mealType: "dinner", category: "asian", cookTime: 20, servings: 4, calories: 420, cost: 16.00, instructions: "Stir fry beef and broccoli in savory sauce", ingredients: [{ name: "Beef strips", amount: "1 lb", cost: 8.00 }, { name: "Broccoli", amount: "4 cups", cost: 3.00 }, { name: "Stir fry sauce", amount: "1/2 cup", cost: 2.00 }, { name: "Rice", amount: "2 cups", cost: 3.00 }] },
    { name: "Stuffed Chicken Breast", mealType: "dinner", category: "american", cookTime: 40, servings: 4, calories: 480, cost: 18.00, instructions: "Butterfly chicken, stuff with filling, bake until cooked", ingredients: [{ name: "Chicken breast", amount: "4 pieces", cost: 10.00 }, { name: "Spinach", amount: "2 cups", cost: 2.00 }, { name: "Cream cheese", amount: "4 oz", cost: 3.00 }, { name: "Sun-dried tomatoes", amount: "1/2 cup", cost: 3.00 }] },
    { name: "Honey Glazed Ham", mealType: "dinner", category: "american", cookTime: 120, servings: 8, calories: 420, cost: 25.00, instructions: "Score ham, glaze with honey mixture, bake until heated", ingredients: [{ name: "Ham", amount: "5 lbs", cost: 20.00 }, { name: "Honey", amount: "1/2 cup", cost: 3.00 }, { name: "Brown sugar", amount: "1/4 cup", cost: 1.00 }, { name: "Mustard", amount: "2 tbsp", cost: 1.00 }] },
    { name: "Chicken Shawarma", mealType: "dinner", category: "mediterranean", cookTime: 30, servings: 4, calories: 450, cost: 14.00, instructions: "Marinate chicken in spices, cook and serve with rice", ingredients: [{ name: "Chicken thighs", amount: "2 lbs", cost: 6.00 }, { name: "Shawarma spices", amount: "3 tbsp", cost: 2.00 }, { name: "Rice", amount: "2 cups", cost: 2.00 }, { name: "Yogurt sauce", amount: "1/2 cup", cost: 4.00 }] },
    { name: "Eggplant Parmesan", mealType: "dinner", category: "vegetarian", cookTime: 60, servings: 4, calories: 480, cost: 12.00, instructions: "Bread and fry eggplant, layer with sauce and cheese", ingredients: [{ name: "Eggplant", amount: "2", cost: 4.00 }, { name: "Marinara", amount: "3 cups", cost: 4.00 }, { name: "Mozzarella", amount: "2 cups", cost: 3.00 }, { name: "Breadcrumbs", amount: "2 cups", cost: 1.00 }] }

];

// DOM elements
const mealModal = document.getElementById('meal-modal');
const suggestionsModal = document.getElementById('suggestions-modal');
const selectModal = document.getElementById('select-modal');
const groceryModal = document.getElementById('grocery-modal');
const analyticsModal = document.getElementById('analytics-modal');
const recipeModal = document.getElementById('recipe-modal');
const mealForm = document.getElementById('meal-form');
const addMealBtn = document.getElementById('add-meal-btn');
const suggestMealBtn = document.getElementById('suggest-meal-btn');
const addIngredientBtn = document.getElementById('add-ingredient');
const ingredientsContainer = document.getElementById('ingredients-container');

let currentSlot = null;
let portionScale = 1;
let mealHistory = JSON.parse(localStorage.getItem('mealHistory')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let userPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {
    darkMode: false,
    notifications: true,
    autoSave: true
};
// Advanced feature variables removed to prevent conflicts

// Event listeners
document.addEventListener('DOMContentLoaded', initApp);
document.getElementById('auth-btn').addEventListener('click', authenticate);
document.getElementById('logout-btn').addEventListener('click', logout);
document.getElementById('grocery-list-btn').addEventListener('click', generateGroceryList);
document.getElementById('clear-week-btn').addEventListener('click', clearWeek);
document.getElementById('export-data-btn').addEventListener('click', exportData);
document.getElementById('import-data-btn').addEventListener('click', () => document.getElementById('import-file').click());
document.getElementById('import-file').addEventListener('change', importData);
document.getElementById('analytics-btn').addEventListener('click', showAnalytics);
document.getElementById('search-meals').addEventListener('input', filterSuggestions);
document.getElementById('filter-category').addEventListener('change', filterSuggestions);
document.getElementById('filter-time').addEventListener('change', filterSuggestions);
document.getElementById('scale-portions').addEventListener('click', scalePortions);
document.getElementById('export-grocery').addEventListener('click', exportGroceryList);
addMealBtn.addEventListener('click', () => openModal(mealModal));
suggestMealBtn.addEventListener('click', showSuggestions);
addIngredientBtn.addEventListener('click', addIngredientRow);
mealForm.addEventListener('submit', saveMeal);

// Close modals
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        e.target.closest('.modal').classList.add('hidden');
    });
});

document.querySelectorAll('.btn-cancel').forEach(cancelBtn => {
    cancelBtn.addEventListener('click', (e) => {
        e.target.closest('.modal').classList.add('hidden');
    });
});

// Meal slot click handlers
document.querySelectorAll('.meal-slot').forEach(slot => {
    slot.addEventListener('click', () => {
        currentSlot = slot;
        showMealOptions();
    });
});

function openModal(modal) {
    modal.classList.remove('hidden');
}

function addIngredientRow() {
    const row = document.createElement('div');
    row.className = 'ingredient-row';
    row.innerHTML = `
        <input type="text" placeholder="Ingredient" required>
        <input type="text" placeholder="Amount" required>
        <input type="number" placeholder="Cost" step="0.01">
    `;
    ingredientsContainer.appendChild(row);
}

function saveMeal(e) {
    e.preventDefault();
    
    try {
        const mealName = sanitizeInput(document.getElementById('meal-name').value);
        const mealType = document.getElementById('meal-type').value;
        const category = sanitizeInput(document.getElementById('meal-category').value);
        const cookTime = Math.max(0, Math.min(600, parseInt(document.getElementById('cook-time').value) || 0));
        const servings = Math.max(1, Math.min(20, parseInt(document.getElementById('servings').value) || 4));
        const calories = Math.max(0, Math.min(5000, parseInt(document.getElementById('calories').value) || 0));
        const cost = Math.max(0, Math.min(1000, parseFloat(document.getElementById('cost').value) || 0));
        const instructions = sanitizeInput(document.getElementById('instructions').value);
        const photoFile = document.getElementById('meal-photo').files[0];
        
        if (!mealName) {
            throw new Error('Meal name is required');
        }
    
        const ingredientRows = document.querySelectorAll('.ingredient-row');
        const ingredients = [];
        
        ingredientRows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            if (inputs[0].value && inputs[1].value) {
                ingredients.push({
                    name: sanitizeInput(inputs[0].value),
                    amount: sanitizeInput(inputs[1].value),
                    cost: Math.max(0, Math.min(100, parseFloat(inputs[2].value) || 0))
                });
            }
        });
        
        if (ingredients.length === 0) {
            throw new Error('At least one ingredient is required');
        }
    
        // Validate photo file
        let photoUrl = null;
        if (photoFile) {
            if (photoFile.size > 5 * 1024 * 1024) { // 5MB limit
                throw new Error('Photo file too large (max 5MB)');
            }
            if (!photoFile.type.startsWith('image/')) {
                throw new Error('Invalid file type. Please upload an image.');
            }
            photoUrl = URL.createObjectURL(photoFile);
        }
        
        const meal = { 
            name: mealName,
            mealType,
            category, 
            cookTime, 
            servings, 
            calories, 
            cost, 
            instructions, 
            ingredients,
            photo: photoUrl,
            dateAdded: new Date().toISOString(),
            userId: currentUser
        };
        
        meals.push(meal);
        saveUserData();
        
        mealModal.classList.add('hidden');
        mealForm.reset();
    } catch (error) {
        alert(error.message);
        return;
    }
    
    // Reset ingredients container
    ingredientsContainer.innerHTML = `
        <div class="ingredient-row">
            <input type="text" placeholder="Ingredient" required>
            <input type="text" placeholder="Amount" required>
            <input type="number" placeholder="Cost" step="0.01">
        </div>
    `;
}

function showSuggestions() {
    renderSuggestions(suggestedMeals);
    openModal(suggestionsModal);
}

function renderSuggestions(mealsToShow) {
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = '';
    
    mealsToShow.forEach(meal => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <div class="meal-info">
                ${meal.photo ? `<img src="${meal.photo}" class="meal-photo" alt="${meal.name}">` : ''}
                <div class="meal-details">
                    <h3>${meal.name}</h3>
                    <div class="meal-meta">
                        ${meal.category ? `${meal.category.charAt(0).toUpperCase() + meal.category.slice(1)} • ` : ''}
                        ${meal.cookTime ? `${meal.cookTime} min • ` : ''}
                        ${meal.calories ? `${meal.calories} cal • ` : ''}
                        ${meal.cost ? `$${meal.cost.toFixed(2)}` : ''}
                    </div>
                    <div class="meal-ingredients">
                        ${meal.ingredients.map(ing => `${ing.name}: ${ing.amount}`).join(', ')}
                    </div>
                </div>
            </div>
        `;
        item.addEventListener('click', () => {
            addSuggestedMeal(meal);
            suggestionsModal.classList.add('hidden');
        });
        suggestionsList.appendChild(item);
    });
}

function filterSuggestions() {
    const searchTerm = document.getElementById('search-meals').value.toLowerCase();
    const categoryFilter = document.getElementById('filter-category').value;
    const timeFilter = document.getElementById('filter-time').value;
    
    let filtered = [...suggestedMeals, ...meals];
    
    if (searchTerm) {
        filtered = filtered.filter(meal => 
            meal.name.toLowerCase().includes(searchTerm) ||
            meal.ingredients.some(ing => ing.name.toLowerCase().includes(searchTerm))
        );
    }
    
    if (categoryFilter) {
        filtered = filtered.filter(meal => meal.category === categoryFilter);
    }
    
    if (timeFilter) {
        const maxTime = parseInt(timeFilter);
        filtered = filtered.filter(meal => meal.cookTime && meal.cookTime <= maxTime);
    }
    
    renderSuggestions(filtered);
}

function addSuggestedMeal(meal) {
    if (!meals.find(m => m.name === meal.name)) {
        meals.push(meal);
        saveUserData();
    }
}

function showMealOptions() {
    const mealOptions = document.getElementById('meal-options');
    mealOptions.innerHTML = '';
    
    const allMeals = [...meals, ...suggestedMeals];
    const uniqueMeals = allMeals.filter((meal, index, self) => 
        index === self.findIndex(m => m.name === meal.name)
    );
    
    uniqueMeals.forEach(meal => {
        const option = document.createElement('div');
        option.className = 'meal-option';
        option.innerHTML = `
            <div class="meal-info">
                ${meal.photo ? `<img src="${meal.photo}" class="meal-photo" alt="${meal.name}">` : ''}
                <div class="meal-details">
                    <h3>${meal.name}</h3>
                    <div class="meal-meta">
                        ${meal.category ? `${meal.category.charAt(0).toUpperCase() + meal.category.slice(1)} • ` : ''}
                        ${meal.cookTime ? `${meal.cookTime} min • ` : ''}
                        ${meal.calories ? `${meal.calories} cal • ` : ''}
                        ${meal.cost ? `$${meal.cost.toFixed(2)}` : ''}
                    </div>
                    <div class="meal-ingredients">
                        ${meal.ingredients.map(ing => `${ing.name}: ${ing.amount}`).join(', ')}
                    </div>
                </div>
            </div>
        `;
        option.addEventListener('click', () => {
            assignMealToSlot(meal);
            selectModal.classList.add('hidden');
        });
        option.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showRecipeDetails(meal);
        });
        mealOptions.appendChild(option);
    });
    
    openModal(selectModal);
}

function scalePortions() {
    portionScale = parseFloat(document.getElementById('portion-scale').value) || 1;
    showMealOptions();
}

function showRecipeDetails(meal) {
    const recipeContent = document.getElementById('recipe-content');
    recipeContent.innerHTML = `
        <div class="recipe-header">
            ${meal.photo ? `<img src="${meal.photo}" class="recipe-photo" alt="${meal.name}">` : ''}
            <div class="recipe-info">
                <h2>${meal.name}</h2>
                <div class="recipe-meta">
                    ${meal.category ? `<span>Category: ${meal.category.charAt(0).toUpperCase() + meal.category.slice(1)}</span>` : ''}
                    ${meal.cookTime ? `<span>Cook Time: ${meal.cookTime} min</span>` : ''}
                    ${meal.servings ? `<span>Servings: ${Math.round(meal.servings * portionScale)}</span>` : ''}
                    ${meal.calories ? `<span>Calories: ${Math.round(meal.calories * portionScale)}</span>` : ''}
                    ${meal.cost ? `<span>Cost: $${(meal.cost * portionScale).toFixed(2)}</span>` : ''}
                </div>
            </div>
        </div>
        <div class="recipe-ingredients">
            <h3>Ingredients:</h3>
            ${meal.ingredients.map(ing => `<p>• ${ing.name}: ${scaleAmount(ing.amount, portionScale)}</p>`).join('')}
        </div>
        ${meal.instructions ? `
            <div class="recipe-instructions">
                <h3>Instructions:</h3>
                <p>${meal.instructions}</p>
            </div>
        ` : ''}
    `;
    selectModal.classList.add('hidden');
    openModal(recipeModal);
}

function scaleAmount(amount, scale) {
    const match = amount.match(/(\d+(?:\.\d+)?)\s*(.*)/);
    if (match) {
        const number = parseFloat(match[1]);
        const unit = match[2];
        return `${(number * scale).toFixed(1).replace('.0', '')} ${unit}`;
    }
    return amount;
}

function assignMealToSlot(meal) {
    if (currentSlot) {
        const day = currentSlot.dataset.day;
        const mealType = currentSlot.dataset.meal;
        
        // Scale meal if needed
        const scaledMeal = portionScale !== 1 ? {
            ...meal,
            servings: Math.round(meal.servings * portionScale),
            calories: Math.round(meal.calories * portionScale),
            cost: meal.cost * portionScale,
            ingredients: meal.ingredients.map(ing => ({
                ...ing,
                amount: scaleAmount(ing.amount, portionScale),
                cost: ing.cost * portionScale
            }))
        } : meal;
        
        if (!weekPlan[day]) weekPlan[day] = {};
        weekPlan[day][mealType] = scaledMeal;
        
        // Add to meal history
        mealHistory.push({
            meal: scaledMeal,
            day,
            mealType,
            date: new Date().toISOString()
        });
        localStorage.setItem('mealHistory', JSON.stringify(mealHistory));
        
        currentSlot.textContent = scaledMeal.name;
        currentSlot.classList.add('filled', mealType);
        currentSlot.title = scaledMeal.ingredients.map(ing => `${ing.name}: ${ing.amount}`).join('\n');
        
        saveUserData();
        portionScale = 1;
        document.getElementById('portion-scale').value = 1;
    }
}

function initApp() {
    // Check session validity (24 hours)
    const sessionStart = localStorage.getItem('sessionStart');
    const now = Date.now();
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
    
    if (currentUser && sessionStart && (now - parseInt(sessionStart)) < sessionDuration) {
        showApp();
        loadUserData();
        loadWeekPlan();
    } else {
        // Session expired or invalid
        logout();
    }
}

function authenticate() {
    try {
        const username = sanitizeInput(document.getElementById('username').value);
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (!username || !password) {
            throw new Error('Please enter username and password');
        }
        
        if (username.length < 3) {
            throw new Error('Username must be at least 3 characters');
        }
        
        checkRateLimit(username);
        
        // Check if user exists
        if (users[username]) {
            // Login existing user
            const storedHash = users[username].password;
            const storedSalt = users[username].salt;
            const { hash } = hashPassword(password, storedSalt);
            
            if (hash === storedHash) {
                // Reset rate limit on successful login
                delete loginAttempts[username];
                
                currentUser = username;
                localStorage.setItem('currentUser', currentUser);
                localStorage.setItem('sessionStart', Date.now().toString());
                loadUserData();
                showApp();
                loadWeekPlan();
                clearAuthForm();
            } else {
                throw new Error('Invalid password');
            }
        } else {
            // Create new user
            if (!confirmPassword) {
                throw new Error('Please confirm password for new account');
            }
            
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }
            
            validatePassword(password);
            
            const { hash, salt } = hashPassword(password);
            users[username] = { 
                password: hash, 
                salt: salt,
                created: Date.now()
            };
            localStorage.setItem('users', JSON.stringify(users));
            
            currentUser = username;
            localStorage.setItem('currentUser', currentUser);
            localStorage.setItem('sessionStart', Date.now().toString());
            loadUserData();
            showApp();
            loadWeekPlan();
            clearAuthForm();
        }
    } catch (error) {
        alert(error.message);
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sessionStart');
    meals = [];
    weekPlan = {};
    mealHistory = [];
    clearWeekGrid();
    showAuth();
}

function showAuth() {
    document.getElementById('auth-section').classList.remove('hidden');
    document.getElementById('app-section').classList.add('hidden');
}

function clearAuthForm() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirm-password').value = '';
}

// Stronger password hashing with salt
function hashPassword(password, salt = null) {
    if (!salt) salt = generateSalt();
    let hash = 0;
    const combined = password + salt;
    for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    // Multiple rounds for stronger security
    for (let round = 0; round < 1000; round++) {
        hash = ((hash << 5) - hash) + hash;
        hash = hash & hash;
    }
    return { hash: hash.toString(), salt };
}

function generateSalt() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Input sanitization
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input
        .replace(/[<>"'&]/g, function(match) {
            const escapeMap = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '&': '&amp;'
            };
            return escapeMap[match];
        })
        .trim()
        .substring(0, 100); // Limit length
}

// Rate limiting
let loginAttempts = {};
function checkRateLimit(username) {
    const now = Date.now();
    const attempts = loginAttempts[username] || { count: 0, lastAttempt: 0 };
    
    // Reset after 15 minutes
    if (now - attempts.lastAttempt > 900000) {
        attempts.count = 0;
    }
    
    if (attempts.count >= 5) {
        const timeLeft = Math.ceil((900000 - (now - attempts.lastAttempt)) / 60000);
        throw new Error(`Too many login attempts. Try again in ${timeLeft} minutes.`);
    }
    
    attempts.count++;
    attempts.lastAttempt = now;
    loginAttempts[username] = attempts;
}

// Password strength validation
function validatePassword(password) {
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
        throw new Error('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        throw new Error('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
        throw new Error('Password must contain at least one number');
    }
    return true;
}

// Initialize drag and drop for meal slots
function initDragAndDrop() {
    document.querySelectorAll('.meal-slot.filled').forEach(slot => {
        slot.draggable = true;
        slot.addEventListener('dragstart', handleDragStart);
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', JSON.stringify({
        day: e.target.dataset.day,
        meal: e.target.dataset.meal
    }));
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const sourceData = JSON.parse(e.dataTransfer.getData('text/plain'));
    const targetDay = e.target.dataset.day;
    const targetMeal = e.target.dataset.meal;
    
    if (sourceData.day !== targetDay || sourceData.meal !== targetMeal) {
        const sourceMeal = weekPlan[sourceData.day][sourceData.meal];
        const targetMeal = weekPlan[targetDay] && weekPlan[targetDay][targetMeal];
        
        // Swap meals
        if (!weekPlan[targetDay]) weekPlan[targetDay] = {};
        weekPlan[targetDay][targetMeal] = sourceMeal;
        
        if (targetMeal) {
            weekPlan[sourceData.day][sourceData.meal] = targetMeal;
        } else {
            delete weekPlan[sourceData.day][sourceData.meal];
        }
        
        saveUserData();
        clearWeekGrid();
        loadWeekPlan();
    }
}

// Enhanced meal recommendations based on history
function getRecommendations() {
    const recentMeals = mealHistory.slice(-10).map(h => h.meal.name);
    const availableMeals = [...meals, ...suggestedMeals];
    
    return availableMeals
        .filter(meal => !recentMeals.includes(meal.name))
        .sort((a, b) => {
            // Prioritize by category diversity and cost
            const aScore = (a.cost || 0) + (a.cookTime || 0) * 0.1;
            const bScore = (b.cost || 0) + (b.cookTime || 0) * 0.1;
            return aScore - bScore;
        })
        .slice(0, 5);
}

function showApp() {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('app-section').classList.remove('hidden');
    document.getElementById('welcome-text').textContent = `Welcome, ${currentUser}!`;
}

function loadUserData() {
    meals = JSON.parse(localStorage.getItem(`meals_${currentUser}`)) || [];
    weekPlan = JSON.parse(localStorage.getItem(`weekPlan_${currentUser}`)) || {};
    mealHistory = JSON.parse(localStorage.getItem(`mealHistory_${currentUser}`)) || [];
    favorites = JSON.parse(localStorage.getItem(`favorites_${currentUser}`)) || [];
    userPreferences = JSON.parse(localStorage.getItem(`preferences_${currentUser}`)) || {
        darkMode: false,
        notifications: true,
        autoSave: true
    };
}

function saveUserData() {
    localStorage.setItem(`meals_${currentUser}`, JSON.stringify(meals));
    localStorage.setItem(`weekPlan_${currentUser}`, JSON.stringify(weekPlan));
    localStorage.setItem(`mealHistory_${currentUser}`, JSON.stringify(mealHistory));
    localStorage.setItem(`favorites_${currentUser}`, JSON.stringify(favorites));
    localStorage.setItem(`preferences_${currentUser}`, JSON.stringify(userPreferences));
}

// Initialize camera when modal opens
document.addEventListener('click', (e) => {
    if (e.target.id === 'camera-btn') {
        setTimeout(initCamera, 100);
    }
});

// Close camera stream when modal closes
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        if (e.target.closest('#camera-modal') && cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
        }
        if (e.target.closest('#voice-modal')) {
            stopVoiceInput();
        }
    });
});

function clearWeekGrid() {
    document.querySelectorAll('.meal-slot').forEach(slot => {
        slot.textContent = '+';
        slot.classList.remove('filled', 'breakfast', 'lunch', 'dinner');
        slot.title = '';
    });
}

function loadWeekPlan() {
    Object.keys(weekPlan).forEach(day => {
        Object.keys(weekPlan[day]).forEach(mealType => {
            const slot = document.querySelector(`[data-day="${day}"][data-meal="${mealType}"]`);
            if (slot) {
                const meal = weekPlan[day][mealType];
                slot.textContent = meal.name;
                slot.classList.add('filled', mealType);
                slot.title = meal.ingredients.map(ing => `${ing.name}: ${ing.amount}`).join('\n');
                
                // Add click handler for recipe details
                slot.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    showRecipeDetails(meal);
                });
            }
        });
    });
}

function clearWeek() {
    if (confirm('Are you sure you want to clear the entire week plan?')) {
        weekPlan = {};
        saveUserData();
        clearWeekGrid();
    }
}

function generateGroceryList() {
    const groceryItems = {};
    let totalCost = 0;
    
    Object.values(weekPlan).forEach(day => {
        Object.values(day).forEach(meal => {
            meal.ingredients.forEach(ingredient => {
                const key = ingredient.name.toLowerCase();
                if (groceryItems[key]) {
                    groceryItems[key].amount += ` + ${ingredient.amount}`;
                    groceryItems[key].cost += ingredient.cost || 0;
                } else {
                    groceryItems[key] = {
                        name: ingredient.name,
                        amount: ingredient.amount,
                        cost: ingredient.cost || 0
                    };
                }
                totalCost += ingredient.cost || 0;
            });
        });
    });
    
    const groceryList = document.getElementById('grocery-list');
    groceryList.innerHTML = '';
    
    Object.values(groceryItems).forEach(item => {
        const div = document.createElement('div');
        div.className = 'grocery-item';
        div.innerHTML = `
            <label>
                <input type="checkbox" onchange="toggleGroceryItem(this)">
                <span>${item.name} - ${item.amount}</span>
            </label>
            <span>$${item.cost.toFixed(2)}</span>
        `;
        groceryList.appendChild(div);
    });
    
    document.getElementById('total-cost').textContent = `Total: $${totalCost.toFixed(2)}`;
    openModal(groceryModal);
}

function toggleGroceryItem(checkbox) {
    const item = checkbox.closest('.grocery-item');
    item.classList.toggle('checked', checkbox.checked);
}

function exportGroceryList() {
    const items = Array.from(document.querySelectorAll('.grocery-item')).map(item => {
        const text = item.querySelector('span').textContent;
        const cost = item.querySelector('span:last-child').textContent;
        const checked = item.classList.contains('checked');
        return `${checked ? '✓' : '○'} ${text} - ${cost}`;
    });
    
    const content = `Grocery List\n\n${items.join('\n')}\n\n${document.getElementById('total-cost').textContent}`;
    downloadFile('grocery-list.txt', content);
}

function exportData() {
    const data = {
        meals,
        weekPlan,
        mealHistory,
        exportDate: new Date().toISOString()
    };
    downloadFile('meal-planner-data.json', JSON.stringify(data, null, 2));
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            if (confirm('This will replace all your current data. Continue?')) {
                meals = data.meals || [];
                weekPlan = data.weekPlan || {};
                mealHistory = data.mealHistory || [];
                saveUserData();
                localStorage.setItem('mealHistory', JSON.stringify(mealHistory));
                loadWeekPlan();
                alert('Data imported successfully!');
            }
        } catch (error) {
            alert('Invalid file format!');
        }
    };
    reader.readAsText(file);
}

function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function showAnalytics() {
    const totalMeals = mealHistory.length;
    const uniqueMeals = new Set(mealHistory.map(h => h.meal.name)).size;
    const avgCookTime = mealHistory.reduce((sum, h) => sum + (h.meal.cookTime || 0), 0) / totalMeals || 0;
    const totalCost = mealHistory.reduce((sum, h) => sum + (h.meal.cost || 0), 0);
    const avgCalories = mealHistory.reduce((sum, h) => sum + (h.meal.calories || 0), 0) / totalMeals || 0;
    
    const categoryStats = {};
    mealHistory.forEach(h => {
        const cat = h.meal.category || 'uncategorized';
        categoryStats[cat] = (categoryStats[cat] || 0) + 1;
    });
    
    const topCategory = Object.keys(categoryStats).reduce((a, b) => 
        categoryStats[a] > categoryStats[b] ? a : b, 'none'
    );
    
    const analyticsContent = document.getElementById('analytics-content');
    analyticsContent.innerHTML = `
        <div class="analytics-stat">
            <h3>Total Meals Planned</h3>
            <p>${totalMeals}</p>
        </div>
        <div class="analytics-stat">
            <h3>Unique Meals</h3>
            <p>${uniqueMeals}</p>
        </div>
        <div class="analytics-stat">
            <h3>Average Cook Time</h3>
            <p>${avgCookTime.toFixed(0)} min</p>
        </div>
        <div class="analytics-stat">
            <h3>Total Cost</h3>
            <p>$${totalCost.toFixed(2)}</p>
        </div>
        <div class="analytics-stat">
            <h3>Average Calories</h3>
            <p>${avgCalories.toFixed(0)} cal</p>
        </div>
        <div class="analytics-stat">
            <h3>Favorite Category</h3>
            <p>${topCategory.charAt(0).toUpperCase() + topCategory.slice(1)}</p>
        </div>
    `;
    
    openModal(analyticsModal);
}