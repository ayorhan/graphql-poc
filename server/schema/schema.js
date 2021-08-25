const graphql = require('graphql');
const _ = require('lodash');

// Dummy Data
let usersData = [
    {id: '1', name: 'Bond', age: 36, profession: 'pro1'},
    {id: '13', name: 'Anna', age: 26, profession: 'pro2'},
    {id: '211', name: 'Bella', age: 16, profession: 'pro3'},
    {id: '19', name: 'Gina', age: 26, profession: 'pro4'},
    {id: '150', name: 'Georgina', age: 36, profession: 'pro5'},
];

let hobbiesData = [
    {id: '1', title: 'hobby1', profession: 'desc1', userId: '150'},
    {id: '2', title: 'hobby2', profession: 'desc2', userId: '211'},
    {id: '3', title: 'hobby3', profession: 'desc3', userId: '211'},
    {id: '4', title: 'hobby4', profession: 'desc4', userId: '13'},
    {id: '5', title: 'hobby5', profession: 'desc5', userId: '150'},
]

let postsData = [
    {id: '1', comment: 'comment1', userId: '1'},
    {id: '2', comment: 'comment2', userId: '1'},
    {id: '3', comment: 'comment3', userId: '19'},
    {id: '4', comment: 'comment4', userId: '211'},
    {id: '5', comment: 'comment5', userId: '1'},
]
// Create types
const UserType = new graphql.GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: graphql.GraphQLString},
        name: {type: graphql.GraphQLString},
        age: {type: graphql.GraphQLInt},
        profession: {type: graphql.GraphQLString},
        posts: {
            type: graphql.GraphQLList(PostType),
            resolve(parent, args){
                return _.filter(postsData, {userId: parent.id})
            } 
        },
        hobbies: {
            type: graphql.GraphQLList(HobbyType),
            resolve(parent, args){
                return _.filter(hobbiesData, {userId: parent.id})
            } 
        }
    })
});

const HobbyType = new graphql.GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby Description',
    fields: () => ({
        id: {type: graphql.GraphQLString},
        title: {type: graphql.GraphQLString},
        description: {type: graphql.GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return _.find(usersData, {id: parent.userId})
            }
        }
    })
});

const PostType = new graphql.GraphQLObjectType({
    name: 'Post',
    description: 'Post Description',
    fields: () => ({
        id: {type: graphql.GraphQLString},
        comment: {type: graphql.GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return _.find(usersData, {id: parent.userId})
            }
        }
    })
});

// Root Query
const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: () => ({
        user: {
            type: UserType,
            args: {
                id: {
                    type: graphql.GraphQLString
                }
            },
            resolve(parent, args){
                // we resolve with data
                // get and return data from a datasource
                return _.find(usersData, {id: args.id})
            }
        },
        hobby: {
            type: HobbyType,
            args: {
                id: {
                    type: graphql.GraphQLString
                }
            },
            resolve(parent, args){
                return _.find(hobbiesData, {id: args.id})
            }
        },
        post: {
            type: PostType,
            args: {
                id: {
                    type: graphql.GraphQLString
                }
            },
            resolve(parent, args){
                return _.find(postsData, {id: args.id})
            }
        }
    }) 
});

// Mutations
const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                //id: {type: graphql.GraphQLID},
                name: {type: graphql.GraphQLString},
                age: {type: graphql.GraphQLInt},
                profession: {type: graphql.GraphQLString}
            },
            resolve(parent, args){
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                }

                return user; 
            }
        },
        createPost: {
            type: PostType,
            args: {
                // id: {type: graphql.GraphQLID},
                comment: {type: graphql.GraphQLString},
                userId: {type:graphql.GraphQLID}  
            },
            resolve(parent, args){
                let post = {
                    comment: args.comment,
                    userId: args.userId
                }

                return post;
            }
        },
        createHobby: {
            type: HobbyType,
            args: {
                // id: {type: graphql.GraphQLID},
                title: {type: graphql.GraphQLString},
                description: {type: graphql.GraphQLString},
                userId: {type:graphql.GraphQLID}  
            },
            resolve(parent, args){
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                }

                return hobby;
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})