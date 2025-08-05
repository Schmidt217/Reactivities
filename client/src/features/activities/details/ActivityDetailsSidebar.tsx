import {
  Paper,
  Typography,
  List,
  ListItem,
  Chip,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid2,
} from '@mui/material';

type Props = {
  activity: Activity;
};

function ActivityDetailsSidebar({ activity }: Props) {
  const numberOfAttendees = activity.attendees.length;
  return (
    <>
      <Paper
        sx={{
          textAlign: 'center',
          border: 'none',
          backgroundColor: 'primary.main',
          color: 'white',
          p: 2,
        }}
      >
        <Typography variant="h6">
          {numberOfAttendees} {numberOfAttendees > 1 ? 'people' : 'person'}{' '}
          going
        </Typography>
      </Paper>
      <Paper sx={{ padding: 2 }}>
        {activity.attendees.map(attendee => (
          <Grid2 key={attendee.id} container alignItems="center">
            <Grid2 size={8}>
              <List sx={{ display: 'flex', flexDirection: 'column' }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{ width: 75, height: 75, mr: 3 }}
                      alt={`${attendee.displayName} image`}
                      src={`${attendee?.imageUrl}`}
                    />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography variant="h6">{attendee.displayName}</Typography>
                    {attendee.following && (
                      <Typography variant="body2" color="orange">
                        Following
                      </Typography>
                    )}
                  </ListItemText>
                </ListItem>
              </List>
            </Grid2>
            <Grid2
              size={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 1,
              }}
            >
              {activity.hostId === attendee.id && (
                <Chip
                  label="Host"
                  color="warning"
                  variant="filled"
                  sx={{ borderRadius: 2 }}
                />
              )}
            </Grid2>
          </Grid2>
        ))}
      </Paper>
    </>
  );
}

export default ActivityDetailsSidebar;
