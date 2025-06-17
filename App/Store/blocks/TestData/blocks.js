const taskType = {
    1: "Issued",
    2: "Completed",
    3: "Reviewed",
    4: "Treatment"
};

const blocks = {
    data: [
        {
            id: 1,
            name: "Aoife Hendricks",
            currentProgress: 1,
            taskName: "Block 1",
            taskHistory: [
                {
                    id: 1,
                    taskId: 1,
                    label: "Week 1"
                },
                {
                    id: 2,
                    taskId: 2,
                    label: "Week 2"
                },
                {
                    id: 3,
                    taskId: 3,
                    label: "Week 3"
                },
                {
                    id: 4,
                    taskId: 4,
                    label: "Week 4"
                },
                {
                    id: 5,
                    taskId: 5,
                    label: "Week 5"
                },
                {
                    id: 6,
                    taskId: 6,
                    label: "Week 6"
                }
            ]
        },
        {
            id: 2,
            name: "Paul Rogers",
            currentProgress: 3,
            taskName: "Treatment 1",
            taskHistory: [
                {
                    id: 1,
                    taskId: 1,
                    label: taskType[1]
                },
                {
                    id: 2,
                    taskId: 2,
                    label: taskType[1]
                },
                {
                    id: 3,
                    taskId: 3,
                    label: taskType[2]
                },
                {
                    id: 4,
                    taskId: 4,
                    label: taskType[3]
                }
            ]
        },
        {
            id: 3,
            name: "Rebecca Chambers",
            currentProgress: 0,
            taskName: "Treatment 1",
            taskHistory: [
                {
                    id: 1,
                    taskId: 1,
                    label: taskType[1]
                },
                {
                    id: 2,
                    taskId: 2,
                    label: taskType[1]
                },
                {
                    id: 3,
                    taskId: 3,
                    label: taskType[2]
                },
                {
                    id: 4,
                    taskId: 4,
                    label: taskType[3]
                }
            ]
        }
    ]
};

export default blocks;
