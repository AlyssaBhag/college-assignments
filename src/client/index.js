// Import statments/.
import Navigo from 'navigo';

// Initialize router
const router = new Navigo('/');

// console.log("Hello World!");

// Main pages.
router.on("/", () => {
    console.log("The Index / Home page!");
});

router.on("/search", () => {
    console.log("The Search page!");
});

router.on("/create", () => {
    console.log("The Create page!");
});

// Other supplementary pages.
router.on("/about", () => {
    console.log("The About page!");
});

router.on("/contact", () => {
    console.log("The Contact page!");
});

// router.on("/privacy-policy", (router) => {
//     console.log("The About page!");
// });

// router.on("/terms", (router) => {
//     console.log("The About page!");
// });

router.resolve();
