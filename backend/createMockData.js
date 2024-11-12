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
      ratings: [5, 4, 5, 3, 4],
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
      ratings: [4, 5, 4, 4, 5],
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
      images: [
        "https://example.com/veg1.jpg",
        "https://example.com/veg2.jpg",
      ],
      tags: ["Vegetarian", "quick", "healthy"],
      ratings: [5, 5, 4, 3, 4],
      createdBy: toObjectId("372a6cca80225447bec329b7"),
      createdOn: new Date(),
    },
  ];
  await Recipe.insertMany(recipes);
  console.log("Inserted mock recipes");

  const categories = [
    { name: "Italian", recipes: [toObjectId("172a70ec86b1909118c87d54")] },
    {
      name: "Asian",
      recipes: [
        toObjectId("272a70ec86b1909118c87d54"),
        toObjectId("372a70ec86b1909118c87d54"),
      ],
    },
    { name: "Vegetarian", recipes: [toObjectId("372a70ec86b1909118c87d54")] },
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
      userId: toObjectId("172a6cca80225447bec329b7"),
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
