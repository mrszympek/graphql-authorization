import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { gql } from 'apollo-boost';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import * as React from 'react';
import * as Yup from 'yup';
import { client } from '../../lib/apollo/client';
import { Product } from '../../lib/index';
import { GET_EXACT_PRODUCT } from '../productPage/productPage';

export type ProductValues = Product;

export const UPDATE_PRODUCT = gql`
    mutation updateProduct($data: ProductUpdateInput!, $where: ProductWhereUniqueInput!) {
        updateProduct(data: $data, where: $where)
        {
            name
            id
        }
    }
`;

export const fetchExactProductData = async (
  setProduct: React.Dispatch<React.SetStateAction<Product>>,
  id: any
) => {
  const { data } = await client.query({
    query: GET_EXACT_PRODUCT,
    variables: { id: id },
  });

  if (data) {
    setProduct(data.product);
  }
};

export const handleFormSubmit = async (values: ProductValues) => {
  const { data } = await client.mutate<ProductValues>({
    mutation: UPDATE_PRODUCT,
    variables: {
      data: {
        name: values.name,
        description: values.description,
        price: values.price,
        category: values.category,
        destinationCountry: values.destinationCountry,
        height: values.height,
        latinName: values.latinName,
        variety: values.variety,
        image: values.image,
      }, where: {
        id: values.id
      }
    },
  });

  if (data) {
    alert('UPDATED');
  }
};

export const PriceComponent = ({ field }: FieldProps<ProductValues>) => (
  <TextField
    required
    type="number"
    id="standard-required"
    margin="normal"
    label={ field.name }
    { ...field }
  />);

export const TextComponent: React.FC<FieldProps<ProductValues>> = ({
  field, form
}) => {

  const isFormValid = form && form.errors && form.errors.hasOwnProperty(field.name);

  return (
    <div>
      <TextField
        error={ isFormValid }
        id="standard-required"
        label={ field.name }
        margin="normal"
        defaultValue={ 'x' }
        fullWidth={ true }
        variant={ 'standard' }
        { ...field }
      />
      <span>
        {
          form &&
          form.errors &&
          form.errors.name
        }
      </span>
    </div>
  );
};

export const addProductSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  latinName: Yup.string()
    .required('Required'),
  category: Yup.string()
    .required('Required'),
  height: Yup.number()
    .required('Required'),
  description: Yup.string()
    .required('Required'),
  price: Yup.number()
    .required('Required'),
  variety: Yup.string()
    .required('Required'),
  destinationCountry: Yup.string()
    .required('Required'),
});

export const EditProduct = ({ match }: any) => {
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

  if (!product) {
    return <></>;
  }

  return (
    <Paper className={ classes.root }>
      <Typography className="mb-m" variant={ 'h5' }>Add new product</Typography>

      <Formik
        initialValues={ product }
        enableReinitialize={ true }
        onSubmit={ (values) => handleFormSubmit(values) }
        validationSchema={ addProductSchema }
        render={ (formikBag: FormikProps<ProductValues>) => (
          <Form>
            <Grid
              container
              spacing={ 3 }
              direction="column"
            >
              <Grid item xs={ 4 }>
                <Field
                  name="name"
                  component={ TextComponent }
                />
              </Grid>
              <Grid item xs={ 4 }>
                <Field
                  name="description"
                  component={ TextComponent }
                />
              </Grid>
              <Grid item xs={ 4 }>
                <Field
                  name="latinName"
                  component={ TextComponent }
                  type="number"
                />
              </Grid>
              <Grid item xs={ 4 }>
                <Field
                  name="category"
                  component={ TextComponent }
                  type="number"
                />
              </Grid>
              <Grid item xs={ 4 }>
                <Field
                  name="variety"
                  component={ TextComponent }
                  type="number"
                />
              </Grid>
              <Grid item xs={ 4 }>
                <Field
                  name="destinationCountry"
                  component={ TextComponent }
                  type="number"
                />
              </Grid>
              <Grid item xs={ 4 }>
                <Field
                  name="image"
                  component={ TextComponent }
                  type="number"
                />
              </Grid>
              <Grid item xs={ 4 }>
                <Field
                  name="height"
                  component={ PriceComponent }
                  type="number"
                />
              </Grid>
              <Grid item xs={ 4 }>
                <Field
                  name="price"
                  component={ PriceComponent }
                  type="number"
                />
              </Grid>
            </Grid>

            <div>
              <Button
                variant="contained"
                type="submit"
                className="color-primary mt-m"
              >
                Add product
              </Button>
            </div>
          </Form>
        ) }
      />
    </Paper>
  );
};