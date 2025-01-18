import React from 'react';
import { DeleteBeerForm } from './delete-beer';
import '../styles/components/beer-list.css';

const styleColors = {
  "Red": "red",
  "Stout": "black",
  "IPA": "gold",
  "Amber": "darkorange",
  "Pilsner": "lightyellow",
  "Sour": "green",
  "Wheat": "wheat",
  "Porter": "brown",
  "Pale Ale": "orange"
};

export const BeerList = ({ beers, onBeerDeleted }) => {
  return (
    <div className="beer-list">
      <h2>Beers</h2>
      <ul>
        {beers.map((beer) => (
          <li key={beer.id} className="beer-card">
            <div className="beer-card__info">
              <h3>{beer.name}</h3>
              <p>{beer.description}</p>
              <p>
                <i className="fas fa-beer" style={{ color: styleColors[beer.style] || 'gray' }}></i> 
                {beer.style}
              </p>
            </div>
            <div className="beer-card__actions">
              <DeleteBeerForm beerId={beer.id} onBeerDeleted={onBeerDeleted} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
