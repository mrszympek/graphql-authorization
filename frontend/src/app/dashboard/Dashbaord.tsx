import * as React from 'react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div>

      <Link to="/add-product">
        Dodaj produkt
      </Link>

      <Link to='/products'>
        Produkty
      </Link>
    </div>
  );
};
