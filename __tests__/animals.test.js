const fs = require("fs");

const {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal,
} = require("../lib/animals.js");
const { animals } = require("../data/animals");

jest.mock('fs');

test("creates an animal object", () => {
    const animal = createNewAnimal(
      { name: "Nala", id: "25" },
      animals
    );

    expect(animal.name).toBe("Nala");
    expect(animal.id).toBe("25");
  });

  test("filters by query", () => {
    const startingAnimals = [
        {
            "id": "3",
            "name": "Noel",
            "species": "bear",
            "diet": "omnivore",
            "personalityTraits": [
              "impish",
              "sassy",
              "brave"
            ]
          },
          {
            "id": "4",
            "name": "Coco",
            "species": "penguin",
            "diet": "piscivore",
            "personalityTraits": [
              "loving",
              "goofy"
            ]
          },
    ];

const updatedAnimals = filterByQuery({ species: "bear"}, startingAnimals);

expect(updatedAnimals.length).toEqual(1);
});

test("finds by id", () => {
    const startingAnimals = [
        {
            "id": "3",
            "name": "Noel",
            "species": "bear",
            "diet": "omnivore",
            "personalityTraits": [
              "impish",
              "sassy",
              "brave"
            ]
          },
          {
            "id": "4",
            "name": "Coco",
            "species": "penguin",
            "diet": "piscivore",
            "personalityTraits": [
              "loving",
              "goofy"
            ]
          },
    ];
    const result = findById("3", startingAnimals);

    expect(result.name).toBe("Noel");
  });

test("validates personality traits", () => {
    const animal = {
      id: "3",
      name: "Noel",
      species: "bear",
      diet: "omnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    };

    const invalidAnimal = {
      id: "3",
      name: "Noel",
      species: "bear",
      diet: "omnivore",
    };

    const result = validateAnimal(animal);
    const result2 = validateAnimal(invalidAnimal);

    expect(result).toBe(true);
    expect(result2).toBe(false);
  });