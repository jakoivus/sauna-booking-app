import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import './Page4.css'


class Page4 extends Component {
    render () {
        return (
            <div className="page4 page4-justify-center">
                <h1>SIVU 4</h1>
                <div className="page4-flex-row"> 
                    <div>
                        <Grid columns={2} >
                            <Grid.Column>
                            Sarake 1
                            </Grid.Column>
                            <Grid.Column>
                            Sarake                             2
                            </Grid.Column>
                        </Grid>
                        
                    </div>
                    <div>
                        Toinen
                    </div>
                
                </div>
              
            </div>
        )
    }
}
export default Page4