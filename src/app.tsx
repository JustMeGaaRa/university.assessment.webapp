import * as React from 'react';
import './app.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Segment, Menu, Image } from 'semantic-ui-react';
import ProfilePage from './profile/profile';
import AssessmentPage from './profile/assessment';
import CompetenciesPage from './profile/competencies';
import QuestionnairePage from './profile/questionnaire';
import ReportingPage from './profile/reporting';

type AppState = {
    activeMenuItem: string;
}

class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);

        this.handleOnMenuItemClick = this.handleOnMenuItemClick.bind(this);

        this.state = {
            activeMenuItem: '1'
        }
    }

    public render() {
        const item = this.state.activeMenuItem;

        return (
            <BrowserRouter>
                <Switch>
                    <Segment className='app-page'>
                        <Menu secondary size='huge' color='blue'>
                            <Menu.Item as={Link} name='1' active={item === '1'} onClick={this.handleOnMenuItemClick} to='/'>Profile</Menu.Item>
                            <Menu.Item as={Link} name='2' active={item === '2'} onClick={this.handleOnMenuItemClick} to='/competencies/'>Competencies</Menu.Item>
                            <Menu.Item as={Link} name='3' active={item === '3'} onClick={this.handleOnMenuItemClick} to='/questionnaire/'>Questionnaire</Menu.Item>
                            <Menu.Item as={Link} name='4' active={item === '4'} onClick={this.handleOnMenuItemClick} to='/reporting/'>Reporting</Menu.Item>
                            <Menu.Item position='right'>
                                <Image avatar src='/images/avatar/johny.png' />
                            </Menu.Item>
                        </Menu>

                        <Route exact path='/competencies/' component={CompetenciesPage} />
                        <Route exact path='/questionnaire/' component={QuestionnairePage} />
                        <Route exact path='/reporting/' component={ReportingPage} />
                        <Route exact path='/assessments/:assessmentId' component={AssessmentPage} />
                        <Route exact path='/' component={ProfilePage} />
                    </Segment>
                </Switch>
            </BrowserRouter>
        );
    }

    private handleOnMenuItemClick(event: any, { name }: any) {
        this.setState({
            activeMenuItem: name
        });
    }
}

export default App;