import React, { useContext, useEffect } from 'react';
//import React, { SyntheticEvent, useContext } from 'react';
import { Grid } from 'semantic-ui-react';
//import { IActivity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
//import ActivityDetails from '../details/ActivityDetails';
//import ActivityForm from '../form/ActivityForm';
import { observer } from 'mobx-react-lite';
//import ActivityStore from '../../../app/stores/activityStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';


const ActivityDashboard: React.FC = () => {

	//const activityStore = useContext(ActivityStore);
	const rootStore = useContext(RootStoreContext);
	const {loadActivities, loadingInitial} = rootStore.activityStore;

	useEffect(
		() => {
			loadActivities();
		},
		[ loadActivities ]
	);

	if (loadingInitial) return <LoadingComponent content="Loading Activities..." />;

	//const activityStore = useContext(ActivityStore);
	//const {editMode, activity} = activityStore;
	return (
		

		<Grid>
			<Grid.Column width={10}>
				<ActivityList/>
			</Grid.Column>

			<Grid.Column width={6}>
				<h2>Activity Filters</h2>
			</Grid.Column>
		</Grid>
	);
};

export default observer(ActivityDashboard);
