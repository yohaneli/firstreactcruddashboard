import Page from 'material-ui-shell/lib/containers/Page'
import React, {useContext} from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'
import { FirebaseContext } from 'components/Firebase'

const HomePage = () => {

  const firebase = useContext(FirebaseContext);

  const intl = useIntl();

  console.log("Firebase : ",firebase);

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        {intl.formatMessage({ id: 'home' })}
      </Scrollbar>
    </Page>
  )
}
export default HomePage
