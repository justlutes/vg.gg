import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import styled from 'styled-components';

import NavItem from '../atoms/NavItem';

class Navigation extends React.Component {
  constructor() {
    super();

    this.state = {
      active: false,
    };
  }
  render() {
    return (
      <nav className="navbar" aria-label="main navigation">
        <div className="navbar-brand">
          <Link prefetch href="/">
            <HomeLink className="navbar-item">
              <h2>VG.GG</h2>
            </HomeLink>
          </Link>
          <Button
            className={`button navbar-burger ${this.state.active
              ? 'is-active'
              : null}`}
            onClick={() => this.setState({ active: !this.state.active })}
          >
            <Line />
            <Line />
            <Line />
          </Button>
        </div>
        <div
          className={`navbar-menu ${this.state.active ? 'is-active' : null}`}
        >
          <div className="navbar-end">
            <NavItem
              link=""
              text="home"
              active={this.props.router.pathname === '/'}
            />
            <NavItem
              link="heroes"
              active={this.props.router.pathname === '/heroes'}
            />
            <NavItem
              link="items"
              active={this.props.router.pathname === '/items'}
            />
            <NavItem
              link="streams"
              active={this.props.router.pathname === '/streams'}
            />
          </div>
        </div>
      </nav>
    );
  }
}

const Button = styled.button`
  border: none !important;
  background-color: transparent !important;
`;

const HomeLink = styled.div`cursor: pointer;`;

const Line = styled.span`background-color: #fff !important;`;

export default withRouter(Navigation);
