
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button} from 'semantic-ui-react';
import { FormWithControl } from '../../components'
import './UserPage.css';
// import * as actions from '../store/actions/index';
// import { User } from '../store/types';

const UserPage = (props) => {

  return (
    
    <div className="user page-content">
    <div className="home page-content flex-column flex-justify-center">
      <h1 className="main-header inverted-text">Omat Tiedot</h1>
        <div className="container">
          <FormWithControl />
        </div>
        {/* </FormWithControl> */}
        <Link to="/home">
          <Button ui inverted size="huge">Etusivu</Button>
        </Link>

      </div>
     </div>
  );
}

const mapStateToProps = (state) => {
  return {
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(UserPage));