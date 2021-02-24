import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class commentsModal extends Component  {

  render (){
    return (
      <Modal
        trigger={<Button inverted size="huge">Avaa Modaali</Button>}
        header='Modaali !!'
        content='Tässä mallin vuoksi tällänen modaali'
        actions={['OK', { key: 'done', content: 'Peruuta', negative: true }]}
      />
    )
  }
}

// function ModalExampleShorthand() {
  

export default commentsModal