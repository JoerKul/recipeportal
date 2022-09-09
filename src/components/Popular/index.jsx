import React from "react";
import { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styled from "styled-components";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const popularRecipes = JSON.parse(localStorage.getItem("popularRecipes"));

    if (popularRecipes) {
      setPopular(popularRecipes.recipes);
    } else {
      getPopularRecipesAsync().then((data) => {
        setPopular(data.recipes);
        localStorage.setItem("popularRecipes", JSON.stringify(data));
      });
    }
  }, []);

  async function getPopularRecipesAsync() {
    const spoonacularApiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${
      import.meta.env.VITE_RECIPE_API_KEY
    }&number=12`;
    const response = await fetch(spoonacularApiUrl);
    const data = await response.json();
    return data;
  }

  return (
    <Wrapper>
      <h3>Popular Picks</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: true,
          drag: "free",
          breakpoints: {
            1200: { perPage: 4 },
            800: { perPage: 2 },
            640: { perPage: 1 },
          },
        }}
      >
        {popular.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Card>
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} />
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  max-height: 20rem;
  background-color: #fddf33;
  border-radius: 2rem;
  margin: 1rem;

  position: relative;

  img {
    border-radius: 2rem;
    width: 100%;
    object-fit: cover;
  }

  h3 {
    font-size: 1.1rem;
    height: 40%;
    width: 100%;
    text-align: center;
    color: #f5f5f5;
    font-weight: 400;
    margin: 0;
    padding: 1rem;
    position: absolute;
    left: 50%;
    top: 80%;
    transform: translate(-50%, -50%);
  }
`;

export default Popular;
