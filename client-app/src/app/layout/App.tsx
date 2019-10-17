import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from 'react';
//import logo from './logo.svg';
//import axios from "axios";
//import { Header, Icon, List, Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activity/dashboard/ActivityDashboard';
import { Container } from 'semantic-ui-react';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';

const App = () => {
	const activityStore = useContext(ActivityStore);

	const [ activities, setActivities ] = useState<IActivity[]>([]);
	const [ selectedActivity, setSelectedActivity ] = useState<IActivity | null>(null);

	const [ editMode, setEditMode ] = useState(false);

	const [ loading, setLoading ] = useState(true);

	const [ submitting, setSubmitting ] = useState(false);

	const [ target, setTarget ] = useState('');

	const handleSelectedActivity = (id: string) => {
		setSelectedActivity(activities.filter((a) => a.id === id)[0]);
		setEditMode(false);
	};

	const handleCreateActivity = (activity: IActivity) => {
		setSubmitting(true);
		agent.Activities
			.create(activity)
			.then(() => {
				setActivities([ ...activities, activity ]);
				setSelectedActivity(activity);
				setEditMode(false);
			})
			.then(() => setSubmitting(false));
	};

	const handleEditActivity = (activity: IActivity) => {
		setSubmitting(true);
		agent.Activities
			.update(activity)
			.then(() => {
				setActivities([ ...activities.filter((a) => a.id !== activity.id), activity ]);
				setSelectedActivity(activity);
				setEditMode(false);
			})
			.then(() => setSubmitting(false));
	};

	const handlesDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
		setSubmitting(true);
		setTarget(event.currentTarget.name);
		agent.Activities
			.delete(id)
			.then(() => {
				setActivities([ ...activities.filter((a) => a.id !== id) ]);
			})
			.then(() => setSubmitting(false));
	};

	const handleOpenCreateForm = () => {
		setSelectedActivity(null);
		setEditMode(true);
	};

	useEffect(
		() => {
			activityStore.loadActivities();

			// agent.Activities
			// 	.list()
			// 	.then((res) => {
			// 		let activities: IActivity[] = [];
			// 		res.forEach((activity) => {
			// 			activity.date = activity.date.split('.')[0];
			// 			activities.push(activity);
			// 		});
			// 		setActivities(activities);
			// 	})
			// 	.then(() => setLoading(false));
		},
		[ activityStore ]
	);

	if (activityStore.loadingInitial) return <LoadingComponent content="Loading Activities..." />;

	return (
		<Fragment>
			<NavBar openCreateForm={handleOpenCreateForm} />
			<Container style={{ marginTop: '7em' }}>
				<ActivityDashboard
					activities={activityStore.activities}
					selectActivity={handleSelectedActivity}
					selectedActivity={selectedActivity!}
					editMode={editMode}
					setEditMode={setEditMode}
					setSelectedActivity={setSelectedActivity}
					createActivity={handleCreateActivity}
					editActivity={handleEditActivity}
					deleteActivity={handlesDeleteActivity}
					submitting={submitting}
					target={target}
				/>
			</Container>
		</Fragment>
	);
};

export default observer(App);
