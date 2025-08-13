import { Group } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router';

function HomePage() {
  return (
    <Paper
      sx={{
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 3, sm: 6 },
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Use minHeight instead of fixed height
        backgroundImage:
          'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)',
        padding: { xs: 2, sm: 4 }, // Add some responsive padding
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens
          alignItems: 'center',
          alignContent: 'center',
          color: 'white',
          gap: { xs: 1, sm: 3 },
        }}
      >
        <Group sx={{ height: { xs: 70, sm: 110 }, width: { xs: 70, sm: 110 } }} />
        <Typography variant="h1" sx={{ fontSize: { xs: '3rem', sm: '6rem' } }}>
          Reactivities
        </Typography>
      </Box>
      <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '3rem' } }}>
        Welcome to Reactivities
      </Typography>
      <Button
        component={Link}
        to="/activities"
        size="large"
        variant="contained"
        sx={{
          height: { xs: 60, sm: 80 },
          borderRadius: 4,
          fontSize: { xs: '1rem', sm: '1.5rem' },
          px: { xs: 2, sm: 3 }, // Add some horizontal padding
          py: { xs: 1, sm: 2 }, // Add some vertical padding
        }}
      >
        Take me to the activities!
      </Button>
    </Paper>
  );
}

export default HomePage;
