// Recipe data
const recipes = [
  {
    name: "Chilli Hotdog",
    category: "Burgers",
    ingredients: [
      { name: "Hotdog", measurement: "110 grams" },
      { name: "Bread", measurement: "1 pcs" },
      { name: "Chilli Beef", measurement: "1 sachet" },
    ],
  },
  {
    name: "Cheeze Burger",
    category: "Burgers",
    ingredients: [
      { name: "Patty", measurement: "110 grams" },
      { name: "Bread", measurement: "1 pcs" },
      { name: "Cheeze", measurement: "2 pcs" },
    ],
  },
  {
    name: "Spaghetti",
    category: "Pasta",
    ingredients: [
      { name: "Tomato Sauce", measurement: "900ml" },
      { name: "Pasta", measurement: "1 kilo" },
      { name: "Cheeze", measurement: "2 pcs" },
      { name: "Hotdog", measurement: "1/2 kilo" },
    ],
  },
];

// Function to display a recipe
function displayRecipe(recipeIndex) {
  const recipe = recipes[recipeIndex - 1];
  const recipeCard = document.getElementById(`recipe-card-${recipeIndex}`);
  if (recipeCard) {
    recipeCard.style.display = 'block'; // Ensure the card is visible
    recipeCard.querySelector(".recipe-name").textContent = recipe.name;
    recipeCard.querySelector(".category").textContent = `Category: ${recipe.category}`;
    const ingredientsList = recipeCard.querySelector(".ingredient-measurement");
    ingredientsList.textContent = `Ingredients: ${recipe.ingredients
      .map((ingredient) => `${ingredient.name} (${ingredient.measurement})`)
      .join(", ")}`;
  }
}

// Function to create a new recipe
function createNewRecipe() {
  // Prompt for recipe details
  const newRecipeName = prompt("Enter the new recipe name:");
  const newCategory = prompt("Enter the category:");
  const newIngredients = prompt("Enter the ingredients (comma-separated):");

  // Create a new recipe object
  const newRecipe = {
    name: newRecipeName,
    category: newCategory,
    ingredients: newIngredients.split(",").map((item) => {
      const parts = item.trim().split("(");
      if (parts.length === 2) {
        return { name: parts[0].trim(), measurement: `(${parts[1]}` };
      }
      return { name: item.trim(), measurement: "" };
    }),
  };

  // Add the new recipe to the recipes array
  recipes.push(newRecipe);

  // Create and display the new recipe card
  addRecipeCard(newRecipe);

  // Automatically add the new category to the filter dropdown
  const filterCategory = document.getElementById("filter-category");
  const optionExists = Array.from(filterCategory.options).some(
    (option) => option.value === newCategory
  );
  if (!optionExists && newCategory) {
    const newOption = document.createElement("option");
    newOption.value = newCategory;
    newOption.text = newCategory;
    filterCategory.add(newOption);
  }

  // Move the "Create Recipe" button below the new recipe card
  const recipeContainer = document.querySelector(".recipe-container");
  recipeContainer.appendChild(document.getElementById("create-recipe-btn"));
}

// Function to add a new recipe card
function addRecipeCard(recipe) {
  const recipeContainer = document.querySelector(".recipe-container");

  // Create a new recipe card
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("recipe-card");
  recipeCard.id = `recipe-card-${recipes.length}`;

  // Create the HTML content for the recipe card
  recipeCard.innerHTML = `
    <div class="recipe-name">${recipe.name}</div>
    <div class="category">${`Category: ${recipe.category}`}</div>
    <div class="ingredient-measurement">${`Ingredients: ${recipe.ingredients
      .map((ingredient) => `${ingredient.name} (${ingredient.measurement})`)
      .join(", ")}`}</div>
    <div class="crud-buttons">
      <button onclick="editRecipe(${recipes.length})">Edit</button>
      <button onclick="deleteRecipe(${recipes.length})">Delete</button>
    </div>
  `;

  // Append the new recipe card to the recipe container
  recipeContainer.appendChild(recipeCard);
}

// Function to edit a recipe
function editRecipe(recipeIndex) {
  const recipe = recipes[recipeIndex - 1];
  if (recipe) {
    const updatedRecipeName = prompt("Edit Recipe Name:", recipe.name);
    const updatedCategory = prompt("Edit Category:", recipe.category);
    const updatedIngredients = prompt(
      "Edit Ingredients:",
      recipe.ingredients
        .map(
          (ingredient) =>
            `${ingredient.name} (${ingredient.measurement})`
        )
        .join(", ")
    );

    if (updatedRecipeName && updatedCategory && updatedIngredients) {
      recipe.name = updatedRecipeName;
      recipe.category = updatedCategory;
      recipe.ingredients = updatedIngredients.split(",").map((item) => {
        const parts = item.trim().split("(");
        if (parts.length === 2) {
          return { name: parts[0].trim(), measurement: `(${parts[1]}` };
        }
        return { name: item.trim(), measurement: "" };
      });
      displayRecipe(recipeIndex);
    }
  }
}

// Function to delete a recipe
function deleteRecipe(recipeIndex) {
  if (confirm("Are you sure you want to delete this recipe?")) {
    recipes.splice(recipeIndex - 1, 1);
    const recipeCard = document.getElementById(`recipe-card-${recipeIndex}`);
    if (recipeCard) {
      recipeCard.remove();
    }

    // Remove the deleted category from the filter dropdown
    const filterCategory = document.getElementById("filter-category");
    const selectedCategory = filterCategory.value;
    if (selectedCategory === "All" || selectedCategory === recipes[recipeIndex - 1].category) {
      filterCategory.value = ""; // Reset the filter to "All"
      filterRecipesByCategory(""); // Display all recipes
    }
  }
}

// Filter and Search Functions
function filterRecipesByCategory(category) {
  recipes.forEach((recipe, index) => {
    const recipeCard = document.getElementById(`recipe-card-${index + 1}`);
    if (recipeCard) {
      if (!category || category === "All" || recipe.category === category) {
        recipeCard.style.display = 'block';
      } else {
        recipeCard.style.display = 'none';
      }
    }
  });
}

// Function to reset the filter
function resetFilter() {
  const filterCategory = document.getElementById('filter-category');
  filterCategory.value = "All"; // Reset the dropdown to "All"
  displayAllRecipes();
}


// Event listener for filter
const filterCategory = document.getElementById('filter-category');

filterCategory.addEventListener('change', function () {
  const selectedCategory = filterCategory.value;
  if (selectedCategory === "All") {
    // If "All" is selected, display all recipes
    displayAllRecipes();
  } else {
    filterRecipesByCategory(selectedCategory);
  }
});

// Event listener for "Check Recipe" button
const checkRecipeButton = document.getElementById('check-recipe-button');

checkRecipeButton.addEventListener('click', function () {
  displayRecipe();
});

// Initial display for all recipes
displayAllRecipes();

// Update the filterCategory optionExists check when creating a new recipe
if (!optionExists && newCategory) {
  const newOption = document.createElement("option");
  newOption.value = newCategory;
  newOption.text = newCategory;
  filterCategory.add(newOption);
  filterCategory.value = newCategory; // Set the selected filter category
  filterRecipesByCategory(newCategory); // Display recipes of the new category
}