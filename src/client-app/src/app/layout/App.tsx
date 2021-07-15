import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activities';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agents';

function App() {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		agent.Activities.list().then((response) => {
			let activities: Activity[] = [];
			response.forEach(activity => {
				activity.date = activity.date.split('T')[0];
				activities.push(activity);
			});
			setActivities(response);
		});
	}, []);

	function handleSelectActivity(id: string) {
		setSelectedActivity(activities.find((x) => x.id === id));
	}

	function handleCancelSelectActivity() {
		setSelectedActivity(undefined);
	}

	function handleFormOpen(id?: string) {
		id ? handleSelectActivity(id) : handleCancelSelectActivity();
		setEditMode(true);
	}

	function handleFormClose() {
		setEditMode(false);
	}

	function handleCreateOrEditActivity(activity: Activity) {
		activity.id
			? setActivities([...activities.filter((x) => x.id !== activity.id), activity])
			: setActivities([...activities, { ...activity, id: uuid() }]);

		setEditMode(false);
		setSelectedActivity(activity);
	}

	function hanldeDeleteActivity(id: string) {
		setActivities([...activities.filter((x) => x.id !== id)]);
	}

	return (
		<Fragment>
			<NavBar openForm={handleFormOpen} />
			<Container style={{ marginTop: '7em' }}>
				<ActivityDashboard
					activities={activities}
					selectedActivity={selectedActivity}
					selectActivity={handleSelectActivity}
					cancelSelectActivity={handleCancelSelectActivity}
					editMode={editMode}
					openForm={handleFormOpen}
					closeForm={handleFormClose}
					createOrEditActivity={handleCreateOrEditActivity}
					deleteActivity={hanldeDeleteActivity}
				/>
			</Container>
		</Fragment>
	);
}

export default App;
