import { Router } from "express";
import { HomeController } from "../controllers/homeController.js"
import { AboutController } from "../controllers/aboutController.js"
import { SearchController } from "../controllers/searchController.js"

export const route = Router()

const homeController = new HomeController()
const aboutController = new AboutController()
const searchController = new SearchController()

route.get("/", homeController.handle)
route.get("/about", aboutController.handle)
route.get("/search", searchController.handle)
