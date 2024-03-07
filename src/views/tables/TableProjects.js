// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'total_tracked',
    label: 'Total Tracked',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'goal',
    label: 'Goal',
    minWidth: 170,
    align: 'right',
    format: value => `${value}`
  },
  {
    id: 'complete',
    label: 'Complete',
    minWidth: 170,
    align: 'right',
    format: value => `${value}%`
  }
]

function createData(id, name, total_tracked, goal) {
  return { 
    id, 
    name: name || '-- No data --', 
    total_tracked: total_tracked ? total_tracked.toFixed(2) : 0, 
    goal, 
    complete: ((total_tracked * 100) / goal).toFixed(2) 
  }
}

const TableProjects = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/projects/");
      const data = await response.json();
      
      setProjects(data);
    };

    getData();
  }, []);

  console.log(projects);

  const rows = projects.length ? projects.map((project) => {
    return createData(project._id, project.name, project.total_tracked, project.goal);
  }) : [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id];

                    if (column.id === 'name') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Link href={`/projects/${row.id}`}>{value}</Link>
                        </TableCell>
                      )
                    } else {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      )
                    }
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableProjects
