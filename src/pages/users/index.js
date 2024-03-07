// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import TableUsers from 'src/views/tables/TableUsers'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Users' titleTypographyProps={{ variant: 'h6' }} />
          <TableUsers />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
