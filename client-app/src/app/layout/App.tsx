import React, {Fragment } from 'react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activity/dashboard/ActivityDashboard';
import { Container } from 'semantic-ui-react';
//import LoadingComponent from './LoadingComponent';
//import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activity/form/ActivityForm';
import ActivityDetails from '../../features/activity/details/ActivityDetails';

const App: React.FC<RouteComponentProps> = ({location}) => {

	return (
		<Fragment>
			<Route exact path='/' component={HomePage}/>
			<Route path={'/(.+)'} render={() => (
				<Fragment>
					<NavBar />
					<Container style={{ marginTop: '7em' }}>
				
						<Route exact path='/activities' component={ActivityDashboard}/>
						<Route path='/activities/:id' component={ActivityDetails}/>
						<Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
					</Container>
				</Fragment>
			)} />


		</Fragment>
	);
};

export default withRouter(observer(App));
