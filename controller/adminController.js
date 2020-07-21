const Category = require('../model/Category')
const Bank = require('../model/Bank')
const Item = require('../model/Item')
const Image = require('../model/Image')
const Activity = require('../model/Activity')
const Feature = require('../model/Feature')
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


    viewItem: async(req,res)=> {
        try {
            const item = await Item.find()
            .populate({ path: 'imageId', select: 'id imageUrl' })
            .populate({ path: 'categoryId', select: 'id name' })
            let allertMessage = req.flash("allertMessage");
            let allertStatus = req.flash("allertStatus");
            const alert = { message: allertMessage, status: allertStatus };
            const category = await Category.find()
            res.render('admin/item/view_item', {
                category,
                alert,
                item,
                action: 'view'
            });
        } catch (error) {
            res.redirect('/admin/item')
      }

    },

    addItem: async (req,res)=> {
        try {
            const {title, price, city, categoryId, about } = req.body
            if(req.files.length >  0) {
                const category = await Category.findOne({_id: categoryId})
                const newItem = {
                    categoryId,
                    title,
                    description: about,
                    price,
                    city
                }
               const item = await Item.create(newItem)
                category.itemId.push({ _id: item._id });
                await category.save();
                for (let i = 0; i < req.files.length; i++) {
                    const imageSave = await Image.create({ imageUrl: `images/${req.files[i].filename}` });
                    item.imageId.push({ _id: imageSave._id });
                    await item.save();
                }
                req.flash("allertMessage", "success add Item")
                req.flash("allertStatus", "success")
                res.redirect('/admin/item')
            } 
        } catch (error) {
            res.send(error.message)
        }
    },

    showImageItem: async (req, res) => {
        const { id } = req.params;
        const item = await Item.findOne({ _id: id })
            .populate({ path: 'imageId', select: 'id imageUrl' });
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };
        res.render("admin/item/view_item.ejs", {
            title: "Staycation | Show Image Item",
            alert,
            item,
            action: 'show image'
        });
    },

    deleteItem: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Item.findOne({ _id: id }).populate('imageId');
            for (let i = 0; i < item.imageId.length; i++) {
                Image.findOne({ _id: item.imageId[i]._id }).then((image) => {
                    fs.unlink(path.join(`public/${image.imageUrl}`));
                    image.remove();
                }).catch((error) => {
                    req.flash('alertMessage', `${error.message}`);
                    req.flash('alertStatus', 'danger');
                    res.redirect('/admin/item');
                });
            }
            await item.remove();
            req.flash('alertMessage', 'Success delete Item');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/item');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/item');
        }
    },

    showEDititem: async (req,res) => {
        try {
            const {id} = req.params;
            const item = await Item.findOne({_id: id})
            .populate({path: 'imageId', select: "id imageUrl"})
            .populate({path: 'categoryId', select: "id name"})
            const category = await Category.find()
            let allertMessage = req.flash("allertMessage");
            let allertStatus = req.flash("allertStatus");
            const alert = { message: allertMessage, status: allertStatus };
            res.render('admin/item/view_item', {
                item,
                category,
                action: 'show edit',
                alert
            })
            
        } catch (error) {
            res.redirect('/admin/item')
        }
    },

    viewDetailItem: async (req, res) => {
        try {
            const { itemId } = req.params;
            const activity = await Activity.find({ itemId: itemId })
            const feature = await Feature.find({ itemId: itemId })
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            res.render('admin/item/detail_item/view_detail_item', {
                title: 'StayCation | detailItem',
                alert,
                itemId,
                feature,
                activity
            })

        } catch (error) {
            
        }
    },

    editItem: async (req,res) => {
        try {
            const { id } = req.params;
            const { categoryId, title, price, city, about } = req.body;
            const item = await Item.findOne({ _id: id })
                .populate({ path: 'imageId', select: 'id imageUrl' })
                .populate({ path: 'categoryId', select: 'id name' });

            if (req.files.length > 0) {
                for (let i = 0; i < item.imageId.length; i++) {
                    const imageUpdate = await Image.findOne({ _id: item.imageId[i]._id });
                    await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));
                    imageUpdate.imageUrl = `images/${req.files[i].filename}`;
                    await imageUpdate.save();
                }
                item.title = title;
                item.price = price;
                item.city = city;
                item.description = about;
                item.categoryId = categoryId;
                await item.save();
                req.flash('alertMessage', 'Success update Item');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/item');
            } else {
                item.title = title;
                item.price = price;
                item.city = city;
                item.description = about;
                item.categoryId = categoryId;
                await item.save();
                req.flash('alertMessage', 'Success update Item');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/item');
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/item');
        }
    },

    viewBooking: (req,res)=> {
        res.render('admin/booking/view_booking')
    }
}