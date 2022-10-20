const Restos = require("../models/restoModel")

module.exports = {

    async searchResto(req, res) {
        const restaurants = await Restos.find({ name: new RegExp('^' + req.body.restoToSearch + '$', "i") }, { 'cuisine': 1, 'borough': 1, 'address.street': 1, 'address.zipcode': 1, 'address.building': 1, 'name': 1 })
            .catch((err) => { res.status(400).send(err) })

        let numberRestaurant = Object.keys(restaurants).length;
        res.status(200).render("../views/displayResto.pug",
            {
                restaurants,
                numberRestaurant
            })
    },

    getRestos(req, res) {
        res.status(200).render('findRestoByName')
    }
}