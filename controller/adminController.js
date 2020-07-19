const Category = require('../model/Category')

module.exports = {
    viewDashboard: (req,res)=> {
        res.render('admin/dashboard/view_dashboard')
    },


    viewCategory:  async (req,res)=> {
        try {
            const category = await Category.find()
            let allertMessage = req.flash("allertMessage");
            let allertStatus = req.flash("allertStatus");
            const alert = { message: allertMessage, status: allertStatus };
            res.render('admin/category/view_category', {
                category,
                alert
            })

            
        } catch (error) {
            res.redirect('/admin/category')
        }
    },

    addCategory: async(req,res) => {
        try {
            req.flash("allertMessage", "success add category")
            req.flash("allertStatus","success")
            const {name} = req.body
            await Category.create({name})
            res.redirect('/admin/category')
            
        } catch (err) {
            req.flash("allertMessage", `${err.message}`)
            req.flash("allertStatus", "danger")
            res.redirect('/admin/category')
        }
    },
    
    editCategory: async(req,res) => {
        try {
            req.flash("allertMessage", "success edit category")
            req.flash("allertStatus", "success")
            const {name , id} = req.body
            let category = await Category.findOne({_id: id})
            category.name = name
            await category.save()
            res.redirect('/admin/category')
            
        } catch (err) {
            req.flash("allertMessage", `${err.message}`)
            req.flash("allertStatus", "danger")
            res.redirect('/admin/category')
        }
    },

    deleteCategory: async (req,res) => {
        const {id} = req.params
        const category = await Category.findOne({_id: id})
        await category.remove()
        res.redirect('/admin/category')
    },


    viewBank: (req,res)=> {
        res.render('admin/bank/view_bank')
    },


    viewItem: (req,res)=> {
        res.render('admin/item/view_item')
    },


    viewBooking: (req,res)=> {
        res.render('admin/booking/view_booking')
    }
}