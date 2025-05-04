import React from 'react';
import Header from './header';
import './wishlist.css';

function Wishlist() {
  const products = [
    { id: 'product1', owner: 'Owner 1', price: '$1000', acres: '10 acres' },
    { id: 'product2', owner: 'Owner 2', price: '$2000', acres: '20 acres' },
    { id: 'product3', owner: 'Owner 3', price: '$3000', acres: '30 acres' },
    { id: 'product4', owner: 'Owner 4', price: '$4000', acres: '40 acres' },
    { id: 'product5', owner: 'Owner 5', price: '$5000', acres: '50 acres' },
    { id: 'product6', owner: 'Owner 6', price: '$6000', acres: '60 acres' },
    { id: 'product7', owner: 'Owner 7', price: '$7000', acres: '70 acres' },
    { id: 'product8', owner: 'Owner 8', price: '$8000', acres: '80 acres' },
    { id: 'product9', owner: 'Owner 9', price: '$9000', acres: '90 acres' },
  ];

  return (
    <div className="wishlist">
      <Header />
      <div id="main-title">
        <h1>My Wishlist</h1>
      </div>
      <div className="products">
        {products.map((product, index) => (
          <div key={product.id} className={`product product${index + 1}`}>
            <img src={`https://via.placeholder.com/300x400?text=Product+${index + 1}`} alt={`Product ${index + 1}`} />
            <div className="owner-name">{product.owner}</div>
            <div className="price">{product.price}</div>
            <div className="acres">{product.acres}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
