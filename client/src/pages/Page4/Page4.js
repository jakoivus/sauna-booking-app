import React, { Component } from 'react'
import { Grid, Form, Table } from 'semantic-ui-react'
import { Chart } from '../../components'
import './Page4.css'


class Page4 extends Component {
    render () {
        return (
            <div className="home "
            //  className="home page-content flex-column flex-justify-center"
             >
            {/* <h1 className="main-header">Kommentti sivu</h1> */}
            <div >
            <Grid columns={2} >
            <Grid.Column>
            <div  className="center" >
            <Form >
                <div className="page4-flex-row ">
                    <Form.Button onClick={(props)=>{
                    window.alert("lisää kommentti")}}
                    >Lisää kommentti</Form.Button>
                    <Form.Button onClick={(props)=>{
                    window.alert("poista kommentti")}}
                    >poista kommentti</Form.Button>
                </div>
                <Form.Group widths="equal">
                    {/* <Form.Input 
                    placeholder="id"
                    fluid label="ID"/> */}
                    <Form.Input 
                    placeholder="name"
                    fluid label="Nimi"/>
                    <Form.Input 
                    placeholder="sähköposti"
                    fluid label="sähköposti"
                    icon="at"
                    iconPosition="left" />
                    <Form.Input 
                    placeholder="body"
                    fluid label="Kommentti"/>
                </Form.Group>
            </Form>            
            </div>
            </Grid.Column>
            <Grid.Column>
            <div className="center">
            <div className="page4-justify-center">  
            Tähän lista kommenteista
            {/* <Table celled>
            <Table.Header>
                <Table.Row >   
                    <Table.HeaderCell>id</Table.HeaderCell>
                    <Table.HeaderCell>Nimi</Table.HeaderCell>
                    <Table.HeaderCell>s-Posti</Table.HeaderCell>
                    <Table.HeaderCell>Kommentti</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Row >
              <Table.Cell> {comment.id}</Table.Cell>
              <Table.Cell> {comment.name}</Table.Cell>
              <Table.Cell> {comment.email}</Table.Cell>
              <Table.Cell> {comment.body}</Table.Cell>
            </Table.Row>
            </Table>
            <Chart /> */}
            </div>
            </div>
            </Grid.Column>
        </Grid>
        
            </div>
            {/* <div className="paragraph-text">
                Toinen
            </div> */}
        
        </div>
              
        // </div>
        )
    }
}
export default Page4