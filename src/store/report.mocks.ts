import { IProfileReport } from "../models/IProfileReport";

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
                title: "Symmary Overall",
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
                        name: "Organizing Work of Other People",
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
                general: {
                    title: "Summary Overall",
                    description: "",
                    data: []
                },
                groupped: {
                    title: "Summary By Competency",
                    description: "",
                    data: []
                },
            },
            {
                competency: "Teamwork",
                description: "",
                general: {
                    title: "Summary Overall",
                    description: "",
                    data: [
                        {
                            name: "Personal",
                            average: 4
                        },
                        {
                            name: "Supervisor",
                            average: 3
                        },
                        {
                            name: "Colleague",
                            average: 2
                        },
                        {
                            name: "Subordinate",
                            average: 5
                        },
                        {
                            name: "Client",
                            average: 4
                        }
                    ]
                },
                groupped: {
                    title: "Summary By Competency",
                    description: "",
                    data: [
                        {
                            name: "Performance in team",
                            personal: 5,
                            supervisor: 4,
                            colleague: 4,
                            subordinate: 3,
                            client: 5
                        },
                        {
                            name: "Following the team rules",
                            personal: 4,
                            supervisor: 4,
                            colleague: 5,
                            subordinate: 4,
                            client: 4
                        },
                        {
                            name: "Respect from team",
                            personal: 3,
                            supervisor: 4,
                            colleague: 2,
                            subordinate: 5,
                            client: 4
                        }
                    ]
                }
            },
            {
                competency: "",
                description: "",
                general: {
                    title: "Summary Overall",
                    description: "",
                    data: []
                },
                groupped: {
                    title: "Summary By Competency",
                    description: "",
                    data: []
                },
            },
            {
                competency: "",
                description: "",
                general: {
                    title: "Summary Overall",
                    description: "",
                    data: []
                },
                groupped: {
                    title: "Summary By Competency",
                    description: "",
                    data: []
                },
            },
            {
                competency: "",
                description: "",
                general: {
                    title: "Summary Overall",
                    description: "",
                    data: []
                },
                groupped: {
                    title: "Summary By Competency",
                    description: "",
                    data: []
                },
            },
            {
                competency: "",
                description: "",
                general: {
                    title: "Summary Overall",
                    description: "",
                    data: []
                },
                groupped: {
                    title: "Summary By Competency",
                    description: "",
                    data: []
                },
            },
            {
                competency: "",
                description: "",
                general: {
                    title: "Summary Overall",
                    description: "",
                    data: []
                },
                groupped: {
                    title: "Summary By Competency",
                    description: "",
                    data: []
                },
            }
        ]
    }
]