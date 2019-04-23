import * as React from "react";
import { Segment, Header, Form, Divider, DropdownProps } from "semantic-ui-react";
import { loadUsers } from "../store/user.actions";
import { BarChart, XAxis, YAxis, Legend, Bar, Tooltip, ResponsiveContainer } from "recharts";
import { findReport } from "src/store/report.actions";
import { IProfileReport } from "src/models/IProfileReport";
import { IReportData } from "src/models/IReportData";
import { IReportGroup } from "src/models/IReportGroup";

interface IReportingPageState {
    username: string;
    report: IProfileReport | undefined;
}

class ReportingPage extends React.Component<any, IReportingPageState> {
    constructor(props: IReportingPageState) {
        super(props);

        this.createCompetencyReport = this.createCompetencyReport.bind(this);
        this.handleOnSearchUserChanged = this.handleOnSearchUserChanged.bind(this);

        this.state = {
            username: "",
            report: undefined
        };
    }
    
    public render() {
        const header = "Reporting";
        const subheader = "Reports per user filtered by date.";
        const users = loadUsers().map(user => {
            return {
                key: user.username,
                text: user.fullname,
                value: user.fullname
            };
        });

        return (
            <Segment>
                <Header as='h1' content={header} subheader={subheader} />
                <Divider hidden />
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Select fluid search label='Target User' options={users} onChange={this.handleOnSearchUserChanged} />
                        <Form.Input fluid label='Target Date' type='date' />
                    </Form.Group>
                </Form>
                <Divider hidden />
                {this.createProfileReport(this.state.report)}
            </Segment>
        );
    }

    private createProfileReport(report?: IProfileReport) {
        if (!report) {
            return undefined;
        }
        
        return (
            <React.Fragment>
                {this.createCompetencyReport(report.summary)}
                {report.data.map(this.createCompetencyReport)}
            </React.Fragment>
        )
    }


    private createCompetencyReport(data: IReportData) {
        return (
            <Segment>
                <Header as='h2' content={data.competency} subheader={data.description} />
                {this.createReportChart(data.general)}
                <Divider />
                {this.createReportChart(data.groupped)}
            </Segment>
        )
    }

    private createReportChart(group: IReportGroup) {
        return (
            <React.Fragment>
                <Header as='h3' content={group.title} subheader={group.description} />
                <ResponsiveContainer height={300}>
                    <BarChart data={group.data}>
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar fill='#6192bc' dataKey='personal' />
                        <Bar fill='#7db77c' dataKey='supervisor' />
                        <Bar fill='#f3a465' dataKey='colleague' />
                        <Bar fill='#dc7e7f' dataKey='subordinate' />
                        <Bar fill='#a37cca' dataKey='client' />
                        <Bar fill='#919397' dataKey='average' />
                    </BarChart>
                </ResponsiveContainer>
            </React.Fragment>
        )
    }

    private handleOnSearchUserChanged(event: any, data: DropdownProps) {
        this.setState({
            username: data.value as string,
            report: findReport(data.value as string)
        });
    }
}

export default ReportingPage;