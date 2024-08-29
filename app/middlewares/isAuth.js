function isAuth(req, res, next) {
    if (req.session.isAdminConnected) {
        next();
        return;
    } else {
        res.redirect("/admin/login");
    }
}

module.exports = { isAuth };
