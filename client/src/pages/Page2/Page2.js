import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

class Page2 extends Component {  

  render () {
    
  return (
    <div className="home page-content flex-column flex-justify-center">
      <h1 className="main-header inverted-text">Sivu 2</h1>
      <h2 className="sub-header inverted-text">Lipsum lpsum liirym </h2>
        <Link to="/home">
          <Button ui inverted size="huge">Etusivu</Button>
        </Link>
      </div>
  );
}
}

export default (Page2);