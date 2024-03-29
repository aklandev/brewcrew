// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import TableOrders from 'src/views/tables/TableOrders'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Orders' titleTypographyProps={{ variant: 'h6' }} />
          <TableOrders />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
