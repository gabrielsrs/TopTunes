import { Router } from "express";
import { HomeController } from "../controllers/homeController.js"
import { AboutController } from "../controllers/aboutController.js"
import { SearchController } from "../controllers/searchController.js"
import { PageNotFound } from "../controllers/pageNotFound.js"

export const route = Router()

const homeController = new HomeController()
const aboutController = new AboutController()
const searchController = new SearchController()
const pageNotFound = new PageNotFound()

route.get("/", homeController.handle)
route.get("/about", aboutController.handle)
route.get("/search", searchController.handle)
route.get("/404", pageNotFound.handle)
route.get("*", pageNotFound.all)