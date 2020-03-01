import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { gql } from 'apollo-boost';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { client } from '../../lib/apollo/client';
import { Product } from '../../lib/index';
import { GET_PRODUCTS } from '../productsList/productsList';

export type ProductValues = Omit<Product, 'id'>;

export const productInitialValues: ProductValues = {
  name: '',
  latinName: '',
  category: '',
  createDate: '',
  height: 0,
  description: '',
  price: 0,
  variety: '',
  destinationCountry: '',
  image: ''
};

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!,
    $description: String!,
    $price: Float!,
    $category: String!,
    $destinationCountry: String!,
    $height: Float!,
    $latinName: String!,
    $variety: String!
    $image: String!
  ) {
    createProduct(data: {
      name: $name,
      description: $description,
      price: $price,
      category: $category,
      createDate: "2015-11-22T13:57:31.43Z",
      destinationCountry: $destinationCountry,
      height: $height,
      latinName: $latinName,
      variety: $variety,
      image: $image
    })
    {
      name
      id
    }
  }
`;

export const handleFormSubmit = async (values: ProductValues) => {
  const { data } = await client.mutate<ProductValues>({
    mutation: ADD_PRODUCT,
    // refetchQueries: GET_PRODUCTS,
    variables: {
      name: values.name,
      description: values.description,
      price: values.price,
      category: values.category,
      createDate: '2015-11-22T13:57:31.43Z',
      destinationCountry: values.destinationCountry,
      height: values.height,
      latinName: values.latinName,
      variety: values.variety,
      image: values.image
    },
  });

  if(data) {
    alert('PRZESZLO');
  }
};

export const PriceComponent = ({ field }: FieldProps<ProductValues>) => (
  <TextField
    required
    type="number"
    id="standard-required"
    margin="normal"
    label={field.name}
    { ...field }
  />);

export const TextComponent: React.FC<FieldProps<ProductValues>> = ({
  field, form
}) => {

  const isFormValid = form && form.errors && form.errors.hasOwnProperty(field.name);

  return(
    <div>
      <TextField
        error={isFormValid}
        id="standard-required"
        label={ field.name }
        margin="normal"
        fullWidth={ true }
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
  )
};

export const addProductSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  latinName: Yup.string()
    .required('Required'),
  category:  Yup.string()
    .required('Required'),
  height: Yup.number()
    .required('Required'),
  description:Yup.string()
    .required('Required'),
  price: Yup.number()
    .required('Required'),
  variety: Yup.string()
    .required('Required'),
  destinationCountry: Yup.string()
    .required('Required'),
});

export const AddProduct = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
  }));

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography className="mb-m" variant={'h5'}>Add new product</Typography>

      <Formik
        initialValues={ productInitialValues }
        onSubmit={ (values) => handleFormSubmit(values) }
        validationSchema={ addProductSchema }
        render={ (formikBag: FormikProps<ProductValues>) => (
          <Form>
						<pre>
							{
                JSON.stringify(formikBag, null, 2)
              }
						</pre>
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