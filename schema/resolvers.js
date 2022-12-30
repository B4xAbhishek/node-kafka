const { UserList, MovieList } = require("../Fakedata")
const  _  = require('lodash')


const resolvers = {
    Query: {
        users: () => {
            return UserList;
    },
        user: (parent,args) => {
            const ID = args.id
            const user = _.find(UserList,{id: Number(ID)})
            return user
        },
        movies: () => {
            return MovieList
    },
        movie: (parent,args) => {
            const name = args.name
            const movie = _.find(MovieList,{name:name})
            return movie
        }
},
    User: {
        favoriteMovies: () => {
        return _.filter(
            MovieList,
            (movie) =>
            movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
        );
        },
    },
    mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            const lastId = UserList[UserList.length - 1].id;
            user.id = lastId + 1;
            UserList.push(user);
            console.log(user)
            return user;
          },
    }
}


module.exports = { resolvers }
