// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import TableProjects from 'src/views/tables/TableProjects'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Projects' titleTypographyProps={{ variant: 'h6' }} />
          <TableProjects />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
