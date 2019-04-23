import { IProfileReport } from "../models/IProfileReport";
import { IReportGroup } from "src/models/IReportGroup";

const competencyGeneralReportGroup: IReportGroup = {
    title: "Summary Overall",
    description: "Overall summary for single competency divided by type of respondent.",
    data: [
        {
            name: "Average",
            average: 4,
        },
        {
            name: "Personal",
            average: 2,
        },
        {
            name: "Supervisor",
            average: 3,
        },
        {
            name: "Colleague",
            average: 1,
        },
        {
            name: "Subordinate",
            average: 5,
        },
        {
            name: "Client",
            average: 4,
        }
    ]
};

const competencySpecificReportGroup: IReportGroup = {
    title: "Summary By Competency",
    description: "Summary for competency divided by subcompetencies.",
    data: [
        {
            name: "Working with expectations",
            personal: 4,
            supervisor: 5,
            colleague: 5,
            subordinate: 3,
            client: 4
        },
        {
            name: "Common Interests",
            personal: 4,
            supervisor: 5,
            colleague: 5,
            subordinate: 3,
            client: 4
        },
        {
            name: "Meeting Preparation",
            personal: 4,
            supervisor: 5,
            colleague: 5,
            subordinate: 3,
            client: 4
        },
        {
            name: "Personal Responsibility",
            personal: 4,
            supervisor: 5,
            colleague: 5,
            subordinate: 3,
            client: 4
        },
        {
            name: "Client Support",
            personal: 4,
            supervisor: 5,
            colleague: 5,
            subordinate: 3,
            client: 4
        }
    ]
};

export const reports: IProfileReport[] = [
    {
        username: "matthew",
        fullname: "Matthew",
        description: "",
        date: new Date(2019, 4, 22),
        summary: {
            competency: "General",
            description: "",
            general: {
                title: "Summary Overall",
                description: "",
                data: [
                    {
                        name: "Customer-Orientation",
                        personal: 2,
                        average: 5
                    },
                    {
                        name: "Teamwork",
                        personal: 4,
                        average: 5
                    },
                    {
                        name: "Effective Interaction",
                        personal: 4,
                        average: 4
                    },
                    {
                        name: "Organizing Work",
                        personal: 2,
                        average: 5
                    },
                    {
                        name: "Decision Making",
                        personal: 2,
                        average: 5
                    },
                    {
                        name: "Result-Orientation",
                        personal: 2,
                        average: 5
                    },
                    {
                        name: "Communication",
                        personal: 2,
                        average: 5
                    }
                ]
            },
            groupped: {
                title: "Avarage By Competency",
                description: "",
                data: [
                    {
                        name: "Customer-Orientation",
                        personal: 4,
                        supervisor: 4,
                        colleague: 3,
                        subordinate: 4,
                        client: 5
                    },
                    {
                        name: "Teamwork",
                        personal: 4,
                        supervisor: 4,
                        colleague: 3,
                        subordinate: 4,
                        client: 5
                    },
                    {
                        name: "Effective Interaction",
                        personal: 4,
                        supervisor: 4,
                        colleague: 3,
                        subordinate: 4,
                        client: 5
                    },
                    {
                        name: "Organizing Work of Other People",
                        personal: 4,
                        supervisor: 4,
                        colleague: 3,
                        subordinate: 4,
                        client: 5
                    },
                    {
                        name: "Decision Making",
                        personal: 4,
                        supervisor: 4,
                        colleague: 3,
                        subordinate: 4,
                        client: 5
                    },
                    {
                        name: "Result-Orientation",
                        personal: 4,
                        supervisor: 4,
                        colleague: 3,
                        subordinate: 4,
                        client: 5
                    },
                    {
                        name: "Communication",
                        personal: 4,
                        supervisor: 4,
                        colleague: 3,
                        subordinate: 4,
                        client: 5
                    }                    
                ]
            }
        },
        data: [
            {
                competency: "Customer-Orientation",
                description: "",
                general: competencyGeneralReportGroup,
                groupped: competencySpecificReportGroup,
            },
            {
                competency: "Teamwork",
                description: "",
                general: competencyGeneralReportGroup,
                groupped: competencySpecificReportGroup,
            },
            {
                competency: "Effective Interaction",
                description: "",
                general: competencyGeneralReportGroup,
                groupped: competencySpecificReportGroup,
            },
            {
                competency: "Organizing Work",
                description: "",
                general: competencyGeneralReportGroup,
                groupped: competencySpecificReportGroup,
            },
            {
                competency: "Decision Making",
                description: "",
                general: competencyGeneralReportGroup,
                groupped: competencySpecificReportGroup,
            },
            {
                competency: "Result-Orientation",
                description: "",
                general: competencyGeneralReportGroup,
                groupped: competencySpecificReportGroup,
            },
            {
                competency: "Communication",
                description: "",
                general: competencyGeneralReportGroup,
                groupped: competencySpecificReportGroup,
            }
        ]
    }
]