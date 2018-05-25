import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Background = styled.div`
    display: block;
    position: absolute;
    background-color: rgba(255,255,255,0.8);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
`;

const Container = styled.div`
    margin: 0 auto;
    font-size: 32px;
    font-family: arial;
`;

const Text = styled.p`
    margin: 0 auto;
`;

const Button = styled.button`
    margin: 0 auto;
    display: block;
`;
class WinMessage extends Component {
    render () {
        return this.props.solved
            ? (<Background>
                <Container>
                    <Text>Solved!</Text>
                    <Button onClick={this.props.resetFunction}>Again?</Button>
                </Container>
            </Background>)
            : null;
    }

    static get propTypes() {
        return {
            solved: PropTypes.bool,
            resetFunction: PropTypes.func
        };
    }
}

export default WinMessage;
