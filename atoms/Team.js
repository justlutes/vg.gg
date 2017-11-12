import React from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import { Image } from 'cloudinary-react';
import Router from 'next/router';


export default class Team extends React.Component {
    componentDidMount() {
        this.socket = io();
    }
    handleClick = (name) => {
        this.socket.emit('player', name);
        Router.push({
            pathname: '/stats',
        });
    }
    render() {
        const { featured, team } = this.props;
        return (
            <Column>
                {Object.values(team).map(member => (
                    <Player key={member.name}>
                        <Image cloudName="kyle-lutes" publicId={`${member.hero.toLowerCase()}.png`} width="25" crop="scale"/>
                        <User isFeatured={featured === member.id} onClick={() => this.handleClick(member.name)}>{member.name}</User>
                    </Player>
                ))}
            </Column>
        )
    }
}

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Player = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const User = styled.div`
    margin-left: 10px;
    cursor: pointer;
    color: ${props => (props.isFeatured ? '#E9E9E9' : '#8F8F8F')};
    font-size: 11px;
    transition: color 333ms ease-in-out;
    &:hover {
        color: #f9c983;
    }
`;