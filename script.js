const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const mealList = document.getElementById("mealList");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value;
  searchMeals(searchTerm);
});

function searchMeals() {
  // Clear previous search results
  const searchTerm = document.getElementById("searchInput").value;
  console.log("searchTerm", searchTerm);
  mealList.innerHTML = "";

  // Fetch meal data using search term
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      console.log({ data });
      // Iterate over the meal data and display the meals
      data?.meals?.forEach((meal) => {
        // console.log({ meal });
        const mealDiv = document.createElement("div");
        mealDiv.classList.add("meal");

        // const iconDiv = document.createElement("div");
        const favBtn = document.createElement("button");

        const favoritesItem = localStorage.getItem("favorites");
        const parseFavorites = JSON.parse(favoritesItem);
        console.log({ favoritesItem, parseFavorites });

        //favorite button style
        if (parseFavorites && parseFavorites.includes(meal.idMeal)) {
          favBtn.textContent = "Remove Favorite";
          favBtn.classList.add("solid");
        } else {
          favBtn.textContent = "Favorite";
          favBtn.classList.add("thin");
        }
        mealDiv.appendChild(favBtn);

        //check if favorites are in local storage

        favBtn.addEventListener("click", () => {
          var favorites = localStorage.getItem("favorites");
          if (favorites) {
            favorites = JSON.parse(favorites);
            if (favorites.includes(meal.idMeal)) {
              favorites = favorites.filter(function (id) {
                favBtn.textContent = "Favorite";
                favBtn.classList.remove("solid");
                favBtn.classList.add("thin");
                return id !== meal.idMeal;
              });
            } else {
              // Item is not in favorites, add it
              favorites.push(meal.idMeal);
              favBtn.textContent = "Remove Favorite";
              favBtn.classList.remove("thin");
              favBtn.classList.add("solid");
            }
          } else {
            // No favorites yet, create a new array with the item
            favorites = [meal.idMeal];
            favBtn.textContent = "Remove Favorite";
            favBtn.classList.remove("thin");
            favBtn.classList.add("solid");
          }

          // Save the updated favorites back to localStorage

          localStorage.setItem("favorites", JSON.stringify(favorites));
        });

        const image = document.createElement("img");
        image.src = meal.strMealThumb;
        image.alt = meal.strMeal;
        mealDiv.appendChild(image);

        const name = document.createElement("h3");
        name.textContent = meal.strMeal;
        mealDiv.appendChild(name);

        const category = document.createElement("p");
        category.textContent = `Category: ${meal.strCategory}`;
        mealDiv.appendChild(category);

        const instructions = document.createElement("p");
        instructions.textContent = `Instructions: ${meal.strInstructions}`;
        mealDiv.appendChild(instructions);

        mealList.appendChild(mealDiv);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const favoritesList = () => {
  const favoriteArray = [];
  console.log("test fav");
  const mealDiv = document.createElement("div");

  const favoritesData = localStorage.getItem("favorites");
  console.log({ favoritesData });
  mealList.innerHTML = "";
  const parseFavoritesData = JSON.parse(favoritesData) || [];
  console.log({ parseFavoritesData });

  if (!parseFavoritesData.length) {
    console.log("no fav");
    const noFav = document.createElement("h3");
    noFav.textContent = "You have no favorite meals";
    mealDiv.appendChild(noFav);
    mealList.appendChild(mealDiv);
    console.log("no fav h3", noFav);
    return;
  }

  parseFavoritesData.forEach((mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => response.json())
      .then((data) => {
        // favoriteArray.push(data.meals[0]);

        const mealDiv = document.createElement("div");
        mealDiv.classList.add("meal");

        const image = document.createElement("img");
        image.src = data.meals[0].strMealThumb;
        image.alt = data.meals[0].strMeal;
        mealDiv.appendChild(image);

        const name = document.createElement("h3");
        name.textContent = data.meals[0].strMeal;
        mealDiv.appendChild(name);

        const category = document.createElement("p");
        category.textContent = `Category: ${data.meals[0].strCategory}`;
        mealDiv.appendChild(category);

        const instructions = document.createElement("p");
        instructions.textContent = `Instructions: ${data.meals[0].strInstructions}`;
        mealDiv.appendChild(instructions);

        mealList.appendChild(mealDiv);
      });
  });

  console.log("favoriteArray", favoriteArray);

  // favoriteArray?.forEach((meal) => {
  //   console.log({ meal });
  //   const mealDiv = document.createElement("div");
  //   mealDiv.classList.add("meal");

  //   const image = document.createElement("img");
  //   image.src = meal.strMealThumb;
  //   image.alt = meal.strMeal;
  //   mealDiv.appendChild(image);

  //   const name = document.createElement("h3");
  //   name.textContent = meal.strMeal;
  //   mealDiv.appendChild(name);

  //   const category = document.createElement("p");
  //   category.textContent = `Category: ${meal.strCategory}`;
  //   mealDiv.appendChild(category);

  //   const instructions = document.createElement("p");
  //   instructions.textContent = `Instructions: ${meal.strInstructions}`;
  //   mealDiv.appendChild(instructions);

  //   mealList.appendChild(mealDiv);
  // });
};
