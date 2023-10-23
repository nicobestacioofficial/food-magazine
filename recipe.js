// recipes.js

document.addEventListener("DOMContentLoaded", function () {
  const recipeDetailsDiv = document.getElementById("recipe-details");

  // Replace this with your actual recipe data or an API call
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
      name: "Spaghetti",
      category: "Pasta",
      ingredients: [
        { name: "Tomato Saauce", measurement: "900ml" },
        { name: "Pasta", measurement: "1 kilo" },
        { name: "Cheeze", measurement: "2 pcs" },
        { name: "Hotdog", measurement: "1/2 kilo" },
      ],
    },
  ];

  // Loop through the recipes array and create HTML content
  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    const recipeHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Category:</strong> ${recipe.category}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        ${recipe.ingredients
          .map(
            (ingredient) =>
              `<li>${ingredient.name} (${ingredient.measurement})</li>`
          )
          .join("")}
      </ul>
    `;

    recipeCard.innerHTML = recipeHTML;
    recipeDetailsDiv.appendChild(recipeCard);
  });
});
