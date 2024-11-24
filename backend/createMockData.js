require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./models/User");
const Recipe = require("./models/Recipe");
const Category = require("./models/Category");
const Rating = require("./models/Rating");
const Folder = require("./models/Folder");

const MONGODB_URI = process.env.MONGODB_URI;

const toObjectId = (id) => new mongoose.Types.ObjectId(id);

const mockData = async () => {
  // Connect to MongoDB
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB for seeding mock data");

  await User.deleteMany({});
  await Recipe.deleteMany({});
  await Category.deleteMany({});
  await Rating.deleteMany({});
  await Folder.deleteMany({});

  const users = [
    {
      _id: toObjectId("172a6cca80225447bec329b7"),
      username: "user1",
      email: "user1@gmail.com",
      passwordHash: "sekret",
    },
    {
      _id: toObjectId("272a6cca80225447bec329b7"),
      username: "user2",
      email: "user2@gmail.com",
      passwordHash: "sekret",
    },
    {
      _id: toObjectId("372a6cca80225447bec329b7"),
      username: "user3",
      email: "user3@gmail.com",
      passwordHash: "sekret",
    },
  ];
  await User.insertMany(users);
  console.log("Inserted mock users");

  const recipes = [
    {
      _id: toObjectId("172a70ec86b1909118c87d54"),
      name: "Spaghetti Bolognese",
      description: "A classic Italian pasta dish with a rich and savory sauce.",
      ingredients: [
        "spaghetti",
        "ground beef",
        "tomato sauce",
        "onions",
        "garlic",
        "olive oil",
        "salt",
        "pepper",
      ],
      preparation:
        "Cook spaghetti. Sauté onions and garlic, add ground beef and cook until brown. Add tomato sauce, salt, and pepper. Combine with spaghetti.",
      images: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
      ],
      tags: ["Italian", "pasta", "comfort food"],
      createdBy: toObjectId("172a6cca80225447bec329b7"),
      createdOn: new Date(),
    },
    {
      _id: toObjectId("272a70ec86b1909118c87d54"),
      name: "Chicken Curry",
      description: "A flavorful and spicy chicken curry from South Asia.",
      ingredients: [
        "chicken",
        "curry powder",
        "coconut milk",
        "onions",
        "garlic",
        "ginger",
        "salt",
        "pepper",
      ],
      preparation:
        "Cook onions, garlic, and ginger. Add chicken and curry powder, cook until fragrant. Pour in coconut milk, salt, and pepper. Simmer until chicken is tender.",
      images: [
        "https://example.com/curry1.jpg",
        "https://example.com/curry2.jpg",
      ],
      tags: ["Asian", "spicy", "curry"],
      createdBy: toObjectId("272a6cca80225447bec329b7"),
      createdOn: new Date(),
    },
    {
      _id: toObjectId("372a70ec86b1909118c87d54"),
      name: "Vegetable Stir Fry",
      description: "A quick and healthy stir fry with fresh vegetables.",
      ingredients: [
        "broccoli",
        "bell peppers",
        "carrots",
        "soy sauce",
        "garlic",
        "olive oil",
        "salt",
      ],
      preparation:
        "Heat oil in a pan, sauté garlic. Add vegetables and stir fry with soy sauce until tender-crisp.",
      images: ["https://example.com/veg1.jpg", "https://example.com/veg2.jpg"],
      tags: ["Vegetarian", "quick", "healthy"],
      createdBy: toObjectId("372a6cca80225447bec329b7"),
      createdOn: new Date(),
    },
    {
      _id: toObjectId("472a70ec86b1909118c87d54"),
      name: "Classic Caesar Salad",
      description:
        "A fresh Caesar salad with crispy romaine, croutons, and Parmesan cheese.",
      ingredients: [
        "romaine lettuce",
        "croutons",
        "Parmesan cheese",
        "Caesar dressing",
        "black pepper",
      ],
      preparation:
        "Toss romaine with Caesar dressing. Top with croutons and grated Parmesan, season with black pepper.",
      images: [
        "https://example.com/caesar1.jpg",
        "https://example.com/caesar2.jpg",
      ],
      tags: ["salad", "quick", "vegetarian"],
      createdBy: toObjectId("272a6cca80225447bec329b7"),
      createdOn: new Date(),
    },
    {
      _id: toObjectId("572a70ec86b1909118c87d54"),
      name: "Margarita Pizza",
      description:
        "A simple and delicious Italian pizza topped with fresh tomatoes and basil.",
      ingredients: [
        "pizza dough",
        "tomato sauce",
        "mozzarella cheese",
        "fresh basil",
        "olive oil",
        "salt",
      ],
      preparation:
        "Spread tomato sauce over dough, add mozzarella slices and basil leaves. Drizzle with olive oil and bake.",
      images: [
        "https://example.com/margarita1.jpg",
        "https://example.com/margarita2.jpg",
      ],
      tags: ["Italian", "pizza", "vegetarian"],
      createdBy: toObjectId("272a6cca80225447bec329b7"),
      createdOn: new Date(),
    },
    {
      _id: toObjectId("672a70ec86b1909118c87d54"),
      name: "Avocado Toast",
      description:
        "A trendy and tasty avocado toast, perfect for a quick breakfast.",
      ingredients: [
        "bread",
        "avocado",
        "lemon juice",
        "salt",
        "black pepper",
        "chili flakes",
      ],
      preparation:
        "Toast bread. Mash avocado with lemon juice, salt, and pepper. Spread on toast and sprinkle with chili flakes.",
      images: [
        "https://example.com/avocado1.jpg",
        "https://example.com/avocado2.jpg",
      ],
      tags: ["breakfast", "healthy", "quick"],
      createdBy: toObjectId("172a6cca80225447bec329b7"),
      createdOn: new Date(),
    },
    {
      _id: toObjectId("772a70ec86b1909118c87d54"),
      name: "Lentil Soup",
      description:
        "A hearty and nutritious soup made with lentils and vegetables.",
      ingredients: [
        "lentils",
        "carrots",
        "celery",
        "onions",
        "garlic",
        "vegetable broth",
        "salt",
        "pepper",
      ],
      preparation:
        "Sauté vegetables, add lentils and broth. Simmer until lentils are tender. Season with salt and pepper.",
      images: [
        "https://example.com/lentil1.jpg",
        "https://example.com/lentil2.jpg",
      ],
      tags: ["soup", "vegetarian", "healthy"],
      createdBy: toObjectId("372a6cca80225447bec329b7"),
      createdOn: new Date(),
    },
    {
      _id: toObjectId("872a70ec86b1909118c87d54"),
      name: "Chicken Alfredo Pasta",
      description:
        "A creamy and indulgent pasta dish with chicken and Alfredo sauce.",
      ingredients: [
        "fettuccine",
        "chicken breast",
        "butter",
        "heavy cream",
        "Parmesan cheese",
        "salt",
        "pepper",
      ],
      preparation:
        "Cook pasta and set aside. Sauté chicken, add butter, cream, and cheese to make sauce. Combine with pasta.",
      images: [
        "https://example.com/alfredo1.jpg",
        "https://example.com/alfredo2.jpg",
      ],
      tags: ["Italian", "pasta", "creamy"],
      createdBy: toObjectId("172a6cca80225447bec329b7"),
      createdOn: new Date(),
    },
    {
      _id: toObjectId("972a70ec86b1909118c87d54"),
      name: "Beef Tacos",
      description:
        "Classic Mexican tacos filled with seasoned beef and topped with fresh veggies.",
      ingredients: [
        "ground beef",
        "taco seasoning",
        "tortillas",
        "lettuce",
        "tomatoes",
        "cheddar cheese",
        "sour cream",
      ],
      preparation:
        "Cook beef with taco seasoning. Serve in tortillas with lettuce, tomatoes, cheese, and sour cream.",
      images: [
        "https://example.com/taco1.jpg",
        "https://example.com/taco2.jpg",
      ],
      tags: ["Mexican", "spicy", "comfort food"],
      createdBy: toObjectId("272a6cca80225447bec329b7"),
      createdOn: new Date(),
    },
    {
      _id: toObjectId("a72a70ec86b1909118c87d54"),
      name: "Sushi Rolls",
      description:
        "Homemade sushi rolls filled with fresh fish, rice, and vegetables.",
      ingredients: [
        "sushi rice",
        "nori",
        "salmon",
        "cucumber",
        "avocado",
        "soy sauce",
        "wasabi",
      ],
      preparation:
        "Place rice on nori, add fillings, and roll tightly. Slice and serve with soy sauce and wasabi.",
      images: [
        "https://example.com/sushi1.jpg",
        "https://example.com/sushi2.jpg",
      ],
      tags: ["Japanese", "seafood", "healthy"],
      createdBy: toObjectId("372a6cca80225447bec329b7"),
      createdOn: new Date(),
    },
    {
      _id: toObjectId("b72a70ec86b1909118c87d54"),
      name: "Tomato Basil Soup",
      description:
        "A smooth and comforting tomato soup with a hint of fresh basil.",
      ingredients: [
        "tomatoes",
        "onions",
        "garlic",
        "vegetable broth",
        "basil",
        "olive oil",
        "salt",
        "pepper",
      ],
      preparation:
        "Sauté onions and garlic, add tomatoes and broth. Simmer, then blend until smooth. Garnish with basil.",
      images: [
        "https://example.com/tomato1.jpg",
        "https://example.com/tomato2.jpg",
      ],
      tags: ["soup", "vegetarian", "comfort food"],
      createdBy: toObjectId("172a6cca80225447bec329b7"),
      createdOn: new Date(),
    },
    {
      _id: toObjectId("c72a70ec86b1909118c87d54"),
      name: "Greek Salad",
      description:
        "A refreshing salad with cucumber, tomatoes, olives, and feta cheese.",
      ingredients: [
        "cucumber",
        "tomatoes",
        "red onion",
        "olives",
        "feta cheese",
        "olive oil",
        "oregano",
      ],
      preparation:
        "Combine all ingredients, drizzle with olive oil, and season with oregano.",
      images: [
        "https://example.com/greek1.jpg",
        "https://example.com/greek2.jpg",
      ],
      tags: ["salad", "Mediterranean", "healthy"],
      createdBy: toObjectId("272a6cca80225447bec329b7"),
      createdOn: new Date(),
    },
    {
      _id: toObjectId("d72a70ec86b1909118c87d54"),
      name: "Pancakes",
      description: "Fluffy pancakes perfect for a weekend breakfast.",
      ingredients: [
        "flour",
        "milk",
        "egg",
        "sugar",
        "butter",
        "baking powder",
        "salt",
        "maple syrup",
      ],
      preparation:
        "Mix all ingredients, cook on a griddle until golden brown. Serve with butter and maple syrup.",
      images: [
        "https://example.com/pancakes1.jpg",
        "https://example.com/pancakes2.jpg",
      ],
      tags: ["breakfast", "sweet", "quick"],
      createdBy: toObjectId("372a6cca80225447bec329b7"),
      createdOn: new Date(),
    },
  ];
  await Recipe.insertMany(recipes);
  console.log("Inserted mock recipes");

  const categories = [
    {
      name: "Italian",
      recipes: [
        toObjectId("172a70ec86b1909118c87d54"), // Spaghetti Bolognese
        toObjectId("572a70ec86b1909118c87d54"), // Margarita Pizza
        toObjectId("872a70ec86b1909118c87d54"), // Chicken Alfredo Pasta
      ],
    },
    {
      name: "Asian",
      recipes: [
        toObjectId("272a70ec86b1909118c87d54"), // Chicken Curry
        toObjectId("372a70ec86b1909118c87d54"), // Vegetable Stir Fry
        toObjectId("a72a70ec86b1909118c87d54"), // Sushi Rolls
      ],
    },
    {
      name: "Mexican",
      recipes: [
        toObjectId("972a70ec86b1909118c87d54"), // Beef Tacos
      ],
    },
    {
      name: "Vegetarian",
      recipes: [
        toObjectId("372a70ec86b1909118c87d54"), // Vegetable Stir Fry
        toObjectId("472a70ec86b1909118c87d54"), // Classic Caesar Salad
        toObjectId("672a70ec86b1909118c87d54"), // Avocado Toast
        toObjectId("b72a70ec86b1909118c87d54"), // Tomato Basil Soup
        toObjectId("c72a70ec86b1909118c87d54"), // Greek Salad
      ],
    },
    {
      name: "Healthy",
      recipes: [
        toObjectId("372a70ec86b1909118c87d54"), // Vegetable Stir Fry
        toObjectId("672a70ec86b1909118c87d54"), // Avocado Toast
        toObjectId("772a70ec86b1909118c87d54"), // Lentil Soup
        toObjectId("a72a70ec86b1909118c87d54"), // Sushi Rolls
        toObjectId("c72a70ec86b1909118c87d54"), // Greek Salad
      ],
    },
    {
      name: "Comfort Food",
      recipes: [
        toObjectId("172a70ec86b1909118c87d54"), // Spaghetti Bolognese
        toObjectId("972a70ec86b1909118c87d54"), // Beef Tacos
        toObjectId("b72a70ec86b1909118c87d54"), // Tomato Basil Soup
      ],
    },
    {
      name: "Breakfast",
      recipes: [
        toObjectId("672a70ec86b1909118c87d54"), // Avocado Toast
        toObjectId("d72a70ec86b1909118c87d54"), // Pancakes
      ],
    },
    {
      name: "Soup",
      recipes: [
        toObjectId("772a70ec86b1909118c87d54"), // Lentil Soup
        toObjectId("b72a70ec86b1909118c87d54"), // Tomato Basil Soup
      ],
    },
    {
      name: "Quick",
      recipes: [
        toObjectId("472a70ec86b1909118c87d54"), // Classic Caesar Salad
        toObjectId("672a70ec86b1909118c87d54"), // Avocado Toast
        toObjectId("c72a70ec86b1909118c87d54"), // Greek Salad
        toObjectId("d72a70ec86b1909118c87d54"), // Pancakes
      ],
    },
  ];

  await Category.insertMany(categories);
  console.log("Inserted mock categories");

  const ratings = [
    {
      userId: toObjectId("172a6cca80225447bec329b7"),
      recipeId: toObjectId("172a70ec86b1909118c87d54"),
      value: 5,
      timestamp: new Date(),
    },
  ];

  await Rating.insertMany(ratings);

  const folders = [
    {
      name: "Folder 1",
      usersId: [toObjectId("172a6cca80225447bec329b7")],
      recipes: [
        toObjectId("172a70ec86b1909118c87d54"),
        toObjectId("372a70ec86b1909118c87d54"),
      ],
    },
    {
      name: "Folder 2",
      usersId: [toObjectId("172a6cca80225447bec329b7")],
      recipes: [
        toObjectId("172a70ec86b1909118c87d54"),
        toObjectId("372a70ec86b1909118c87d54"),
      ],
    },
    {
      name: "Folder 3",
      usersId: [toObjectId("172a6cca80225447bec329b7")],
      recipes: [
        toObjectId("172a70ec86b1909118c87d54"),
        toObjectId("372a70ec86b1909118c87d54"),
      ],
    },
    {
      name: "Folder 4",
      usersId: [toObjectId("172a6cca80225447bec329b7")],
      recipes: [
        toObjectId("172a70ec86b1909118c87d54"),
        toObjectId("372a70ec86b1909118c87d54"),
      ],
    },
  ];

  await Folder.insertMany(folders);

  // Close the connection
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB after seeding");
};

// Run the script
mockData().catch((err) => {
  console.error("Error seeding data:", err);
  mongoose.disconnect();
});
