import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
  public render() {
    return (
    <div className="main-nav">
      <div className="navbar navbar-inverse">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to={'/'}>eMind</Link>
        </div>
        <div className="clearfix"></div>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li>
              <NavLink exact to={'/'} activeClassName="active">
                <span className="glyphicon glyphicon-home"></span> Home
              </NavLink>
            </li>
            <li>
              <NavLink to={'/workspace'} activeClassName="active">
                <span className="glyphicon glyphicon-education"></span> Mind Map Workspace
              </NavLink>
            </li>
            <li>
              <NavLink exact to={'/widgets'} activeClassName="active">
                <span className="glyphicon glyphicon-object-align-left"></span> Widgets Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to={'/about'} activeClassName="active">
                <span className="glyphicon glyphicon-th-list"></span> About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    );
  }
}
