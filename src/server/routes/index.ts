import express from "express"
import { Router } from "express";
import { CidadesController } from "./../controllers";

const router = Router();
router.use(express.json());

router.get("/", (req, res) => {
    return res.send("Olá, DEV!");
});

router.post("/cidades", CidadesController.create)

export { router };