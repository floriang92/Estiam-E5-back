const express = require('express');
const router = new express.Router()

/**
 * Déclaration des controlleurs de l'app
 */

const restosController = require("./controllers/restosController")
const exploreController = require("./controllers/exploreController")

/**
 * Déclaration des routes de l'app
 */

router.get("/", getHome);

router.get("/restos", restosController.getRestos);

router.post("/search_resto", restosController.searchResto);

router.get("/explore", exploreController.getTypeAndDistrict);

router.post("/displayRestoByCuisineAndborough", exploreController.displayRestoByCuisineAndborough)

router.get("/BestResto", exploreController.bestRestoByBorough)

router.get("/numberItalianRestoByBorough", exploreController.numberItalianRestoByBorough)

/**
 * GET /
 * Page d'accueil
 */
function getHome(req, res) {
  res.status(200).render('index');
}

// Exporte le routeur pour le fichier principal
module.exports = router;