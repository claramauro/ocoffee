function isAuth(req, res, next) {
    if (req.session.isAdminConnected) {
        next();
        return;
    } else {
        req.app.locals.isAdminConnected = false;
        res.redirect("/admin/login");
    }
}

module.exports = { isAuth };
