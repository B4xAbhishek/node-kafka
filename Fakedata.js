const UserList = [
    {
        id: 1,
        name: "John",
        username: "john",
        age: 20,
        nationality: "INDIA",
        friends: [
            {
            id: 2,
            name: "Pedro",
            username: "PedroTech",
            age: 20,
            nationality: "BRAZIL",
            },
        ]
    },
    {
        id: 2,
        name: "Pedro",
        username: "PedroTech",
        age: 20,
        nationality: "BRAZIL",
    },
    {
        id: 3,
        name: "Sarah",
        username: "cameron",
        age: 25,
        nationality: "INDIA",
        friends: [
            {
            id: 2,
            name: "Pedro",
            username: "PedroTech",
            age: 20,
            nationality: "BRAZIL",
            },
        ]
    },
    {
        id: 4,
        name: "Sarh",
        username: "cameron",
        age: 35,
        nationality: "INDIA",
    }
]

const MovieList = [
    {
        id: 1,
        name: "Avengers Endgame",
        yearOfPublication: 2019,
        isInTheaters: true,
    },
    {
        id: 2,
        name: "Interstellar",
        yearOfPublication: 2007,
        isInTheaters: true,
    },
]
module.exports = { UserList, MovieList }