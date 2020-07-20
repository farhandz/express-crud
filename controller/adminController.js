const Category = require('../model/Category')
const Bank = require('../model/Bank')
const fs = require('fs-extra')
const path = require('path')
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


    viewBank: async (req,res)=> {
        try {
        const bank = await Bank.find()
        let allertMessage = req.flash("allertMessage");
        let allertStatus = req.flash("allertStatus");
        const alert = { message: allertMessage, status: allertStatus };
        res.render('admin/bank/view_bank', {
            bank,
            alert
        } )
            
        } catch (error) {
            res.redirect('/admin/bank')
        }
    },
    
    addBank: async (req,res) => {
        try {
            req.flash("allertMessage", "success add category")
            req.flash("allertStatus", "success")
            const { name, nameBank, nomorRekening } = req.body;
            await Bank.create({
                name,
                nameBank,
                nomorRekening,
                imageUrl: `images/${req.file.filename}`
            });
            res.redirect('/admin/bank')
            
        } catch (error) {
            req.flash("allertMessage", `${err.message}`)
            req.flash("allertStatus", "danger")
            res.redirect('/admin/bank')
            
        }
        
    },

    deleteBank: async(req, res) => {
        try {
            req.flash("allertMessage", "success delete category")
            req.flash("allertStatus", "success")
            const { id } = req.params
            const bank = await Bank.findOne({ _id: id })
            await bank.remove()

            res.redirect('/admin/bank')
        } catch (error) {
            req.flash("allertMessage", `${err.message}`)
            req.flash("allertStatus", "danger")
            
            res.redirect('/admin/bank')
        }
    },

    editBank: async (req, res) => {
        try {

            const { id, name, nameBank, nomorRekening } = req.body;
            const bank = await Bank.findOne(({ _id: id }));

            if ( typeof req.file == "undefined") {
              bank.name = name;
              bank.nameBank = nameBank;
              bank.nomorRekening = nomorRekening;
              await bank.save();
              req.flash("alertMessage", "Success Update Bank");
              req.flash("alertStatus", "success");
              res.redirect("/admin/bank");
            } else {
              await fs.unlink(path.join(`public/${bank.imageUrl}`));
              bank.name = name;
              bank.nameBank = nameBank;
              bank.nomorRekening = nomorRekening;
              bank.imageUrl = `images/${req.file.filename}`;
              await bank.save();
              req.flash("alertMessage", "Success Update Bank");
              req.flash("alertStatus", "success");
              res.redirect("/admin/bank");
            }
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    },


    viewItem: (req,res)=> {
        res.render('admin/item/view_item')
    },


    viewBooking: (req,res)=> {
        res.render('admin/booking/view_booking')
    }
}