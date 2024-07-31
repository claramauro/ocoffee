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
    let status = 500;
    if (err.status) {
        status = err.status;
    }
    res.status(status).render("error", {
        error: err.message,
        status: status,
    });
}

module.exports = { catchError, notFound, errorHandler };
