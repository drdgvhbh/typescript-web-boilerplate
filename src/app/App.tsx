import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes';

const App = () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);
export default hot(module)(App);
