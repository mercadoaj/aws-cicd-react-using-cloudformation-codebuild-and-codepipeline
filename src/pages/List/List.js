import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './../../components/AppNavbar/AppNavbar';
import { Link , withRouter} from 'react-router-dom';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {persons: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('https://tfk4h1ivz7.execute-api.ap-southeast-1.amazonaws.com/dev/person/all')
            .then(response => response.json())
            .then(data => this.setState({persons: data}));
    }

    async remove(id) {
        const where = "https://tfk4h1ivz7.execute-api.ap-southeast-1.amazonaws.com/dev/person/"+id
        await fetch(where, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...this.state.persons].filter(i => i.id !== id);
            this.setState({persons: updatedClients});
        });
    }

    render() {
        const {persons} = this.state;

        const clientList = persons.map(person => {
            return <tr key={person.id}>
                <td style={{whiteSpace: 'nowrap'}}>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/persons/" + person.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(person.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/persons/save">Add Person</Button>
                    </div>
                    <h3>persons</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">First Name</th>
                            <th width="30%">Last Name</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default withRouter(List);