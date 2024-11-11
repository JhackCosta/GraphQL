import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from "node:crypto"

/**
    *  Under Fetching = Rota HTTP que não devolve todos os dados que precisa
    *  Over Fetching = Rota HTTP que devolve mais dados do que precisa
*/

/**
    *  Schema first approach = Primeiro cria o Schema como na variavel 'typeDefs' e depois cria o restante do código.
    *  Code first = O Schema é gerado de forma automática com base no código.
*/

const DBUser: User[] = [];

class User {
    id: String;
    name: String;
    idade: number;

    constructor(name: String, idade: number) {
        this.id = randomUUID();
        this.name = name;
        this.idade = idade;
    }
}

const typeDefs = gql`

    type User {
        id: ID!
        name: String!
        idade: Int!
    }
    type Query {
        users: [User!]!
    }
    type Mutation {
        createUser(name: String!, idade:Int!): User!
    }
`;

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            users: () => {
                return DBUser;
            }
        },

        Mutation: {
            createUser(_, args,) {
                const user = new User(args.name,args.idade);
                DBUser.push(user);
                return user;
            }
        }
    }
});

server.listen().then(({url}) => {
    console.log(`🚀 HTTP server running on ${url}`);
    
});