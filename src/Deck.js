import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(function loadDeckFromAPI() {
    async function getDeck() {
      let d = await axios.get(`${API_BASE_URL}/new/shuffle/`);
      setDeck(d.data);
    }
    getDeck();
  }, []);

  // function to draw a card from the deck.  An error will result if the deck is empty.
  async function drawCard() {
    try {
      let cardRes = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);
      if (cardRes.data.remaining === 0) throw new Error("no cards remaining!");
      const card = cardRes.data.cards[0];
      setDrawn((d) => [
        ...d,
        {
          id: card.code,
          name: card.suit + " " + card.value,
          image: card.image,
        },
      ]);
    } catch (err) {
      alert(err);
    }
  }

  //function to shuffle the deck
  async function shuffleDeck() {
    setIsShuffling(true);
    try {
      await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
      setDrawn([]);
    } catch (err) {
      alert(err);
    } finally {
      setIsShuffling(false);
    }
  }

  //show the draw button if necessary
  function renderDrawBtnIfOk() {
    if (!deck) return null;

    return (
      <button className="Deck-btn" onClick={drawCard}>
        Draw a card
      </button>
    );
  }

  //show the shuffle button if necessary
  function renderShuffleBtnIfOk() {
    if (!deck) return null;
    return (
      <button className="Deck-btn" onClick={shuffleDeck} disabled={isShuffling}>
        Shuffle Deck
      </button>
    );
  }

  // Display page layout
  return (
    <main className="Deck">
      <h1 className="Deck-title">♦ Card Dealer ♦</h1>
      <div className="Deck-buttons">
        {renderDrawBtnIfOk()} {renderShuffleBtnIfOk()}
      </div>
      <div className="Deck-cardarea">
        {drawn.map((c) => (
          <Card key={c.id} name={c.name} image={c.image} />
        ))}
      </div>
    </main>
  );
}

export default Deck;
