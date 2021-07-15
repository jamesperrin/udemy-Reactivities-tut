import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activities';

interface Props {
	activities: Activity[];
	selectActivity: (id: string) => void;
	deleteActivity: (id: string) => void;
	submitting: boolean;
}
export default function ActivityList({ activities, selectActivity, deleteActivity, submitting }: Props) {
const [target, setTarget] = useState('');

function handleActivityDelete(evt: SyntheticEvent<HTMLButtonElement>, id: string){
	setTarget(evt.currentTarget.name);
	deleteActivity(id);
}

	return (
		<Segment>
			<Item.Group divided>
				{activities.map((activity) => (
					<Item key={activity.id}>
						<Item.Content>
							<Item.Header as='a' title={`View details for ${activity.title}`}>
								{activity.title}
							</Item.Header>
							<Item.Meta>{activity.date}</Item.Meta>
							<Item.Description>
								<div>{activity.description}</div>
								<div>
									{activity.city}, {activity.venue}
								</div>
							</Item.Description>
							<Item.Extra>
								<Button
									onClick={() => selectActivity(activity.id)}
									floated='right'
									content='View'
									title={`View ${activity.title}`}
									color='blue'
								/>
								<Button
									name={activity.id}
									loading={submitting && target === activity.id}
									onClick={(evt) => handleActivityDelete(evt, activity.id)}
									floated='right'
									content='Delete'
									title={`Delete ${activity.title}`}
									color='red'
								/>
								<Label basic content={activity.category} />
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
}
