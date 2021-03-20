import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid } from 'semantic-ui-react';
import { Chart } from '../../components'

class Page2 extends Component {  

  render () {
  return (
      

    <div>
      
    <Container className="container"> TESTI</Container>
    <div className="home page-content  flex-justify-center">
      <h1 className="main-header inverted-text">Sivu 2</h1>
      <h2 className="sub-header inverted-text">Lipsum lpsum liirym</h2>
      
      <Link to="/home">   
            <Button inverted size="huge">Etusivu</Button>
          </Link>
          <Chart />      
      </div>
    </div>
  );
}
}

export default (Page2);