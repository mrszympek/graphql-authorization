import React from 'react';
import { Route } from 'react-router';
import { AddProduct } from '../../app/addProcuct/AddProduct';
import { Dashboard } from '../../app/dashboard/Dashbaord';
import { EditProduct } from '../../app/editProduct/editProduct';
import { ProductPage } from '../../app/productPage/productPage';
import { ProductsList } from '../../app/productsList/productsList';

export const routingPaths = [
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/add-product',
    component: AddProduct
  },
  {
    path: '/products',
    component: ProductsList
  },
  {
    path: '/product/:id',
    component: ProductPage
  },
  {
    path: '/product/:id/edit',
    component: EditProduct
  }
];

export const RoutingComponent: React.FC<{}> = () => (
  <>
    {
      routingPaths.map( (e, index) => (
        <Route exact path={e.path} component={e.component} key={index}/>
      ))
    }
  </>
);