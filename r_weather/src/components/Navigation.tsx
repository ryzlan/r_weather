import * as React from 'react';

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import InputQuery from './InputQuery';

interface Props{
    handleSubmit: (city:string  , country :string ) => void
  }
export default class Navigation extends React.Component<Props>{
    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">React Weather App</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                <InputQuery handleSubmit={this.props.handleSubmit} />
                </Container>
            </Navbar>
        );
    }
}