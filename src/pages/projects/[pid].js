import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'

export default () => {
    const router = useRouter();
    const { pid } = router.query;
    const [project, setProject] = useState([]);
    const [btnSuccess, setBtnSuccess] = useState(0);
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`/api/projects/?pid=${pid}`);
            const [data] = await response.json();
            
            setProject(data);
        };

        getData();
    }, [pid]);

    const saveProject = async (e) => {
        e.preventDefault();

        const saveResponse = await fetch(`/api/projects/`, {
            method: 'POST',
            body: JSON.stringify(project)
        });

        if (saveResponse.ok) {
            setBtnSuccess(1);

            setTimeout(() => setBtnSuccess(0), 3000);
        } else {
            setBtnSuccess(2);
        }
    }

    const deleteProject = async (e) => {
        e.preventDefault();

        const delResponse = await fetch(`/api/projects/`, {
            method: 'DELETE',
            body: JSON.stringify(project)
        });

        if (delResponse.ok) {
            document.location.href = '/projects';
        } else {
            alert('Failed to delete project');
        }
    }

    return (
        <Card>
            <CardHeader title={project.name} />
            <CardContent>
                <form onSubmit={saveProject}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='project-name'>Project name</InputLabel>
                            <OutlinedInput
                                label='Project Name'
                                value={project.name || ''}
                                id='project-name'
                                name='name'
                                onChange={e => setProject({...project, name: e.target.value })}
                                aria-describedby='project-name-helper'
                                type="text"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='project-goal'>Project goal</InputLabel>
                            <OutlinedInput
                                label='Project Goal'
                                value={project.goal || '0'}
                                id='project-goal'
                                name='goal'
                                onChange={e => setProject({...project, goal: e.target.value })}
                                aria-describedby='project-goal-helper'
                                type="number"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='project-tracked'>Total Tracked</InputLabel>
                            <OutlinedInput
                                label='Tracked'
                                value={project.total_tracked || '0'}
                                id='project-tracked'
                                name='total_tracked'
                                disabled
                                onChange={e => e.preventDefault()}
                                aria-describedby='project-tracked-helper'
                                type="number"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                            gap: 5,
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            }}
                        >
                            <Button type='submit' variant='contained' size='large' color={(btnSuccess === 1) ? `success` : ((btnSuccess === 2) ? `error` : `primary`)}>
                                {(btnSuccess === 1) ? `Success!` : ((btnSuccess === 2) ? `Error!` : `Save`)}
                            </Button>
                            <Box sx={{ display: 'flex', alignItems: 'end' }} onClick={deleteProject}>
                                <Button type='button' variant='contained' size='large' color="error">
                                    Delete
                                </Button>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'end' }}>
                                <Link href='/projects'>
                                    Back to projects
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                </form>
            </CardContent>      
        </Card>
    );
};
