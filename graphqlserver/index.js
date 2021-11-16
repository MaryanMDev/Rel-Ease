const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const {GraphQLSchema , GraphQLObjectType, GraphQLString , GraphQLList, GraphQLNonNull, GraphQLInt, graphql} = require('graphql')
const router = express.Router()
const app = express()
const dotenv = require('dotenv')

dotenv.config({path: './config/config.env'});

const users = [
    {id: 1 , name: 'Maryan'} ,
    {id: 2 , name: 'Mario'} , 
    {id: 3 , name: 'Luigi'}
];

const posts = [
    {id: 4 , content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas' , userId: 1} ,
    {id: 6 , content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas' , userId: 2} ,
    {id: 7 , content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas' , userId: 3}
];

const userType = new GraphQLObjectType({
    name:'users',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)}
    })
});


const postType = new GraphQLObjectType({
    name:'posts',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        content: {type: new GraphQLNonNull(GraphQLString)},
        userId: {type: new GraphQLNonNull(GraphQLInt)},
        user:{
            name:'user',
            type: userType,
            resolve: (posts) => users.find(user => posts.userId === user.id)
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:'root',
    description: 'root query test',
    fields:() => ({
        users:{
            type: new GraphQLList(userType),
            resolve: () => users
        } , 
        posts: {
            type: new GraphQLList(postType),
            resolve: () => posts
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQuery
});

app.use('/graphql' , expressGraphQL({
    schema: schema, 
    graphiql: true
}));

app.listen(process.env.PORT , (req , res) => {
    console.log(`running on port ${process.env.PORT}`);
})