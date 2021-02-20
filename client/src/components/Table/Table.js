import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

const EducationTable = () => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Koulutus</Table.HeaderCell>
        <Table.HeaderCell>Vuosi</Table.HeaderCell>
        <Table.HeaderCell>Oppilaitos</Table.HeaderCell>
        <Table.HeaderCell>Pääaineet</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <div>Tekniikan Tohtori, TkT
          {/* <Label ribbon>Korkein</Label> */}
          
          </div>        </Table.Cell>
        <Table.Cell>2000</Table.Cell>
        <Table.Cell>Oulun Yliopopisto</Table.Cell>
        <Table.Cell>Mikroelektroniikka ja materiaalifysiikka</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Master or Business Administration,  MBA</Table.Cell>
        <Table.Cell>2007</Table.Cell>
        <Table.Cell>Reading University, Henley Business School</Table.Cell>
        <Table.Cell>Strategia ja Muutosjohtaminen</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Filosofian Maisteri, FM</Table.Cell>
        <Table.Cell>1996</Table.Cell>
        <Table.Cell>Oulun Ylioposto</Table.Cell>
        <Table.Cell>Kokeellinen</Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer>
      <Table.Row>

      </Table.Row>
    </Table.Footer>
  </Table>
)

export default EducationTable