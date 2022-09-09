import React from "react";
import { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styled from "styled-components";

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    const veggieRecipes = JSON.parse(localStorage.getItem("veggieRecipes"));

    if (veggieRecipes) {
      setVeggie(veggieRecipes.results);
    } else {
      getPopularRecipesAsync().then((data) => {
        setVeggie(data.results);
        localStorage.setItem("veggieRecipes", JSON.stringify(data));
        console.log("stored veggie recipes" + JSON.stringify(data));
      });
    }
  }, []);

  async function getPopularRecipesAsync() {
    const spoonacularApiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
      import.meta.env.VITE_RECIPE_API_KEY
    }&diet=vegetarian&number=7`;
    const response = await fetch(spoonacularApiUrl);
    const data = await response.json();
    return data;
  }

  return (
    <Wrapper>
      <h3>Popular Vegetarian</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: "free",
          breakpoints: {
            1200: { perPage: 4 },
            800: { perPage: 2 },
            640: { perPage: 1 },
          },
        }}
      >
        {veggie.map((recipe) => {
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
  border-radius: 2rem;
  margin: 1rem;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    border-radius: 2rem;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(90, 90, 90, 0.1) 100%
    );
  }

  img {
    border-radius: 2rem;
    width: 100%;
    object-fit: cover;
  }

  h3 {
    font-size: 1.1rem;
    text-align: center;
    height: 40%;
    width: 100%;
    color: #fff;
    font-weight: 400;
    margin: 0;
    padding: 1rem;
    position: absolute;
    left: 50%;
    top: 80%;
    transform: translate(-50%, -50%);
  }
`;

export default Veggie;
