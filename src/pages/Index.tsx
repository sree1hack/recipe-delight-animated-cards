
import RecipeCard from "@/components/RecipeCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Interactive Recipe Collection
        </h1>
        <RecipeCard />
      </div>
    </div>
  );
};

export default Index;
