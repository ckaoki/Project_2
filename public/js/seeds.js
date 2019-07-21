var recipes = [
    { 
        name:'Baked Kale Chips',
        description: 'kale, olive oil, salt',
        instructions: 'Preheat oven to 350 degrees. Remove the leaves from the thick stems and tear into bite size pieces. Drizzle kale with olive oil and sprinkle with seasoning salt. Bake until the edges are brown',
        img: 'https://d3k19ysnp189dx.cloudfront.net/wp-content/uploads/2018/12/Coconut-Oil-Kale-Chips-2.jpg'
    },
    {
        name:'Extra Easy Hummus',
        description:'garbanzo beans, garlic, cumin, salt, olive oil',
        instructions:'In a blender combine 1 can garbanzo beans, 1 clove garlic, 2 teaspoons ground cumin, 1/2 teaspoon salt, and 1 tablespoon olive oil. Blend on low speed, gradually adding reserved bean liquid until desired consistency is achieved.',
        img:'https://hips.hearstapps.com/hmg-prod/images/hummus-horizontal-jpg-1525126330.jpg'
    },
    {
        name:'Yummy Pork Chops',
        description:'soy sauce, pepper, pork',
        instructions:'Mix 1/4 cup soy sauce, and 1/2 teaspoon pepper in a bowl. Place 4 boneless pork chops in a skillet over medium heat, and cover with the dressing mixture. Cover skillet and cook pork chops 25 minutes, turning occasionally. Remove cover, reduce heat to low, and continue cooking to desired doneness.',
        img:'https://www.primaverakitchen.com/wp-content/uploads/2018/10/Garlic-Butter-Baked-Pork-Chops-Primavera-Kitchen-3.jpg'
    },
    {
        name:'Parmesan Crusted Pork Chops',
        description:'egg, parmesan cheese, seasoning, pork',
        instructions:'Preheat over to 350 degrees. Whisk egg in a shallow bowl. Mix 1/4 cup grated Parmesan cheese and 1 teaspoon Cajun seasoning together on plate. Dip each pork chop into egg. Press until coated on both sides. Baked in preheated overn until golden for 35 to 40 minutes.',
        img:'https://images.media-allrecipes.com/userphotos/560x315/3875421.jpg'
    },
    {
        name:,
        description:,
        instructions:,
        img:
    },
    {
        name:,
        description:,
        instructions:,
        img:
    },
    {
        name:,
        description:,
        instructions:,
        img:
    },
    {
        name:,
        description:,
        instructions:,
        img:
    },
];
var ingredients = ['1', '2'];
var recipeIngredients = [];


INSERT INTO recipes (name, description, instructions, img, createdAt, updatedAt) 
VALUES ('Melt-In-Your-Mouth Dark Chocolate', 'coconut oil, cocoa powder, honey, vanilla extract', 
'Gently melt coconut oil in a saucepan over medium-low heat. Stir 1/2 cup cocoa powder, 3 tablespoons
honey, and 1/2 teaspoon vanilla extract into melted oil until well blended. Pour mixture into a tray.
Refrigerate until chilled', 'https://cdn.renewingallthings.com/wp-content/uploads/homemade-dark-chocolate.jpg', now(), now());

INSERT INTO recipes (name, description, instructions, img, createdAt, updatedAt) 
VALUES ('Kale and Quinoa Salad', 'water, quinoa, kale, olive oil, lemon juice, garlic, pepper, salt,
feta cheese','Stir 1 cup quinoa into boiling water reduce heat to medium-low, place cover on saucepan, and 
cook until water absorbs into the quinoa, about 12 minutes. Remove saucepan from heat and let cool.
Put kale in  mixing bowl. Whisk olive oil, lemon juice, Dijon mustard, garlic, pepper, and salt 
together in a bowl until oil emulsifies and drizzle over mixture. Add quinoa and feta.', 'https://blog.katescarlata.com/wp-content/uploads/2017/02/Quinoa-kale-spoon.jpg', now(), now());

INSERT INTO recipes (name, description, instructions, img, createdAt, updatedAt) 
VALUES ('Easy No Bake Chocolate Cookies', 'sugar, cocoa powder, milk, margarine, vanilla extract, salt,
peanut butter, oats', 'In a saucepan over medium heat, combine 2 cups sugar, 1/4 cup unsweetened 
cocoa powder, 1/2 cup milk, and 1/2 cup margarine. Bring to a boil. Remove from heat and stir in 
vanilla, salt, peanut butter, and oats. Drop by rounded spoonfuls onto waxed paper. Allow cookies
to cool for at least 1 hour.', 'https://shewearsmanyhats.com/wp-content/uploads/2014/12/no-bake-oatmeal-chocolate-coconut-cookies-1-copy.jpg', now(), now());

INSERT INTO recipes (name, description, instructions, img, createdAt, updatedAt) 
VALUES ('Garbanzo Bean Salad', 'garbanzo beans, celery, onion, apple, walnuts, mayonnaise, honey, mustard,
lemon juice, lettuce', 'In a salad bowl, combine the chick peas, celery, onion, apple, and walnuts. 
Prepare the dressing by whisking together the mayonnaise, honey, mustard, and lemon juice. Combine the 
salad mixture and dressing. Toss and serve on a bed of shredded lettuce.', 'https://images-gmi-pmc.edge-generalmills.com/1daacf40-49ce-4fe8-9f1e-67eb9a534144.jpg', now(), now());


module.exports = {
    recipes,
    ingredients,
    recipeIngredients
};
