import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";

function ActivityDetails() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { activity, isLoading } = useActivities(id);

	if (isLoading) return <Typography>Loading...</Typography>;
	if (!activity) return <Typography>No Activity!</Typography>;

	return (
		<Card sx={{ borderRadius: 3 }}>
			<CardMedia
				component="img"
				src={`/images/categoryImages/${activity.category}.jpg`}
			/>
			<CardContent>
				<Typography variant="h5">{activity.title}</Typography>
				<Typography variant="subtitle1">{activity.date}</Typography>
				<Typography variant="body1">{activity.description}</Typography>
			</CardContent>
			<CardActions>
				<Button component={Link} to={`/manage/${activity.id}`} color="primary">
					Edit
				</Button>
				<Button onClick={() => navigate("/activities")} color="inherit">
					Cancel
				</Button>
			</CardActions>
		</Card>
	);
}

export default ActivityDetails;
