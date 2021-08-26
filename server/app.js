const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();

// TODO secure this
mongoose.connect('mongodb+srv://arda-poc:arda-poc@cluster0.hffqk.mongodb.net/Cluster0?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Mongo connected!')
});

app.use(cors());
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema

}));

app.listen(4000, () => { // localhost:4000
    console.log('Listening for requests on 4000');
});
