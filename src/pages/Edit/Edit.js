import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './../../components/AppNavbar/AppNavbar';

class Edit extends Component {

    emptyItem = {
        firstName: '',
        lastName: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'save') {
            let id = this.props.match.params.id
            const client = await (await fetch('https://tfk4h1ivz7.execute-api.ap-southeast-1.amazonaws.com/dev/person/'+id)).json();
            this.setState({item: client});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    const url = "https://tfk4h1ivz7.execute-api.ap-southeast-1.amazonaws.com/dev/person"
    const uri = url+(item.id ? "/"+item.id:"/save") // calls to /save or /{id}
    const what = (item.id) ? 'PUT' : 'POST'
  //  alert(what + ": "+ uri) 
   
    await fetch(uri, {
        method: what,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
    });

    this.props.history.push("/persons")
}

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Person' : 'Add Person'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="first name">First Name</Label>
                        <Input type="text" name="firstName" id="firstName" value={item.firstName || ''}
                               onChange={this.handleChange} autoComplete="firstName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="last name">Last Name</Label>
                        <Input type="text" name="lastName" id="lastName" value={item.lastName || ''}
                               onChange={this.handleChange} autoComplete="lastName"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/persons">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(Edit);