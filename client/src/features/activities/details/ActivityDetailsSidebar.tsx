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
import { Link } from 'react-router';

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
          <Grid2
            key={attendee.id}
            container
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <Grid2 size={{ xs: 12, sm: 8 }}>
              <List sx={{ display: 'flex', flexDirection: 'column' }}>
                <ListItem component={Link} to={`/profiles/${attendee.id}`}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: { xs: 50, sm: 75 },
                        height: { xs: 50, sm: 75 },
                        mr: 3,
                      }}
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
              size={{ xs: 12, sm: 4 }}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', sm: 'column' },
                alignItems: { xs: 'center', sm: 'flex-end' },
                gap: 1,
                ml: { xs: 2, sm: 0 },
                mb: { xs: 1, sm: 0 },
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
