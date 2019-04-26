import * as React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Menu, Image, Dropdown, Segment } from 'semantic-ui-react';
import ProfilePage from './profile/profile';
import AssessmentPage from './profile/assessment';
import CompetencyPage from './profile/competency';
import AssessmentProfilePage from './profile/assessment-profile';
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
                    <React.Fragment>
                        <Segment style={{ height: '100vh' }}>
                            <Menu secondary size='huge' color='blue'>
                                <Menu.Item as={Link} name='1' active={item === '1'} onClick={this.handleOnMenuItemClick} to='/'>Profile</Menu.Item>
                                <Menu.Item as={Link} name='2' active={item === '2'} onClick={this.handleOnMenuItemClick} to='/competencies/'>Competencies</Menu.Item>
                                <Menu.Item as={Link} name='3' active={item === '3'} onClick={this.handleOnMenuItemClick} to='/assessment-profiles/'>Assessment Profiles</Menu.Item>
                                <Menu.Item as={Link} name='4' active={item === '4'} onClick={this.handleOnMenuItemClick} to='/assessments/'>Assessments</Menu.Item>
                                <Menu.Item as={Link} name='5' active={item === '5'} onClick={this.handleOnMenuItemClick} to='/reporting/'>Reporting</Menu.Item>
                                <Menu.Menu position='right'>
                                    <Dropdown item text='Matthew'>
                                        <Dropdown.Menu>
                                            <Dropdown.Item text='Sign Out' />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Menu>
                                <Menu.Item>
                                    <Image avatar src='/images/avatar/johny.png' />
                                </Menu.Item>
                            </Menu>

                            <Route exact path='/competencies/' component={CompetencyPage} />
                            <Route exact path='/assessment-profiles/' component={AssessmentProfilePage} />
                            <Route exact path='/assessments/' component={QuestionnairePage} />
                            <Route exact path='/assessments/:assessmentId' component={AssessmentPage} />
                            <Route exact path='/reporting/' component={ReportingPage} />
                            <Route exact path='/' component={ProfilePage} />
                        </Segment>
                    </React.Fragment>
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