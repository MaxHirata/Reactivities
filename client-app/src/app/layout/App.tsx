import React, {useState, useEffect, Fragment } from 'react';
//import logo from './logo.svg';
import axios from 'axios';
import { Header, Icon, List, Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activity/dashboard/ActivityDashboard';


const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
        axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then((res) => {
        console.log(res);
        setActivities(res.data)
      });
  }, []);


      return (
    <Fragment>
    <NavBar />
    <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities}/>
    </Container>
    </Fragment>
  );


}

export default App;
