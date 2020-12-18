import React from 'react'
import { Accordion } from 'semantic-ui-react'

const panels = [
  {
    key: 'collect-data',
    title: 'Do you collect data?',
    content: ['The disburse.finance project does not collect any user data.'],
  },
  {
    key: 'open-source',
    title: 'Is the code open-source?',
    content: ['https://github.com/XXXXX'],
  }
]

const Faq = () => (
  <Accordion panels={panels} />
)

export default Faq