import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Form } from 'semantic-ui-react'
import * as actions from '../../store/actions/index';

const options = [
  { key: 'm', text: 'Mies', value: 'Hra' },
  { key: 'f', text: 'Nainen', value: 'Rva' },
  // { key: 'n', text: 'Neiti', value: 'Nt' },
  // { key: 'd', text: 'Female', value: 'Rva' },
  { key: 'o', text: 'Muu', value: 'other' },
]

class FormWithControl extends Component {
  state = {}
  handleClick = () => {
    this.props.helloWorld()
    window.alert("lähetä nappia painettu")
  } 

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Input 
            fluid label='Etunimi' 
            placeholder='Etunimi' />
          <Form.Input 
            fluid label='Sukunimi' 
            placeholder='Sukunimi' />
          <Form.Select
            fluid label='Puhuttelu'
            options={options}
            placeholder='Sukupuoli'
          />
        </Form.Group>
        <Form.Group width='200'>
            <Form.Input
              size='20'
              fluid label='Sähköposti'
              iconPosition='left'
              icon='at'
              placeholder='sähköposti osoite'
              style={{width:'290px'}}
            
            />
                
        </Form.Group>
        {/* <Form.Group inline>
          <label>Size</label>
          <Form.Radio
            label='Small'
            value='sm'
            checked={value === 'sm'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='Medium'
            value='md'
            checked={value === 'md'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='Large'
            value='lg'
            checked={value === 'lg'}
            onChange={this.handleChange}
          />
        </Form.Group> */}
        <Form.TextArea label='Lisätiedot' placeholder='Muuta tietämisen arvoista...' />
        <Form.Checkbox label='Hyväksyn tietosuoja selosteen' />
        <Form.Button onClick={(props)=>{
          console.log ("CLICK")
          this.handleClick(props)}}
          >Lähetä</Form.Button>
          
      </Form>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    helloWorld: () => dispatch(actions.helloWorld()),

  }
}


export default (connect(mapStateToProps, mapDispatchToProps)(FormWithControl))