import React from 'react';
import {browserHistory, BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom';
import Bundle from './bundle';
import '../styles/style.less';

class Routes extends React.Component {
  renderComponent = (props, component) => {
    return (
      <Bundle load={() => import(`../containers/${component}/index.js`)}>
        {(COM) => <COM {...props} />}
      </Bundle>
    )
  };

  render() {
    return (
      <Router history={browserHistory}>
        <div className='h-app'>
          <ul className='h-app-header'>
            {menus.map(m => (
              <li key={m.path}>
                <Link to={`/${m.path}`}>{m.path}</Link>
              </li>))}
          </ul>
          <Redirect from='/' to='HOME' />
          <Switch>
            {menus.map(m => {
              return (
                <Route key={m.path}
                       exact={!!m.exact}
                       path={`/${m.path}`}
                       component={(props) => this.renderComponent(props, m.component)}
                />)
            })}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routes;
const menus = [
  {path: 'HOME', component: 'home', exact: true},
  {path: 'CROP', component: 'crop'},
  {path: 'TABLE', component: 'table'},
];