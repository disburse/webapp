import React from 'react'
import { Accordion, Header } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react';

const panels = [
  {
    key: 'collect-data',
    title: 'Do you collect data?',
    content: ['The disburse.finance project does not collect any user data.'],
  },
  {
    key: 'open-source',
    title: 'Is the code open-source?',
    content: ['https://github.com/disburse'],
  }
]

const Faq = () => (
  <div>
      <Grid textAlign='left' columns={1}>
          <Grid.Column>
                <Header size='medium'>Frequently Asked Questions</Header>      
              <Accordion panels={panels} />
          </Grid.Column>
      </Grid>
  </div>
)

export default Faq