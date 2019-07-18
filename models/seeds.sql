
-------------------------------
-- RECIPES TABLE -- 
-------------------------------
SELECT * FROM dbPantryAssembler.Recipes;

USE dbPantryAssembler;


INSERT INTO Recipes
    (name, description, instructions, createdAt, updatedAt)
VALUES
    ('Parmesan Crusted Pork Chops', 'Unique variation to classic pork chops',
        'Preheat over to 350 degrees. Whisk egg in a shallow bowl. Mix 1/4 cup grated Parmesan 
cheese and 1 teaspoon Cajun seasoning together on plate. Dip each pork chop into egg.
Press until coated on both sides. Baked in preheated overn until golden for 35 to
40 minutes.', now(), now());

INSERT INTO Recipes
    (name, description, instructions, createdAt, updatedAt)
VALUES
    ('Melt-In-Your-Mouth Dark Chocolate', 'Quick and easy sweet treat',
        'Gently melt coconut oil in a saucepan over medium-low heat. Stir 1/2 cup cocoa powder, 3 tablespoons
honey, and 1/2 teaspoon vanilla extract into melted oil until well blended. Pour mixture into a tray.
Refrigerate until chilled', now(), now());

INSERT INTO Recipes
    (name, description, instructions, createdAt, updatedAt)
VALUES
    ('Kale and Quinoa Salad', 'Stay healthy with this delicious salad', 'Stir 1 cup quinoa into boiling water reduce heat to medium-low, place cover on saucepan, and 
cook until water absorbs into the quinoa, about 12 minutes. Remove saucepan from heat and let cool.
Put kale in  mixing bowl. Whisk olive oil, lemon juice, Dijon mustard, garlic, pepper, and salt 
together in a bowl until oil emulsifies and drizzle over mixture. Add quinoa and feta.', now(), now());

INSERT INTO Recipes
    (name, description, instructions, createdAt, updatedAt)
VALUES
    ('Easy No Bake Chocolate Cookies', 'Forget about the oven!', 'In a saucepan over medium heat, combine 2 cups sugar, 1/4 cup unsweetened 
cocoa powder, 1/2 cup milk, and 1/2 cup margarine. Bring to a boil. Remove from heat and stir in 
vanilla, salt, peanut butter, and oats. Drop by rounded spoonfuls onto waxed paper. Allow cookies
to cool for at least 1 hour.', now(), now());

INSERT INTO Recipes
    (name, description, instructions, createdAt, updatedAt)
VALUES
    ('Garbanzo Bean Salad', 'Refreshing salad, perfect for pic-nics!', 'In a salad bowl, combine the chick peas, celery, onion, apple, and walnuts. 
Prepare the dressing by whisking together the mayonnaise, honey, mustard, and lemon juice. Combine the 
salad mixture and dressing. Toss and serve on a bed of shredded lettuce.', now(), now());


-------------------------------
-- INGREDIENTS TABLE --
-------------------------------
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('kale', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('olive oil', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('salt', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('garbanzo beans', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('garlic', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('cumin', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('soy sauce', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('pepper', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('pork', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('egg', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('parmesan cheese', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('seasoning', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('coconut oil', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('cocoa powder', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('honey', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('vanilla extract', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('water', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('quinoa', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('pepper', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('feta cheese', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('sugar', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('milk', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('margarine', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('peanut butter', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('oats', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('celery', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('onion', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('apple', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('walnuts', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('mayonnaise', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('mustard', now(), now());
INSERT INTO Ingredients
    (name, createdAt, updatedAt)
VALUES
    ('lettuce', now(), now());

-------------------------------
--RECIPES - INGREDIENTS TABLE--
-------------------------------
SELECT * FROM dbPantryAssembler.recipeIngredients;
USE dbPantryAssembler;

INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (1, 1, 1, 'bunch', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (1, 2, 1, 'tablespoon', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (1, 3, 1, 'teaspoon', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (2, 4, 1, 'can', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (2, 5, 1, 'clove', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (2, 6, 2, 'teaspoons', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (2, 3, 2, 'teaspoons', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (2, 2, 1, 'tablespoon', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (3, 7, 0.25, 'cup', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (3, 8, 0.5, 'teaspoon', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (3, 9, 4, 'pieces', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (4, 10, 1, 'egg', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (4, 11, 0.25, 'cup', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (4, 12, 1, 'teaspoon', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (4, 9, 2, 'pieces', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (5, 13, 0.5, 'cup', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (5, 14, 0.5, 'cup', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (5, 15, 3, 'tablespoons', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (5, 16, 0.5, 'teaspoon', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (6, 17, 2, 'cups', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (6, 18, 1, 'cup', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (6, 1, 10, 'leaves', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (6, 2, 3, 'tablespoons', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (6, 33, 2, 'tablespoons', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (6, 5, 1, 'clove', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (6, 8, 1, 'teaspoon', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (6, 3, 0.5, 'teaspoon', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (6, 20, 0.75, 'teaspoon', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (7, 21, 2, 'cups', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (7, 14, 0.25, 'cups', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (7, 22, 0.5, 'cup', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (7, 23, 0.5, 'cup', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (7, 16, 1, 'teaspoon', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (7, 3, 1, 'pinch', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (7, 24, 1.5, 'cup', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (7, 25, 3, 'cups', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (8, 4, 1, 'cup', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (8, 26, 0.75, 'teaspoon', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (8, 27, 0.5, 'cup', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (8, 28, 0.5, 'diced cup', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (8, 29, 1, 'whole', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (8, 30, 0.25, 'cup', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (8, 31, 1, 'tablespoon', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (8, 32, 1, 'tablespoon', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (8, 33, 0.25, 'teaspoon', now(), now());
INSERT INTO recipeIngredients (recipeId, ingredientId, quantity, unit, createdAt, updatedAt) VALUES (8, 15, 0.5, 'head', now(), now());

