import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Hello } from './components/Hello';

const App = () => (
  <Hello compiler="Typescript" framework="React" bundler="Webpack" />
);
export default hot(module)(App);
