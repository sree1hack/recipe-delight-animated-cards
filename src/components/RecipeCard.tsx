
import { useState, useEffect } from "react";
import { Clock, Users, ChefHat, Play, SkipForward, Eye, EyeOff, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const RecipeCard = () => {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCooking, setIsCooking] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(90 * 60); // 90 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  const recipe = {
    title: "Classic Chocolate Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
    prepTime: "30 min",
    cookTime: "60 min",
    totalTime: "90 min",
    servings: 8,
    ingredients: [
      "2 cups all-purpose flour",
      "2 cups granulated sugar",
      "3/4 cup cocoa powder",
      "2 teaspoons baking soda",
      "1 teaspoon baking powder",
      "1 teaspoon salt",
      "2 large eggs",
      "1 cup buttermilk",
      "1 cup strong black coffee (cooled)",
      "1/2 cup vegetable oil",
      "1 teaspoon vanilla extract"
    ],
    steps: [
      "Preheat your oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.",
      "In a large bowl, whisk together flour, sugar, cocoa powder, baking soda, baking powder, and salt.",
      "In another bowl, beat eggs and then whisk in buttermilk, coffee, oil, and vanilla extract.",
      "Pour the wet ingredients into the dry ingredients and mix until just combined.",
      "Divide the batter evenly between the prepared pans.",
      "Bake for 28-32 minutes, or until a toothpick inserted in the center comes out clean.",
      "Cool in pans for 10 minutes, then turn out onto wire racks to cool completely.",
      "Frost with your favorite chocolate frosting and enjoy!"
    ]
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const startCooking = () => {
    setIsCooking(true);
    setCurrentStep(0);
    setShowSteps(true);
    setTimerActive(true);
  };

  const nextStep = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const progressPercentage = isCooking ? ((currentStep + 1) / recipe.steps.length) * 100 : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      {/* Header */}
      <CardHeader className="text-center space-y-4 pb-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">{recipe.title}</h2>
        
        {/* Recipe Image */}
        <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl shadow-lg group">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Recipe Info */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
            <Clock className="w-4 h-4" />
            {recipe.totalTime}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
            <Users className="w-4 h-4" />
            {recipe.servings} servings
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
            <ChefHat className="w-4 h-4" />
            Intermediate
          </Badge>
        </div>

        {/* Timer Display */}
        {timerActive && (
          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-4 border border-orange-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Time Remaining</p>
              <p className="text-2xl font-mono font-bold text-orange-600">
                {formatTime(timeRemaining)}
              </p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {isCooking && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Cooking Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={() => setShowIngredients(!showIngredients)}
            variant="outline"
            className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
          >
            {showIngredients ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showIngredients ? "Hide" : "Show"} Ingredients
          </Button>
          
          <Button
            onClick={() => setShowSteps(!showSteps)}
            variant="outline"
            className="flex items-center gap-2 hover:bg-green-50 transition-colors"
          >
            {showSteps ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showSteps ? "Hide" : "Show"} Steps
          </Button>

          <Button
            onClick={handlePrint}
            variant="outline"
            className="flex items-center gap-2 hover:bg-gray-50 transition-colors print:hidden"
          >
            <Printer className="w-4 h-4" />
            Print Recipe
          </Button>
        </div>

        {/* Ingredients Section */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showIngredients ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              Ingredients
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li 
                  key={index}
                  className="flex items-center p-2 rounded hover:bg-white/50 transition-colors duration-200 group cursor-pointer"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-600 transition-colors" />
                  <span className="group-hover:text-blue-800 transition-colors">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Steps Section */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showSteps ? "max-h-none opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-xl font-semibold mb-4 text-green-800 flex items-center gap-2">
              <Play className="w-5 h-5" />
              Instructions
            </h3>
            <div className="space-y-3">
              {recipe.steps.map((step, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${
                    isCooking && index === currentStep
                      ? "bg-yellow-100 border-yellow-400 shadow-md scale-[1.02]"
                      : isCooking && index < currentStep
                      ? "bg-green-100 border-green-400 opacity-75"
                      : "bg-white/50 border-gray-300 hover:bg-white/80"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCooking && index === currentStep
                        ? "bg-yellow-400 text-yellow-800"
                        : isCooking && index < currentStep
                        ? "bg-green-400 text-green-800"
                        : "bg-gray-300 text-gray-600"
                    }`}>
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cooking Controls */}
        <div className="flex flex-wrap gap-3 justify-center pt-4">
          {!isCooking ? (
            <Button 
              onClick={startCooking}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Cooking
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button 
                onClick={nextStep}
                disabled={currentStep >= recipe.steps.length - 1}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SkipForward className="w-4 h-4 mr-2" />
                Next Step
              </Button>
              
              <Button 
                onClick={() => {
                  setIsCooking(false);
                  setCurrentStep(0);
                  setTimerActive(false);
                  setTimeRemaining(90 * 60);
                }}
                variant="outline"
                className="px-6 py-2 font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
              >
                Reset
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
