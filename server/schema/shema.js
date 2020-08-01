const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = graphql;

const User = require('../models/users');

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    login: { type: GraphQLString },
    password: { type: GraphQLString },
    name: { type: GraphQLString },
    photos: { type: new GraphQLList(GraphQLString) },
  })
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: userType,
      args: {
        login: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        photos: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
      },
      resolve(parent, { login, password, photos, name }) {
        const user = new User({
          login,
          password,
          photos,
          name
        });

        user.save()
      },
    },
    updatePhotos: {
      type: userType,
      args: {
        id: { type: GraphQLID },
        photos: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
      },
      resolve(parent, { id, photos }) {
        return User.findByIdAndUpdate(id, {
          $set: {
            photos,
          }
        }, { new: true })
      }
    },
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return User.findById(id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})