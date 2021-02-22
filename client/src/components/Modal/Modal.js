import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

function ModalExampleShorthand() {
  return (
    <Modal
      trigger={<Button>Show Modal</Button>}
      header='Modaali !!'
      content='Tässä mallin vuoksi tällänen modaali'
      actions={['OK', { key: 'done', content: 'Peruuta', negative: true }]}
    />
  )
}

export default ModalExampleShorthand