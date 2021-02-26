import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'Hra' },
  { key: 'f', text: 'Female', value: 'Rva' },
  { key: 'n', text: 'Neiti', value: 'Nt' },
  { key: 'd', text: 'Female', value: 'Rva' },
  { key: 'o', text: 'Other', value: 'other' },
]

class FormWithControl extends Component {
  state = {}

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
            placeholder='Titteli'
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
        <Form.TextArea label='About' placeholder='Tell us more about you...' />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}

export default FormWithControl