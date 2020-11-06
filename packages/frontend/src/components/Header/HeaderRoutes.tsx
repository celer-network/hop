import React, { FC, ChangeEvent } from 'react'
import { useLocation , useHistory} from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

type Props = {}

const HeaderRoutes: FC<Props> = () => {
  const location = useLocation()
  const history = useHistory()

  const handleChange = (event: ChangeEvent<{}>, value: string) => {
    history.push(value)
  }

  return (
    <Tabs value={location.pathname} onChange={handleChange}>
      <Tab label="Send" value="/send"/>
      <Tab label="Pool" value="/pool"/>
      <Tab label="Stake" value="/stake"/>
    </Tabs>
  )
}

export default HeaderRoutes