// react async function to get recipes from api
export async function getPopularRecipesAsync() {
  const spoonacularApiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${
    import.meta.env.VITE_RECIPE_API_KEY
  }&number=10`;
  const response = await fetch(spoonacularApiUrl);
  const data = await response.json();
  return data;
}
