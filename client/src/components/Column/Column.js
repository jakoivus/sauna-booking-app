import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react';
import { Chart, Column } from '../../components'


class omaColumn extends Component {

    render () {
      return (
      <div>
      <Grid columns={2} stackable>    
        <Grid.Column>
          <Chart />
        </Grid.Column>
        {/* <Grid.Column>
          Kaksi
        </Grid.Column> */}
        <Grid.Column>
        <Link to="/home">
            <Button ui inverted size="huge">Etusivu</Button>
          </Link>
        </Grid.Column>
      </Grid>

      </div>
)
}}

export default omaColumn