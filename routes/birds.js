import express from "express"
import pool from "../db.js"

const router = express.Router()

router.get("/", async (request, response) => {
    const [birds] = await pool.promise().query('SELECT * FROM birds')

    response.render("birds.njk", {
        birds
    })
})

router.get("/create", async (request, response) => {

    const [validOwners] = await pool.promise().query('SELECT id, name FROM owners')

    response.render("creationform.njk", {
        validOwners
    })
})

router.post("/", async (request, response) => {
    console.log(request.body)
    const {name, species, owner, wingspan, weight} = request.body
    const birdName = name
    const ownerName = owner

    const [[speciesID]] = await pool.promise().query(
        `SELECT id 
        FROM species 
        WHERE name = ?`,
        species)

    console.log(speciesID)

    const [result] = await pool.promise().query(
        `INSERT INTO birds (name, wingspan, weight, species_id) 
        VALUES (?, ?, ?, ?)`, 
        [birdName, wingspan, weight, speciesID])

    response.redirect("/birds/", result.insertId)
})

router.get("/login", (request, response) => {
    response.render("login.njk", {

    })
})

router.post("/login", (request, response) => {

})

export default router