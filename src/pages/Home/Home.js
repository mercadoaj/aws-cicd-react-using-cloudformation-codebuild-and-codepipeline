import React, { Component } from 'react';
import './../../styles/App.css';
import AppNavbar from './../../components/AppNavbar/AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button color="link"><Link to="/persons">Persons</Link></Button>
                </Container>
            </div>
        );
    }
}

export default Home;