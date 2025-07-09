import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
	activity?: Activity;
	closeForm: () => void;
};

function ActivityForm({ activity, closeForm }: Props) {
	const { updateActivity, createActivity } = useActivities();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data: { [key: string]: FormDataEntryValue } = {};
		formData.forEach((value, key) => {
			data[key] = value;
		});
		if (activity) {
			data.id = activity.id;
			await updateActivity.mutateAsync(data as unknown as Activity);
			closeForm();
		} else {
			await createActivity.mutateAsync(data as unknown as Activity);
			closeForm();
		}
	};

	return (
		<Paper sx={{ borderRadius: 3, padding: 3 }}>
			<Typography variant="h5" gutterBottom color="primary">
				{" "}
				Create Activity
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				display="flex"
				flexDirection="column"
				gap={3}
			>
				<TextField name="title" label="title" defaultValue={activity?.title} />
				<TextField
					name="description"
					label="description"
					defaultValue={activity?.description}
					multiline
					rows={3}
				/>
				<TextField
					name="category"
					label="category"
					defaultValue={activity?.category}
				/>
				<TextField
					name="date"
					label="date"
					defaultValue={
						activity?.date
							? new Date(activity.date).toISOString().split("T")[0]
							: new Date().toISOString().split("T")[0]
					}
					type="date"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField name="city" label="City" defaultValue={activity?.city} />
				<TextField name="venue" label="Venue" defaultValue={activity?.venue} />
				<Box display="flex" justifyContent="end" gap={3}>
					<Button onClick={closeForm} color="inherit">
						Cancel
					</Button>
					<Button
						type="submit"
						color="success"
						variant="contained"
						loading={updateActivity.isPending || createActivity.isPending}
					>
						Submit
					</Button>
				</Box>
			</Box>
		</Paper>
	);
}

export default ActivityForm;
