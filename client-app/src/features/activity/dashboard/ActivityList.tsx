import React, { useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
//import { IActivity } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';
//import ActivityStore from '../../../app//stores/activityStore';
//import { Link } from 'react-router-dom';
import ActivityListItem from './ActivityListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { format } from 'date-fns';

const ActivityList: React.FC = () => {
	//const activityStore = useContext(ActivityStore);
	const rootStore = useContext(RootStoreContext);
	const { activitiesByDate } = rootStore.activityStore;

	return (
		<Fragment>
			{activitiesByDate.map(([ group, activities ]) => (
				<Fragment key={group}>
					<Label size="large" color="blue">
						{format(group, 'eeee do MMMM')}
					</Label>
					<Item.Group divided>
						{activities.map((activity) => <ActivityListItem key={activity.id} activity={activity} />)}
					</Item.Group>
				</Fragment>
			))}
		</Fragment>
	);
};

export default observer(ActivityList);
