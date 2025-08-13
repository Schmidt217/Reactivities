import { Card, CardMedia, Box, Typography, Chip } from '@mui/material';
import { Link } from 'react-router';
import { formatDate } from '../../../lib/util/util';
import { useActivities } from '../../../lib/hooks/useActivities';
import StyledButton from '../../../app/shared/components/StyledButton';

type Props = {
  activity: Activity;
};

function ActivityDetailsHeader({ activity }: Props) {
  const { updateAttendance } = useActivities(activity.id);
  const { isCancelled, isHost, isGoing, hostDisplayName } = activity;

  return (
    <Card
      sx={{
        position: 'relative',
        mb: 2,
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}
    >
      {isCancelled && (
        <Chip
          sx={{
            position: 'absolute',
            left: 40,
            top: 20,
            zIndex: 1000,
            borderRadius: 1,
          }}
          color="error"
          label="Cancelled"
        />
      )}
      <CardMedia
        component="img"
        height="300"
        image={`/images/categoryImages/${activity.category}.jpg`}
        alt={`${activity.category} image`}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          color: 'white',
          padding: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { xs: 'flex-start', sm: 'space-between' },
          alignItems: { xs: 'flex-start', sm: 'flex-end' },
          background:
            'linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)',
          boxSizing: 'border-box',
        }}
      >
        {/* Text Section */}
        <Box mb={{ xs: 2, sm: 0 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {activity.title}
          </Typography>
          <Typography variant="subtitle1">
            {formatDate(activity.date)}
          </Typography>
          <Typography variant="subtitle2">
            Hosted by{' '}
            <Link
              to={`/profiles/username`}
              style={{ color: 'white', fontWeight: 'bold' }}
            >
              {hostDisplayName}
            </Link>
          </Typography>
        </Box>

        {/* Buttons aligned to the right */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          {isHost ? (
            <>
              <StyledButton
                variant="contained"
                color={isCancelled ? 'success' : 'error'}
                onClick={() => updateAttendance.mutate(activity.id)}
                disabled={updateAttendance?.isPending}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                {isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
              </StyledButton>
              <StyledButton
                variant="contained"
                color="primary"
                component={Link}
                to={`/manage/${activity.id}`}
                disabled={isCancelled}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                Manage Event
              </StyledButton>
            </>
          ) : (
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => updateAttendance.mutate(activity.id)}
              disabled={updateAttendance?.isPending}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              {isGoing ? 'Cancel Attendance' : 'Join Activity'}
            </StyledButton>
          )}
        </Box>
      </Box>
    </Card>
  );
}

export default ActivityDetailsHeader;
