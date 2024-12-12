[![Netlify Status](https://api.netlify.com/api/v1/badges/fd87a029-10ad-4ef8-9ed6-e42d74cc7039/deploy-status)](https://app.netlify.com/sites/forkiiffyy/deploys)

# 🌦 Forkify: A Recipe Search and Bookmarking App

**Forkify** is a JavaScript-powered recipe application that allows users to search, view, bookmark, and add their own recipes. Built with modern JavaScript features and following the MVC architecture pattern.

---

## 🌟 Features

- **Recipe Search**  
  Search over 1,000,000 recipes using the [Forkify API](https://forkify-api.herokuapp.com/v2)

- **Recipe Details**  
  View detailed cooking instructions, ingredients, and serving sizes with automatic quantity recalculation

- **Bookmarking System**  
  Save your favorite recipes with a persistent bookmarking feature using localStorage

- **Recipe Upload**  
  Add and share your own recipes with the community

- **Pagination**  
  Browse search results with an intuitive pagination system

- **Recipe Servings**  
  Adjust ingredient quantities based on desired number of servings

---

## 🛠️ Technologies Used

- **JavaScript (ES6+)**  
  Leveraging modern features like classes, modules, promises, and async/await

- **Parcel**  
  For bundling and development build process

- **MVC Architecture**  
  Organized with Model-View-Controller pattern for maintainable code structure

- **LocalStorage API**  
  For persistent bookmarking functionality

- **Forkify API**  
  External API for recipe data

---

## 📂 File Structure
- `controller.js`: Main controller connecting model and views
- `model.js`: Data handling and business logic
- `views/`: View components for UI rendering
  - `recipeView.js`: Recipe details view
  - `searchView.js`: Search functionality view
  - `resultsView.js`: Search results view
  - `bookmarksView.js`: Bookmarks view
  - `paginationView.js`: Pagination controls
  - `addRecipeView.js`: Recipe upload form

---

### Key Components

- **Controller**  
  Handles:
  - Recipe loading and rendering
  - Search functionality
  - Bookmarking operations
  - Recipe upload
  - Pagination
  - Servings updates

- **Model**  
  Manages:
  - State management
  - API interactions
  - Data processing
  - Local storage operations

- **Views**  
  Handle:
  - UI rendering
  - User input
  - Event handling
  - DOM updates

---

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Build for production: `npm run build`

---

## 🤝 Contributing
Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 📝 Credits
This project was created as part of Jonas Schmedtmann's JavaScript course. Design and functionality specifications were provided by Jonas Schmedtmann.
