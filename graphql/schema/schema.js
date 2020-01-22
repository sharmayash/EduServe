

// const graphql = require("graphql"),
// 	User = require("../../models/User"),
// 	bcrypt = require("bcryptjs");

// const {
// 	GraphQLObjectType,
// 	GraphQLString,
// 	GraphQLSchema,
// 	GraphQLID,
// 	GraphQLList,
// 	GraphQLNonNull
// } = graphql;

// const UserType = new GraphQLObjectType({
// 	name: "User",
// 	fields: () => ({
// 		id: { type: GraphQLID },
// 		name: { type: GraphQLString },
// 		email: { type: GraphQLString },
// 		password: { type: GraphQLString },
// 		date: { type: GraphQLString }
// 	})
// });

// const RootQuery = new GraphQLObjectType({
// 	name: "RootQueryType",
// 	fields: {
// 		users: {
// 			type: new GraphQLList(UserType),
// 			resolve(parent, args) {
// 				return User.find({});
// 			}
// 		}
// 	}
// });

// const Mutation = new GraphQLObjectType({
// 	name: "Mutation",
// 	fields: {
// 		addUser: {
// 			type: UserType,
// 			args: {
// 				name: { type: new GraphQLNonNull(GraphQLString) },
// 				email: { type: new GraphQLNonNull(GraphQLString) },
// 				password: { type: new GraphQLNonNull(GraphQLString) },
// 				date: { type: GraphQLString }
// 			},
// 			resolve(parent, args) {
// 				let newUser = new User({
// 					name: args.name,
// 					email: args.email,
// 					password: args.password,
// 					date: Date().toString()
// 				});

// 				bcrypt.genSalt(10, (err, salt) => {
// 					bcrypt.hash(newUser.password, salt, (err, hash) => {
// 						if (err) throw err;
// 						newUser.password = hash;
// 						return newUser.save();
// 					});
// 				});
// 			}
// 		}
// 	}
// });

// module.exports = new GraphQLSchema({
// 	query: RootQuery,
// 	mutation: Mutation
// });
