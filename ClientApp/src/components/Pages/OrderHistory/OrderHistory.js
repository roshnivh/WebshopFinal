import React, { Component } from 'react';
import { Link} from "react-router-dom";
import { Container, Grid, Segment, Header, Menu, Table} from 'semantic-ui-react';


export class OrderHistory extends Component{
constructor(props) {

    super(props);
    this.state = { isLoading: "Loading", orders: [] , activeItem: 'Bestellingen'};

    fetch("/api/Order")
        .then(response => response.json())
        .then(data => {
        this.setState({ ...this.state, orders: data, isLoading: "Loading" });
        });
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    renderOrderTable(orders) {
    return (
        <Table celled>
        <Table.Header>
            <Table.Row>
            <Table.HeaderCell>Bestelling id</Table.HeaderCell>
            <Table.HeaderCell>Postcode</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Datum</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
        {this.state.orders.map(order => (
            <Table.Row key= {order.id}>
            <Table.Cell>{order.id}</Table.Cell>
            <Table.Cell>{order.zipCode}</Table.Cell>
            <Table.Cell>{order.orderStatus}</Table.Cell>
            <Table.Cell>{order.date}</Table.Cell>
            </Table.Row>
            
                ))}
            </Table.Body>
        </Table>
    
    );
    }

    render() {
    let contents = this.renderOrderTable(this.state.orders);

    const { activeItem } = this.state
    
    return (
    <Container style={{ marginTop: "7em" }}>
    <Grid>
        <Grid.Column width={4}>
        <Header as='h2' attached='top'>
        Instellingen
        </Header>
            <Menu fluid vertical  >
            <Segment attached >
                <Menu.Item name='Gegevens' as={Link} to="/userprofile" active={activeItem === 'Gegevens'} onClick={this.handleItemClick}/>
                <Menu.Item name='Wachtwoord wijzigen' as={Link} to="/password" active={activeItem === 'Wachtwoord wijzigen'} onClick={this.handleItemClick}/>
                <Menu.Item name='Bestellingen'  active={activeItem === 'Bestellingen'} onClick={this.handleItemClick} />
            </Segment>
            </Menu>
            </Grid.Column>
            <Grid.Column stretched width={12}>
            <Header as='h2' attached='top'>
            {this.state.activeItem}
            </Header>
            <Segment attached>
                {contents}
            </Segment>
        </Grid.Column>
    </Grid>
    </Container>
    )
  }
}
        