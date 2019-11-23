import { Paper } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import QRCode from 'qrcode.react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { client } from '../../lib/apollo/client';
import { Product } from '../../lib/index';

export const GeneratedQRCode: React.FC<{ id: any }> = ({ id }) => <QRCode value={ id } />;

export const GET_EXACT_PRODUCT = gql`
  query getExactProduct($id: ID!){
    product(where: {id: $id }) {
      name
      id
      price
      category
      destinationCountry
      latinName
      variety
      description
      image
    }
  }
`;

export const fetchExactProductData = async (
  setProduct: React.Dispatch<React.SetStateAction<Product>>,
  id: any
) => {
  const { data } = await client.query({
    query: GET_EXACT_PRODUCT,
    variables: { id: id }
  });

  if (data) {
    setProduct(data.product);
  }
};

export const ProductPage = ({ match }: any) => {
  const [product, setProduct] = useState<Product>({} as Product);
  const [productId, setProductId] = useState<string>('');

  useEffect(() => {
    const id = match && match.params && match.params.id;
    setProductId(id);
    fetchExactProductData(setProduct, id);
  }, [product]);


  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <Typography className="mb-m" variant={'h4'}>{ product.name }</Typography>
        <div className="mb-s"><span className="fw-medium">Nazwa łacińska produktu: </span>{ product.latinName }</div>
        <div className="mb-s"><span className="fw-medium">Odmiana: </span>{ product.variety }</div>
        <div className="mb-s"><span className="fw-medium">Kategoria: </span>{ product.category }</div>
        <div className="mb-s"><img src={product.image} alt={product.name} /> </div>
        <div className="mb-s"><span className="fw-medium">Opis: </span>{ product.description }</div>
        <div className="mb-s"><span className="fw-medium">Kraj pochodzenia: </span>{ product.destinationCountry }</div>
        <div className="mb-s"><span className="fw-medium">Wysokość: </span>{ product.height }</div>
        <div className="mb-s"><span className="fw-medium">Cena: </span>{ product.price }</div>
        <GeneratedQRCode id={ productId } />
      </Paper>
    </>
  );
};