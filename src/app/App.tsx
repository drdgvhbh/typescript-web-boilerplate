import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Hello } from './components/Hello';

const App = () => (
  <Hello compiler="Typescript" framework="React" bundler="Webpack" />
);
const AppHot = hot(module)(App);

ReactDOM.render(<AppHot />, document.getElementById('root'));
