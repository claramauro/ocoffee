class UserError extends Error {}

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
        error: "Une erreur est survenue, veuillez réessayer plus tard.",
        status: 500,
    };

    if (err.status === 404) {
        error.status = err.status;
        error.error = err.message;
    }
    if (req.path.startsWith("/admin")) {
        if (err instanceof UserError) {
            error.error = err.message;
        }
        return res.status(error.status).render("./admin/admin-error", { error });
    }

    res.status(error.status).render("error", { error });
}

module.exports = { catchError, notFound, errorHandler, UserError };
