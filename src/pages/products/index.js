// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import TableProducts from 'src/views/tables/TableProducts'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Products' titleTypographyProps={{ variant: 'h6' }} />
          <TableProducts />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
