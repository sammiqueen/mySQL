import express from "express"
import pool from "../db.js"

const router = express.Router()

router.get("/", async (request, response) => {
    const [birds] = await pool.promise().query('SELECT * FROM birds')

    response.json(birds)
})

router.get("/login", (request, response) => {
    response.render("login.njk", {

    })
})

router.post("/login", (request, response) => {

})

export default router