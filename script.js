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
        console.log({meal})
        const mealDiv = document.createElement("div");
        mealDiv.classList.add("meal");

        const image = document.createElement("img");
        image.src = meal.strMealThumb        ;
        image.alt = meal.strMeal        ;
        mealDiv.appendChild(image);

        const name = document.createElement("h3");
        name.textContent = meal.strMeal        ;
        mealDiv.appendChild(name);

        const category = document.createElement("p");
        category.textContent = `Category: ${meal.strCategory        }`;
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
