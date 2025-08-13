import { AccessTime, Place } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from '@mui/material';
import { Link } from 'react-router';
import { formatDate } from '../../../lib/util/util';
import AvatarPopover from '../../../app/shared/components/AvatarPopover';

type Props = {
  activity: Activity;
};

function ActivityCard({ activity }: Props) {
  const label = activity.isHost ? 'You are hosting' : 'You are going';
  const color = activity.isHost
    ? 'secondary'
    : activity.isGoing
    ? 'warning'
    : 'default';

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
      >
        <CardHeader
          avatar={
            <Avatar
              src={activity.hostImageUrl}
              alt="image of host"
              sx={{ height: 80, width: 80 }}
            />
          }
          title={activity.title}
          titleTypographyProps={{
            fontWeight: 'bold',
            fontSize: 20,
          }}
          subheader={
            <>
              Hosted by{' '}
              <Link to={`/profiles/${activity.hostId}`}>
                {activity.hostDisplayName}
              </Link>
            </>
          }
        />
        <Box
          display="flex"
          flexDirection={{ xs: 'row', sm: 'column' }}
          gap={2}
          mr={{ xs: 0, sm: 2 }}
          ml={{ xs: 2, sm: 0 }}
          mb={{ xs: 2, sm: 0 }}
        >
          {(activity.isHost || activity.isGoing) && (
            <Chip
              label={label}
              color={color}
              sx={{ borderRadius: 2 }}
              variant="outlined"
            />
          )}
          {activity.isCancelled && (
            <Chip label="Cancelled" color="error" sx={{ borderRadius: 2 }} />
          )}
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <CardContent sx={{ p: 0 }}>
        <Box display="flex" flexWrap="wrap" alignItems="center" mb={2} px={2}>
          <Box display="flex" flexGrow={0} alignItems="center">
            <AccessTime sx={{ mr: 1 }} />
            <Typography variant="body2" noWrap>
              {formatDate(activity.date)}
            </Typography>
          </Box>
          <Place sx={{ ml: { xs: 0, sm: 3 }, mr: 1 }} />
          <Typography variant="body2">{activity.venue}</Typography>
        </Box>
        <Divider />
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          sx={{ backgroundColor: 'grey.200', py: 3, pl: 3 }}
        >
          {activity.attendees.map(attendee => (
            <AvatarPopover key={attendee.id} profile={attendee} />
          ))}
        </Box>
      </CardContent>
      <CardContent sx={{ pb: 2 }}>
        <Typography variant="body2">{activity.description}</Typography>
        <Button
          component={Link}
          to={`/activities/${activity.id}`}
          size="medium"
          variant="contained"
          sx={{
            display: 'block',
            width: { xs: '100%', sm: 'auto' },
            justifySelf: 'self-end',
            borderRadius: 3,
            mt: 2,
            textAlign: 'center',
          }}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}

export default ActivityCard;
