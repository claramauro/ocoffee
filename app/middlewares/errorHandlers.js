function catchError(controllerMethod) {
    return async function (req, res, next) {
        try {
            await controllerMethod(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}

function notFound(req, res, next) {
    const error = new Error("Page not found");
    error.status = 404;

    // * Quand on appelle next avec un argument, express lève une erreur
    next(error);
}

function errorHandler(err, req, res, next) {
    console.log(err);
    const error = {
        error: "Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, merci de contacter directement la boutique.",
        status: 500,
    };
    if (err.status) {
        error.status = err.status;
    }
    if (err.status === 404) {
        error.error = err.message;
    }
    if (req.path.startsWith("/admin")) {
        if (err.status !== 404) {
            error.error =
                "Une erreur est survenue, veuillez réessayer plus tard.";
        }
        res.status(error.status).render("./admin/admin-error", { error });
    } else {
        res.status(error.status).render("error", { error });
    }
}

module.exports = { catchError, notFound, errorHandler };
