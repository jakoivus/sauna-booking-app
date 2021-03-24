import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid } from 'semantic-ui-react';
import { Chart } from '../../components'

class Page2 extends Component {  

  render () {
  return (
    <div className="home page-content  flex-justify-center">
      <h1 className="main-header inverted-text">Sivu 2</h1>
        <Chart /> 
        <div className="container-content" >     
        <Link to="/home">   
          <Button inverted size="huge">Etusivu</Button>
        </Link>
        </div>
      </div>
    
  );
}
}

export default (Page2);