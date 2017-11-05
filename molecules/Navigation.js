import React from "react";
import Link from "next/link";
import styled from "styled-components";

import NavItem from "../atoms/NavItem";

export default class Navigation extends React.Component {
  constructor() {
    super();

    this.state = {
      active: false
    };
  }
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link prefetch href="/">
            <HomeLink className="navbar-item">
              <h2>VG.GG</h2>
            </HomeLink>
          </Link>
          <Button
            className={`button navbar-burger ${this.state.active ? "is-active" : null}`}
            onClick={() => this.setState({ active: !this.state.active })}
          >
            <span />
            <span />
            <span />
          </Button>
        </div>
        <div
          className={`navbar-menu ${this.state.active ? "is-active" : null}`}
        >
          <div className="navbar-end">
            <NavItem text="home" />
            <NavItem link="heroes" />
            <NavItem link="stats" />
            <NavItem link="leaderboards" />
          </div>
        </div>
      </nav>
    );
  }
}

const Button = styled.button`
    border: none !important;
`;

const HomeLink = styled.div`
    cursor: pointer;
`;
