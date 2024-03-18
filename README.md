# Angular Recipe Management System

This Angular project is a recipe management system that allows users to manage recipes, categories, and user authentication.

## User Class
- Properties: code, name, address, email, password

## Category Class
- Properties: code, name, iconRoute

## Recipe Class
- Properties: recipeCode, recipeName, categoryCode, preparationTime, difficultyLevel, creationDate, ingredientsList, preparationSteps, userCode, image

## Features
- User authentication through login and registration components
- Display all recipes using the AllRecipes component
- Add new recipes with the AddRecipe component
- View and edit individual recipe details in the RecipeDetails component
- Implement filtering for recipes based on name, category, and preparation time
- Styling using Bootstrap and custom sCSS and swwetAlert and angularMaterial
- Store images in the assets folder
- API calls for user and recipe services

## Setup
1. Clone the repository
2. Install dependencies with `npm install`
3. Run the project with `ng serve`

## Additional Notes
- Ensure valid input in all forms and prevent submission of invalid forms
- Utilize SweetAlert for user-friendly notifications
- Implement session storage for current user details
- Use custom filters and styling for enhanced user experience

## Build
To build the project for production, run `ng build`.

Good luck with your project development!
