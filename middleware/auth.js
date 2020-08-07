const isLogin = (req,res,next) => {
    if(req.session.user == null || req.session.user == undefined) {
        req.flash("allertMessage", 'session anda telah habis');
        req.flash("allertStatus", "danger");
        res.redirect('/admin/signin') 
    } else {
        next()
    }
}

module.exports = {isLogin}