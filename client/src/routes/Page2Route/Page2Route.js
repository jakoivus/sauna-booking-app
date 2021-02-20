import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import  NavBar  from '../../components/NavBar/NavBar';
import { BgContainer } from '../../containers';
import { Page2 } from '../../pages';  

const Page2Route= (props) => {

  useEffect(() => {
  });

  return (
    <div style={{height: "100%"}}>
     <NavBar />
      <BgContainer>
        <Page2 />
      </BgContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Page2Route);