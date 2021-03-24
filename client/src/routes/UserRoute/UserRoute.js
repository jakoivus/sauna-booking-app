import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavBar, Footer } from '../../components';
import { BgContainer } from '../../containers';
import   { UserPage } from '../../pages'
const UserRoute = (props) => {

  useEffect(() => {
  });

  return (
    <div style={{height: "100%"}}>
    <NavBar />
      <BgContainer>
        <UserPage />
      </BgContainer>
    <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRoute);