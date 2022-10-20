const Restos = require("../models/restoModel")

module.exports = {

    async getTypeAndDistrict(req, res) {
        let typeCuisine = await Restos.find().distinct('cuisine').catch((err) => {
            res.status(400).send(err)
        })

        let borough = await Restos.find().distinct('borough').catch((err) => {
            res.status(400).send(err)
        })

        res.status(200).render("../views/formRestoCuisineBorough.pug",
            {
                typeCuisine,
                borough
            })
    },

    async displayRestoByCuisineAndborough(req, res) {
        const restaurants = await Restos.find({ cuisine: req.body.cuisine, borough: req.body.borough }, { 'cuisine': 1, 'borough': 1, 'address.street': 1, 'address.zipcode': 1, 'address.building': 1, 'name': 1 })
            .catch((err) => { res.status(400).send(err) })
        let numberRestaurant = Object.keys(restaurants).length;
        res.status(200).render("../views/displayResto.pug",
            {
                restaurants,
                numberRestaurant
            })
    },

    async bestRestoByBorough(req, res) {

        let bestResto = await Restos.aggregate([
            {
                $group: {
                    _id: {
                        name: '$name',
                        borough: '$borough',
                        score: { $first: "$grades.score" },
                        grade: { $first: "$grades.grade" },
                    },
                }
            },
            { $sort: { '_id.grade': -1 } },
            { $sort: { '_id.score': 1 } },
            { $project: { borough: 'Queens' } }

        ]).catch((err) => { res.status(400).send(err) })

        console.log(bestResto)
        res.send(200)
    },

    async numberItalianRestoByBorough(req, res) {
        //SUM = fonction d'aggregation
        // Calculates and returns the collective sum of numeric values. $sum ignores non-numeric values.
        let italianResto = await Restos.aggregate([
            { $match: { "cuisine": "Italian" } }, //filtre

            { $group: { "_id": "$borough", "total": { $sum: 1 } } },
        ]).catch((err) => { res.status(400).send(err) })

        res.status(200).render("../views/italianRestoByBorough.pug",
            {
                italianResto
            })
    }

}
