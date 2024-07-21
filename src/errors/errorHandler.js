
export function errorHandler(error, req, res, next) {
    console.error(error.message)
    res.status(404).redirect("/404")
}
