import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ChefHat, Clock, Users, X, Sparkles, UtensilsCrossed, CheckCircle, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  availableIngredients: string[];
  missingIngredients: string[];
  prepTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  instructions: string[];
  image: string;
}

export function RecipeGenerator() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [mealType, setMealType] = useState('');
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim().toLowerCase())) {
      setIngredients([...ingredients, currentIngredient.trim().toLowerCase()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const generateRecipes = async () => {
    setIsGenerating(true);

    // Mock recipe generation - In a real app, this would call an API
    setTimeout(() => {
      // Expanded pool of mock recipes
      const allRecipes = [
        {
          id: '1',
          name: 'Mediterranean Chickpea Salad',
          ingredients: ['chickpeas', 'tomatoes', 'cucumber', 'red onion', 'olive oil', 'lemon juice', 'feta cheese', 'oregano'],
          prepTime: '15 min',
          servings: 4,
          difficulty: 'Easy' as const,
          instructions: [
            'Drain and rinse chickpeas',
            'Dice tomatoes and cucumber',
            'Thinly slice red onion',
            'Combine all vegetables in a large bowl',
            'Whisk olive oil, lemon juice, and oregano',
            'Pour dressing over salad and toss',
            'Top with crumbled feta cheese',
            'Serve chilled'
          ],
          image: 'https://images.unsplash.com/photo-1646834118758-479021c8d1fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGluZ3JlZGllbnRzJTIwY29va2luZ3xlbnwxfHx8fDE3NTc0MDk4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        },
        {
          id: '2',
          name: 'Veggie Stir Fry with Rice',
          ingredients: ['rice', 'broccoli', 'carrots', 'bell peppers', 'soy sauce', 'garlic', 'ginger', 'sesame oil'],
          prepTime: '25 min',
          servings: 3,
          difficulty: 'Medium' as const,
          instructions: [
            'Cook rice according to package instructions',
            'Cut vegetables into bite-sized pieces',
            'Heat oil in a large pan or wok',
            'Stir-fry garlic and ginger for 30 seconds',
            'Add harder vegetables first (carrots, broccoli)',
            'Add bell peppers and stir-fry until tender',
            'Add soy sauce and sesame oil',
            'Serve over rice'
          ],
          image: 'https://images.unsplash.com/photo-1614955177711-2540ad25432b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHN0aXIlMjBmcnklMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1NzQ4ODA0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        },
        {
          id: '3',
          name: 'Classic Tomato Pasta',
          ingredients: ['pasta', 'tomatoes', 'garlic', 'olive oil', 'basil', 'parmesan cheese', 'salt', 'pepper'],
          prepTime: '20 min',
          servings: 4,
          difficulty: 'Easy' as const,
          instructions: [
            'Boil water and cook pasta according to package directions',
            'Heat olive oil in a large pan',
            'Sauté minced garlic until fragrant',
            'Add diced tomatoes and cook until soft',
            'Season with salt, pepper, and basil',
            'Drain pasta and add to sauce',
            'Toss with grated parmesan cheese',
            'Serve immediately'
          ],
          image: 'https://images.unsplash.com/photo-1662478839788-7d2898ca66cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMHRvbWF0byUyMGJhc2lsfGVufDF8fHx8MTc1NzQ4ODA0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        },
        {
          id: '4',
          name: 'Chicken Stir Fry',
          ingredients: ['chicken', 'broccoli', 'carrots', 'soy sauce', 'garlic', 'ginger', 'rice', 'sesame oil'],
          prepTime: '30 min',
          servings: 4,
          difficulty: 'Medium' as const,
          instructions: [
            'Slice chicken into thin strips',
            'Cut vegetables into bite-sized pieces',
            'Heat oil in a wok or large pan',
            'Stir-fry garlic and ginger for 30 seconds',
            'Add chicken and cook until browned',
            'Add vegetables and stir-fry until tender',
            'Add soy sauce and sesame oil',
            'Serve over cooked rice'
          ],
          image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwc3RpciUyMGZyeXxlbnwxfHx8fDE3NTc0ODgwNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        },
        {
          id: '5',
          name: 'Quinoa Bowl with Veggies',
          ingredients: ['quinoa', 'avocado', 'tomatoes', 'cucumber', 'olive oil', 'lemon juice', 'spinach', 'chickpeas'],
          prepTime: '25 min',
          servings: 2,
          difficulty: 'Easy' as const,
          instructions: [
            'Cook quinoa according to package instructions',
            'Dice tomatoes, cucumber, and avocado',
            'Chop spinach',
            'Drain and rinse chickpeas',
            'Whisk olive oil and lemon juice for dressing',
            'Combine all ingredients in a bowl',
            'Pour dressing over and toss',
            'Serve immediately'
          ],
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWluYWElMjBib3dsfGVufDF8fHx8MTc1NzQ4ODA0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        },
        {
          id: '6',
          name: 'Beef Tacos',
          ingredients: ['ground beef', 'tortillas', 'lettuce', 'tomatoes', 'cheese', 'onion', 'garlic', 'cumin'],
          prepTime: '20 min',
          servings: 4,
          difficulty: 'Easy' as const,
          instructions: [
            'Brown ground beef in a pan',
            'Add diced onion and minced garlic',
            'Season with cumin, salt, and pepper',
            'Warm tortillas',
            'Chop lettuce and tomatoes',
            'Assemble tacos with beef, veggies, and cheese',
            'Serve immediately'
          ],
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwdGFjb3N8ZW58MXx8fHwxNzU3NDg4MDQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        }
      ];

      // Filter recipes based on user's ingredients with flexible matching
      const matchingRecipes = allRecipes
        .map(recipe => {
          const available = recipe.ingredients.filter(ing => {
            const ingLower = ing.toLowerCase();
            return ingredients.some(userIng => {
              const userIngLower = userIng.toLowerCase();
              // Check for partial matches, word overlaps, or exact matches
              return ingLower.includes(userIngLower) || userIngLower.includes(ingLower) ||
                     ingLower.split(' ').some(word => userIngLower.includes(word) || userIngLower.includes(word));
            });
          });
          const missing = recipe.ingredients.filter(ing => !available.includes(ing));
          return { ...recipe, availableIngredients: available, missingIngredients: missing };
        })
        .filter(recipe => recipe.availableIngredients.length > 0) // Only include recipes with at least one matching ingredient
        .sort((a, b) => b.availableIngredients.length - a.availableIngredients.length) // Sort by most matching ingredients
        .slice(0, 3); // Take top 3 matches

      // If no recipes match, return all recipes as suggestions
      if (matchingRecipes.length === 0) {
        const allRecipesWithMatch = allRecipes.map(recipe => ({
          ...recipe,
          availableIngredients: [],
          missingIngredients: recipe.ingredients
        }));
        setGeneratedRecipes(allRecipesWithMatch.slice(0, 3));
      } else {
        setGeneratedRecipes(matchingRecipes);
      }

      setGeneratedRecipes(matchingRecipes);
      setIsGenerating(false);
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-[#4CAF50]/20 text-[#4CAF50] border-[#4CAF50]/30';
      case 'Medium': return 'bg-[#FF6F00]/20 text-[#FF6F00] border-[#FF6F00]/30';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const isFormValid = ingredients.length > 0 && mealType;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#1C1C1C]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#4CAF50]/30">
            <ChefHat className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Recipe <span className="text-[#4CAF50]">Generator</span>
          </h1>
          <p className="text-xl text-[#B0B0B0] leading-relaxed">
            Discover delicious recipes based on ingredients you already have
          </p>
        </div>

        {/* Form Section */}
        <Card className="mb-8 bg-[#2C2C2C] border-gray-700 shadow-xl shadow-black/20 rounded-xl">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-white text-2xl flex items-center gap-3">
              <UtensilsCrossed className="w-6 h-6 text-[#4CAF50]" />
              What's in Your Kitchen?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="space-y-3">
              <Label htmlFor="ingredients" className="text-white font-medium">Available Ingredients</Label>
              <div className="flex gap-3">
                <Input
                  id="ingredients"
                  placeholder="Type an ingredient and press Enter"
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-[#1C1C1C] border-gray-600 text-white placeholder-gray-500 focus:border-[#4CAF50] focus:ring-[#4CAF50]/20 transition-all duration-200"
                />
                <Button 
                  onClick={addIngredient}
                  disabled={!currentIngredient.trim()}
                  className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-6 hover:shadow-lg hover:shadow-[#4CAF50]/30 transition-all duration-200"
                >
                  Add
                </Button>
              </div>
              
              {ingredients.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-6 p-4 bg-[#1C1C1C] rounded-lg border border-gray-700">
                  {ingredients.map((ingredient, index) => (
                    <Badge key={index} className="bg-[#4CAF50]/20 text-[#4CAF50] border border-[#4CAF50]/30 px-3 py-2 text-sm font-medium hover:bg-[#4CAF50]/30 transition-colors duration-200">
                      {ingredient}
                      <button
                        onClick={() => removeIngredient(ingredient)}
                        className="ml-2 hover:bg-[#4CAF50]/20 rounded-full p-0.5 transition-colors duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="meal-type" className="text-white font-medium">Meal Type</Label>
                <Select value={mealType} onValueChange={setMealType}>
                  <SelectTrigger className="bg-[#1C1C1C] border-gray-600 text-white focus:border-[#4CAF50] focus:ring-[#4CAF50]/20">
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2C2C2C] border-gray-600">
                    <SelectItem value="breakfast" className="text-white hover:bg-[#4CAF50]/20">Breakfast</SelectItem>
                    <SelectItem value="lunch" className="text-white hover:bg-[#4CAF50]/20">Lunch</SelectItem>
                    <SelectItem value="dinner" className="text-white hover:bg-[#4CAF50]/20">Dinner</SelectItem>
                    <SelectItem value="snack" className="text-white hover:bg-[#4CAF50]/20">Snack</SelectItem>
                    <SelectItem value="dessert" className="text-white hover:bg-[#4CAF50]/20">Dessert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dietary" className="text-white font-medium">Dietary Preference (Optional)</Label>
                <Select value={dietaryPreference} onValueChange={setDietaryPreference}>
                  <SelectTrigger className="bg-[#1C1C1C] border-gray-600 text-white focus:border-[#4CAF50] focus:ring-[#4CAF50]/20">
                    <SelectValue placeholder="Select dietary preference" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2C2C2C] border-gray-600">
                    <SelectItem value="none" className="text-white hover:bg-[#4CAF50]/20">No Preference</SelectItem>
                    <SelectItem value="vegetarian" className="text-white hover:bg-[#4CAF50]/20">Vegetarian</SelectItem>
                    <SelectItem value="vegan" className="text-white hover:bg-[#4CAF50]/20">Vegan</SelectItem>
                    <SelectItem value="gluten-free" className="text-white hover:bg-[#4CAF50]/20">Gluten-Free</SelectItem>
                    <SelectItem value="keto" className="text-white hover:bg-[#4CAF50]/20">Keto</SelectItem>
                    <SelectItem value="paleo" className="text-white hover:bg-[#4CAF50]/20">Paleo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={generateRecipes}
              disabled={!isFormValid || isGenerating}
              className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-[#4CAF50]/40 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Finding Recipes...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-3" />
                  Generate Recipes
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Recipes Section */}
        {generatedRecipes && (
          <div className="space-y-8">
            <div className="text-center">
              <UtensilsCrossed className="w-16 h-16 text-[#4CAF50] mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-white mb-4">
                Recipe <span className="text-[#4CAF50]">Suggestions</span>
              </h2>
              <p className="text-[#B0B0B0] text-lg">
                Here are some delicious recipes you can make with your ingredients
              </p>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {generatedRecipes.map((recipe) => (
                <Card key={recipe.id} className="bg-[#2C2C2C] border-gray-700 shadow-lg hover:shadow-xl hover:shadow-[#4CAF50]/10 transition-all duration-300 rounded-xl overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <Badge 
                      className={`absolute top-3 right-3 ${getDifficultyColor(recipe.difficulty)} border font-medium`}
                    >
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-xl font-bold">{recipe.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-[#B0B0B0]">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-[#4CAF50]" />
                        {recipe.prepTime}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-[#4CAF50]" />
                        {recipe.servings} servings
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-5">
                    <div>
                      <h4 className="font-semibold text-[#4CAF50] mb-3 flex items-center">
                        <span className="w-2 h-2 bg-[#4CAF50] rounded-full mr-2"></span>
                        Available Ingredients:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {recipe.availableIngredients.map((ingredient, index) => (
                          <Badge key={index} className="bg-[#4CAF50]/20 text-[#4CAF50] text-xs border border-[#4CAF50]/30">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {recipe.missingIngredients.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-[#FF6F00] mb-3 flex items-center">
                          <span className="w-2 h-2 bg-[#FF6F00] rounded-full mr-2"></span>
                          Missing Ingredients:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {recipe.missingIngredients.map((ingredient, index) => (
                            <Badge key={index} className="bg-[#FF6F00]/20 text-[#FF6F00] text-xs border border-[#FF6F00]/30">
                              {ingredient}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-semibold text-white mb-3">Instructions Preview:</h4>
                      <ol className="text-[#B0B0B0] space-y-1 text-sm">
                        {recipe.instructions.slice(0, 3).map((step, index) => (
                          <li key={index} className="flex">
                            <span className="text-[#4CAF50] font-semibold mr-2">{index + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                        {recipe.instructions.length > 3 && (
                          <li className="text-[#FF6F00] font-medium">...and {recipe.instructions.length - 3} more steps</li>
                        )}
                      </ol>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-[#4CAF50]/30 transition-all duration-200"
                          variant="default"
                        >
                          <ChefHat className="w-4 h-4 mr-2" />
                          View Full Recipe
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#2C2C2C] border-gray-700 text-white">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-[#4CAF50] flex items-center gap-3">
                            <ChefHat className="w-6 h-6" />
                            {recipe.name}
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Recipe Image */}
                          <div className="relative">
                            <ImageWithFallback
                              src={recipe.image}
                              alt={recipe.name}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                            <Badge 
                              className={`absolute top-3 right-3 ${getDifficultyColor(recipe.difficulty)} border font-medium`}
                            >
                              {recipe.difficulty}
                            </Badge>
                          </div>

                          {/* Recipe Meta */}
                          <div className="flex items-center gap-6 text-[#B0B0B0]">
                            <div className="flex items-center">
                              <Clock className="w-5 h-5 mr-2 text-[#4CAF50]" />
                              <span className="font-medium">Prep Time:</span> {recipe.prepTime}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-5 h-5 mr-2 text-[#4CAF50]" />
                              <span className="font-medium">Servings:</span> {recipe.servings}
                            </div>
                          </div>

                          {/* Ingredients */}
                          <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-white flex items-center">
                              <UtensilsCrossed className="w-5 h-5 mr-2 text-[#4CAF50]" />
                              Ingredients
                            </h3>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-[#4CAF50] mb-3 flex items-center">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Available ({recipe.availableIngredients.length})
                                </h4>
                                <div className="space-y-2">
                                  {recipe.availableIngredients.map((ingredient, index) => (
                                    <div key={index} className="flex items-center text-[#B0B0B0]">
                                      <CheckCircle className="w-4 h-4 mr-2 text-[#4CAF50]" />
                                      {ingredient}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {recipe.missingIngredients.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-[#FF6F00] mb-3 flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-2" />
                                    Missing ({recipe.missingIngredients.length})
                                  </h4>
                                  <div className="space-y-2">
                                    {recipe.missingIngredients.map((ingredient, index) => (
                                      <div key={index} className="flex items-center text-[#B0B0B0]">
                                        <AlertCircle className="w-4 h-4 mr-2 text-[#FF6F00]" />
                                        {ingredient}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Instructions */}
                          <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-white flex items-center">
                              <Sparkles className="w-5 h-5 mr-2 text-[#4CAF50]" />
                              Instructions
                            </h3>
                            <div className="space-y-3">
                              {recipe.instructions.map((step, index) => (
                                <div key={index} className="flex items-start">
                                  <span className="bg-[#4CAF50] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                                    {index + 1}
                                  </span>
                                  <p className="text-[#B0B0B0] leading-relaxed">{step}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}