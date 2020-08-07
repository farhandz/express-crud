const Item = require('../model/Item')
const Treasure = require('../model/Activity')
const Traveler =  require('../model/Booking')
const Category = require('../model/Category')
module.exports = {
    landingPage: async (req,res) => {
    try {
        const mostPicked = await Item.find()
        .select('_id title country city price unit imageId')
        .limit(5)
        .populate({path: 'imageId', select: '_id imageUrl'});
        


        const category = await Category.find()
            .select('_id name')
            .limit(3)
            .populate({
                path: 'itemId',
                perDocumentLimit: 4,
                populate: {
                    path: 'imageId',
                    perDocumentLimit: 1,
                    select: '_id imageUrl'
                },
                select: '_id title country city price unit imageId'
            })
       

        const treasure = await Treasure.find()
        const traveler =  await Traveler.find()
        const city = await Item.find()
        res.status(200).json({
            hero: {
                travelers: traveler.length,
                treasure: treasure.length,
                city: city.length
            },
            mostPicked,
            category
            
        })
    } catch (error) {
        res.send(error)
    }
    }
}