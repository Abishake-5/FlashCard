import express, {Request, Response} from "express";
const app = express();
import mongoose from "mongoose"
import {config} from "dotenv"
config()
import cors from "cors"
const PORT = 5000;

app.use(express.json());
//  allows the use of JSON 
app.use(cors({
    origin:"*"
}));
//   allows connection coming from any ports

import Deck from './models/Deck'



app.get('/decks', async(req :Request, res: Response) => {
    const decks = await Deck.find();
    res.json(decks)
})

app.post('/decks', async (req :Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title
    });
    const createdDeck =  await newDeck.save();
    res.json(createdDeck)
})

app.delete('/decks/:deckId', async(req :Request, res: Response) => {
    // TOD:
    const deckId = req.params.deckId;
    const deck = await Deck.findByIdAndDelete(deckId);
    res.json(deck)
})

const db = mongoose
    .connect(process.env.MONGO_URL!).then(()=>{
        console.log(`listening on ${PORT}` )
        app.listen(PORT);
    })

// npm install mongoose
