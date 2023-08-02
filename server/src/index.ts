import express, {Request, Response} from "express";
const app = express();
import mongoose from "mongoose"
import {config} from "dotenv"
config()

const PORT = 5000;

app.use(express.json());

import Deck from './models/Deck'


app.get('/', (req :Request, res: Response) => {
    res.send('GG');
})

app.post('/decks', async (req :Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title
    });
    const createdDeck =  await newDeck.save();
    res.json(createdDeck)
})

const db = mongoose
    .connect(process.env.MONGO_URL!).then(()=>{
        console.log(`listening on ${PORT}` )
        app.listen(PORT);
    })

// npm install mongoose
