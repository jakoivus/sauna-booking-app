import React from 'react';
import { Button } from 'semantic-ui-react'
import './Page3.css';
import { EducationTable } from '../../components'

const Page3 = (props) => {
  
  return (
    <div className="home page-content flex-column flex-justify-center">
      <h1 className="main-header inverted-text">Sivu 3</h1>
      <h4 className="paragraph-text inverted-text">Lipsum lopsum liirum </h4>
      <h4 className="paragraph-text inverted-text">Hokkus pokkus hölökyn kölökyn</h4>

        

      <Button ui inverted size="huge" onClick={()=>window.alert("Tässä tietokanta haku kunhan ehtii tehdä" )}> Tähän pitäs lisätä DB haku</Button>

        <EducationTable />
        
      </div>
  );
}

export default (Page3);