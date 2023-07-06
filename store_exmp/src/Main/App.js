import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import '../App.css';
import Home from '../pages/Home';
import Cart from '../components/Cart';
import DetailPage from '../pages/DetailPage';
import ErrorPage from '../pages/ErrorPage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'react-multi-carousel/lib/styles.css';
import 'react-slideshow-image/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from '../pages/LoginPage';
import history from '../history';
import { renderedItems } from '../actions';
import WishList from '../components/WishList';
import Compare from '../pages/Compare';

import 'antd/dist/antd.css';

function App() {



  return (
    <div>
      <BrowserRouter history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/item/:id" exact component={DetailPage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
