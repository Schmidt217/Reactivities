import Grid2 from '@mui/material/Grid2';
import ActivityList from './ActivityList';
import ActivityFilters from './ActivityFilters';

function ActivityDashboard() {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 8 }} paddingBottom={3}>
        <ActivityList />
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 4 }}
        sx={{
          // Only apply sticky positioning on medium and larger screens
          display: { xs: 'block', md: 'block' }, // Ensure it's always block
          position: { xs: 'static', md: 'sticky' },
          top: { xs: 'auto', md: 112 },
          alignSelf: { xs: 'auto', md: 'flex-start' },
        }}
      >
        <ActivityFilters />
      </Grid2>
    </Grid2>
  );
}

export default ActivityDashboard;
