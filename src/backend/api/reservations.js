const express = require("express");
const reservationsRouter = express.Router();
const knex = require("../database");

// GET - Returns all reservations -- WORKS
reservationsRouter.get("/", async (req, res) => {
    try {
      const reservations = await knex("Reservation").select("*");
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // // POST - Adds a new reservation to the database. -- works
  reservationsRouter.post("/", async (req, res) => {
    try {
      const newReservation = req.body;
      const dateString = newReservation['created _date']
      newReservation['created _date'] = new Date(dateString)
      console.log(newReservation)
      const insertedReservation = await knex("Reservation").insert(newReservation);
      res.status(201).json(insertedReservation);
    } catch (error) {
      throw error;
    }
  });

  // GET - Returns a reservation by ID -- WORKS
  reservationsRouter.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const reservation = await knex("Reservation").where({ id }).first();
      if (!reservation) {
        return res.status(404).json({ error: "Reservation not found" });
      }
      res.json(reservation);
    } catch (error) {
      throw error;
    }
  });

  //PUT -- Updates reservation by ID -- WORKS
  reservationsRouter.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedReservation = req.body
      const reservation = await knex("Reservation").where({ id }).update(updatedReservation);
      if (!reservation) {
        return res.status(404).json({ error: "Reservation not found" });
      }
        res.json(updatedReservation);
    } catch (error) {
      throw error;
    }
  });

  //DELETE - Deletes a reservation by id
  reservationsRouter.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const reservation = await knex("Reservation").where({ id }).del();
      if (!reservation) {
        return res.status(404).json({ error: "Reservation not found" });
      }
      res.json(reservation);
    } catch (error) {
      throw error;
    }
  });

  module.exports = reservationsRouter;