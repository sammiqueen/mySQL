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

    const [options] = await pool.promise().query(
        `SELECT id AS ownerID, name AS ownerName
        FROM owners 
        JOIN id AS speciesID, name AS speciesName
        FROM species`)

    response.render("creationform.njk", {
        options
    })
})

router.post("/", async (request, response) => {
    console.log(request.body)
    const {name, species, owner, wingspan, weight} = request.body
    const birdName = name

    const [[speciesID]] = await pool.promise().query(
        `SELECT id 
        FROM species 
        WHERE name = ?`,
        species)

    console.log(speciesID)

    const [[ownerID]] = await pool.promise().query(
        `SELECT id 
        FROM owners 
        WHERE name = ?`,
        owner)

    console.log(ownerID)

    const [result] = await pool.promise().query(
        `INSERT INTO birds (name, wingspan, weight, species_id) 
        VALUES (?, ?, ?, ?)`, 
        [birdName, wingspan, weight, speciesID])

    await pool.promise().query(
        `INSERT INTO owners_birds (owner_id, bird_id)
        VALUES (?, ?)`,
        ownerID, result.insertId)

    response.redirect("/birds/", result.insertId)
})

router.get("/login", (request, response) => {
    response.render("login.njk", {

    })
})

router.post("/login", (request, response) => {

})

export default router