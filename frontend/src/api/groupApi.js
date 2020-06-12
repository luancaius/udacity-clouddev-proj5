const groups = [
    {
        id: 1,
        name: 'Important notes',
    },
    {
        id: 2,
        name: 'Total Pomodoros'
    },
    {
        id: 3,
        name: 'Ideas'
    }
];

const getGroups = function () {
    return groups;
};

export const groupApi = {
    getGroups,
};
