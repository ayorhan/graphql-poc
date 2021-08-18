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
    {id: '1', title: 'hobby1', profession: 'desc1'},
    {id: '13', title: 'hobby2', profession: 'desc2'},
    {id: '211', title: 'hobby3', profession: 'desc3'},
    {id: '19', title: 'hobby4', profession: 'desc4'},
    {id: '150', title: 'hobby5', profession: 'desc5'},
]

let postData = [
    {id: '1', comment: 'comment1'},
    {id: '13', comment: 'comment2'},
    {id: '211', comment: 'comment3'},
    {id: '19', comment: 'comment4'},
    {id: '150', comment: 'comment5'},
]
// Create types
const UserType = new graphql.GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: graphql.GraphQLString},
        name: {type: graphql.GraphQLString},
        age: {type: graphql.GraphQLInt},
        profession: {type: graphql.GraphQLString}
    })
});

const HobbyType = new graphql.GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby Description',
    fields: () => ({
        id: {type: graphql.GraphQLString},
        title: {type: graphql.GraphQLString},
        description: {type: graphql.GraphQLString},
    })
});

const PostType = new graphql.GraphQLObjectType({
    name: 'Post',
    description: 'Post Description',
    fields: () => ({
        id: {type: graphql.GraphQLString},
        comment: {type: graphql.GraphQLString},
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
                return _.find(postData, {id: args.id})
            }
        }
    }) 
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})