const {GraphQLServer} = require('graphql-yoga');
const {Prisma, forwardTo} = require('prisma-binding');
const bcrypt = require('bcryptjs')

const resolvers = {
    Query: {
        product: forwardTo('db'),
        products: forwardTo('db'),
    },
    Mutation: {
        createProduct: forwardTo('db'),
        register: async (parent, {username, password}, ctx, info) => {
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await ctx.prisma.createUser({
                username,
                password: hashedPassword
            });
            return user
        },
    },
};

const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    context: req => ({
        req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'http://localhost:4466',
        }),
    }),
});

server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))