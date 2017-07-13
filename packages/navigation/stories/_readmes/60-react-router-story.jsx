import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { name } from '../../package.json';
import TitledPage from '../components/react-router/TitledPage';

function makePage(title) {
  return () => <TitledPage title={title} />;
}

storiesOf(name, module)
  .add('with react-router', () => (
    <Router history={browserHistory}>
      <Route component={makePage('Container home')} path="/iframe.html" />
      <Route component={makePage('Page 1')} path="/page1" />
      <Route component={makePage('Page 2')} path="/page2" />
      <Route component={makePage('Page 3')} path="/page3" />
      <Route component={makePage('Page 4')} path="/page4" />
    </Router>
  )
);
