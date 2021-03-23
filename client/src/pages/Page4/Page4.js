import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Grid, Form,  Button , Table} from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid'
import * as actions from '../../store/actions/index';
import './Page4.css'

class Page4 extends Component {
    
    state = {
        id:"",
        title:"",
        email:"",
        comment:"",
        }
    
    componentDidMount() {
    }

    componentDidUpdate() {
    }
    
    handleChange = (event, { name, value }) => {
        this.setState({ [name]: value })
      }

    handleAddComment () {
        let comment = {
            id:  uuidv4(),
            title: this.state.title,
            email: this.state.email,
            comment: this.state.comment
        }
        this.props.addComment(comment)
    }

    render () {

        let options =[ 
            { key: '1', value: '1', text: 'Idea' },
            { key: '2', value: '2', text: 'tehtävä' },
        ]
        
        let {title, email, comment} = this.state
        comment = {
            id: 6,
            name: "Jarmo Koivusaari",
            email:"jakoivus",
            body: "juupas joopas",
          }
        return (
            <div className="home flex-justify-center  ">
                <h1></h1>
            <h1 className="main-header inverted-text">Lisää kommentti</h1>
            
            <Grid columns={1} >
            <Grid.Column>
            <div  className="center" >
            <Form >
                <Form.Group widths="equal">
                    <Form.Button onClick={(props)=>{
                      this.handleAddComment()}}
                    >Lisää kommentti</Form.Button>
                    <Form.Select 
                        style={{minwidth: 50, height: 50, color: "black"}} 
                        placeholder="Valitse" 
                        name='rowFilter' 
                        options={options}
                        onChange={this.handleChange} />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Input 
                    fluid label="Otsikko"
                    placeholder="Otsikko"
                    defaultValue={title}
                    name='title'
                    onChange={this.handleChange}/>
                    <Form.Input 
                    fluid label="sähköposti"
                    placeholder="sähköposti"
                    defaultValue={email}
                    name='email'
                    icon="at"
                    iconPosition="left"
                    onChange={this.handleChange} />
                </Form.Group>
                <Form.TextArea
                    label="Kommentti" 
                    placeholder="Kerro ajatuksesi"
                    name='comment'
                    onChange={this.handleChange}/>
            </Form>            
            </div>
            </Grid.Column>
        </Grid>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      comments: state.user.comments
      };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (comment) => dispatch(actions.addComment(comment)),
        getComments: (comments) => dispatch(actions.getComments(comments)),
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Page4)