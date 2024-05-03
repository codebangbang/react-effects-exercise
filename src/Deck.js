import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);

  useEffect(() => {
    async function getDeck() {
      let d = await axios.get(`${API_BASE_URL}/new/shuffle/`);
      setDeck(d.data);
    }
    getDeck();
  }, []);



function drawButton() {
  async function drawCard() {
    let { deck_id } = deck;
    try {
      let cardRes = await axios.get(`${API_BASE_URL}/${deck_id}/draw/`);
      if (cardRes.data.remaining === 0) {
        setAutoDraw(false);
        throw new Error("no cards remaining!");
      }
      const card = cardRes.data.cards[0];
      setDrawn(d => [
        ...d,
        {
          id: card.code,
          name: card.suit + " " + card.value,
          image: card.image
        }
      ]);
    } catch (err) {
      alert(err);
    }
  }
  drawCard();

function shuffleButton() {
  setDeck(null);
  setDrawn([]);
  setAutoDraw(false);
  getDeck();


return (
  <div>
    {deck ? (
      <button onClick={drawButton}>Draw Card!</button>
    ) : (
      <button onClick={shuffleButton}>Shuffle Deck!</button>
    )}
    <div>
      {drawn.map(c => (
        <Card key={c.id} name={c.name} image={c.image} />
      ))}
    </div>
  </div>
);

}}}

export default Deck;
