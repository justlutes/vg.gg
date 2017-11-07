import React from "react";
import styled from "styled-components";

export default ({ title }) => <Title>{title}</Title>;

const Title = styled.h1`
position: relative;
color: #fff;
text-transform: uppercase;
font-size: 20px;
margin-bottom: 20px;
font-weight: 700;
&::after {
  content: "";
  height: 4px;
  width: 15em;
  position: absolute;
  left: 2.5%;
  bottom: -3px;
  right: -10%;
  background-color: #F9C983;
}
}
`;
