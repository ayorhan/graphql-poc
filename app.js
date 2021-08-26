const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');
const port = process.env.PORT || 4000;

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

app.listen(port, () => {
    console.log('Listening for requests on ' + port);
});
