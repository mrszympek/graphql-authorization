import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import ApolloProvider from 'react-apollo/ApolloProvider';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './App.scss';
import { Profile } from './components/profile/profile';
import { client } from './lib/apollo/client';
import { RoutingComponent } from './lib/routing/routing';
import logo from  './logo.png';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#e2a022",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export const App = () => {
  const classes = useStyles();

  return (
    <ApolloProvider client={ client }>
      <Router>
        <div className={ classes.root }>
          <CssBaseline />
          <AppBar position="fixed" className={ classes.appBar }>
            <Toolbar>
              <Typography variant="h6" noWrap color={'inherit'}>
                <Link to="/" className="logo">
                  <img src={logo} alt="" />
                  ScanTree
                </Link>
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={ classes.drawer }
            variant="permanent"
            classes={ {
              paper: classes.drawerPaper,
            } }
          >
            <div className={ classes.toolbar } />

            <Profile/>


            <div className="nav">
              {/*<Link className="nav-link" to="/dashboard">Dashboard</Link>*/}
              <Link className="nav-link" to="/products">Products List</Link>
              <Link className="nav-link" to="/add-product">Add new product</Link>
            </div>


          </Drawer>
          <main className={ classes.content }>
            <div className={ classes.toolbar } />
            <RoutingComponent />
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
};