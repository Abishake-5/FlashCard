import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [title , setTitle] = useState('');
  const [decks, setDecks] = useState([])
  
  async function handleCreateDeck(e:React.FormEvent){
    e.preventDefault()
   const response = await fetch('http://localhost:5000/decks', {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type" : "application/json",
      },
    });
    const deck = await response.json()
    setDecks([...decks, deck])
    setTitle('');
  }

  useEffect(() => {
    async function fetchDeck(){
    const response = await fetch('http://localhost:5000/decks');
    const newDecks = await response.json();
    setDecks(newDecks);
    }
    fetchDeck(); 
  }, [])

  async function handleDeleteDeck (deckId: String) {
    await fetch(`http://localhost:5000/decks/${deckId}`, {
      method: "DELETE",
    })
    setDecks(decks.filter((deck) => deck._id !== deckId))
    
  }

  return (
   <div className="App">
    <ul className="decks">
      {decks.map((deck)=>(
        <li key={deck._id}>
          <button onClick={()=> handleDeleteDeck(deck._id)}>X</button>
          {deck.title}
          </li>
      ))}
    </ul>
    <form onSubmit={handleCreateDeck}>
      <label htmlFor="deck-title"> Deck Title</label>
      <input 
        id="deck-title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value)

        }}
      />
      <button>Create Deck</button>
    </form>
   </div>
  )
}

export default App
