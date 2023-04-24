import React, { useState, useEffect } from 'react';
import GameCard from './Gamecard';
import './Styles/Gamelist.css';
import { baseUrl } from './util/commonutil';

function GamesList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const apiEndpoint = '/api/v1/games/all';
      const fullEndpoint = `${baseUrl}${apiEndpoint}`;
      const config = {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      };
      console.log('fullEndpoint:', fullEndpoint);
      const response = await fetch(fullEndpoint, config);
      const data = await response.json();
      console.log('data:', data);
      setGames(data);
    }

    fetchGames();
  }, []);

  return (
    
    <div className="games-list">
      {games && games.length > 0 ? (
        games.map(game => (
          <GameCard
            key={game.id}
            title={game.title}
            images={game.image}
            description={game.description}
            productId={game.productId}
            link={game.link}
            subscriberId={game.subscriberId}

            className="game-card"
          />
          
        ))
      ) : (
        <div class="loading">
  <p>Loading games...</p>
</div>

      )}
    </div>
  );
}

export default GamesList;