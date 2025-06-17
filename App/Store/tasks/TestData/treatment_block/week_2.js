const exercisesData = [
    {
        id: 1,
        name: "Day 1",
        status: "completed",
        speech: [
            { id: 10, label: 1, level: 2 },
            { id: 11, label: 2, level: 2 }
        ],
        language: [1]
    },
    {
        id: 2,
        name: "Day 2",
        status: "completed",
        speech: [
            { id: 12, label: 3, level: 2 },
            { id: 13, label: 4, level: 2 }
        ],
        language: [2, 3]
    },
    {
        id: 3,
        name: "Day 3",
        status: "in progress",
        speech: [
            { id: 14, label: 5, level: 3 },
            { id: 15, label: 6, level: 3 },
            { id: 16, label: 7, level: 3 }
        ],
        language: [4]
    },
    {
        id: 4,
        name: "Day 4",
        status: "due",
        speech: [{ id: 17, label: 8, level: 3 }],
        language: []
    },
    {
        id: 5,
        name: "Day 5",
        status: "due",
        speech: [
            { id: 18, label: 10, level: 3 },
            { id: 19, label: 11, level: 3 }
        ],
        language: []
    }
];

export default exercisesData;
