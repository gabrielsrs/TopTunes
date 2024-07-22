class PageNotFound {
    handle(req, res) {
        res.render("404.ejs")
    }

    all(req, res) {
        res.status(404).redirect("/404")
    }
}

export { PageNotFound }