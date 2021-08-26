const graphql = require('graphql');
const _ = require('lodash');

const User = require('../model/user');
const Post = require('../model/post');
const Hobby = require('../model/hobby');

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
                return Post.find({"userId": parent.id});
            } 
        },
        hobbies: {
            type: graphql.GraphQLList(HobbyType),
            resolve(parent, args){
                return Hobby.find({"userId": parent.id});
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
                return User.findById(parent.userId);
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
                return User.findById(parent.userId);
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
                return User.findById(args.id);
            }
        },
        
        users: {
            type: graphql.GraphQLList(UserType),
            resolve(parent, args){
                return User.find({});
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
                return Hobby.findById(args.id);
            }
        },

        hobbies: {
            type: graphql.GraphQLList(HobbyType),
            resolve(parent, args){
                return Hobby.find({});
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
                return Post.findById(args.id);
            }
        },

        posts: {
            type: graphql.GraphQLList(PostType),
            resolve(parent, args){
                return Post.find({});
            }
        },
    }) 
});

// Mutations
const Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                age: {type: new graphql.GraphQLNonNull(graphql.GraphQLInt)},
                profession: {type: graphql.GraphQLString}
            },
            resolve(parent, args){
                let user = new User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                });

                user.save();

                return user;
            }
        },
        createPost: {
            type: PostType,
            args: {
                comment: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                userId: {type: new graphql.GraphQLNonNull(graphql.GraphQLID)}  
            },
            resolve(parent, args){
                let post = new Post( {
                    comment: args.comment,
                    userId: args.userId
                });

                post.save();

                return post;
            }
        },
        createHobby: {
            type: HobbyType,
            args: {
                title: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                description: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                userId: {type: new graphql.GraphQLNonNull(graphql.GraphQLID)}  
            },
            resolve(parent, args){
                let hobby = new Hobby({
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                });

                hobby.save();

                return hobby;
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})