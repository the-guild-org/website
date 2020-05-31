import withArticle from '../../ui/blog/article';

export const meta = {
  title:
    'Migrating from Schemaless REST API to GraphQL',
  tags: ['graphql', 'rest', 'graphql-mesh'],
  author: 'arda',
  date: '2020-05-31',
  description:
    "Migrating from Schemaless REST API to GraphQL without writing everything from scratch using GraphQL Mesh",
  image:
    'https://user-images.githubusercontent.com/20847995/83359027-29c2e000-a380-11ea-82a9-44ee8f257297.png',
};

export default withArticle({ ...meta });

Migrating from REST API to GraphQL may look trivial if you want to avoid rewriting your backend from scratch because your existing REST API might not have a decent schema even if you decide to use GraphQL as a proxy. In that case you still need to write a full schema for yout all endpoints.

### Implementing a basic proxy GraphQL backend

Let's say you have `/user` endpoint that does all CRUD operations for `User` entity with different HTTP methods, and you would need a GraphQL schema like below;

```graphql
type Query {
  user(id: ID): User
}

type Mutation {
  createUser(input: UserInput): User
  updateUser(id: ID, input: UserInput): User
  deleteUser(id: ID): ID
}

type User {
   id: ID
   name: String
   age: Int
}

input UserInput {
   name: String
   age: Int
}
```

And you would also need a thin business logic that proxies upcoming GraphQL requests to the REST API using GraphQL resolvers like below;
```js
module.exports = {
   Query: {
      user: (root, args) => fetch('https://myrest.com/user/' + args.id)
      .then(res => res.json())
   },
  Mutation: {
     createUser: (root, args) => fetch('https://myrest.com/user', {
       method: 'PUT',
       body: JSON.stringify(args.input)
      }).then(res => res.json()),
    updateUser:  (root, args) => fetch('https://myrest.com/user' + args.id, {
       method: 'POST',
       body: JSON.stringify(args.input)
    }).then(res => res.json()),
    deleteUser:  (root, args) => fetch('https://myrest.com/user' + args.id, {
       method: 'DELETE'
    }).then(res => res.json()),
};
```

This example assumes that you have `/user/:id` endpoint that gets a `User` entity with `HTTP GET`, deletes user with `HTTP DELETE` and updates a `User` that has the given id with the given input. Also `/user` endpoint creates a new `User` with the given input.

But this implementation will be hard to maintain when the REST API is updated and become bigger.

### Using GraphQL Mesh instead without any code

GraphQL Mesh is a tool that handles multiple non-GraphQL data sources and generates an executable GraphQL schema on top of them with a simple configuration file.

It has JSON Schema handler that generates a GraphQL Schema based on the given JSON schema files. This handler can also generate JSON Schema on runtime based on the given sample request and response data.

First you need to create a project using `yarn` on an empty directory:

```bash
yarn init
```

After that we need to install some dependencies of Mesh:

```bash
 yarn add @graphql-mesh/cli @graphql-mesh/json-schema graphql
```

Create a `.meshrc.yml` which is a configuration file for GraphQL Mesh on our new project:

```yml
sources:
  - name: MyRest
    handler:
       jsonSchema:
          baseUrl: https://myrest.com/
          operations:
            - type: Query
              field: user
              path: /user/{args.id}
              method: GET
              responseSample: ./getUserResponse.json
            - type: Mutation
              field: createUser
              path: /user
              method: PUT
              requestSample: ./createUserRequest.json
              responseSample: ./createUserResponse.json
            - type: Mutation
              field: updateUser
              path: /user/{args.id}
              method: POST
              requestSample: ./updateUserRequest.json
              responseSample: ./updateUserResponse.json
            - type: Mutation
              field: deleteUser
              path: /user/{args.id}
              method: DELETE
              responseSample: ./deleteUserResponse.json
```

As you can see in the configuration, we defined our endpoints without a single line of code. After creating this configuration file. We need to get sample request and response files by calling those endpoints on our local.

With a single command, our new GraphQL endpoint is ready to serve;

```bash
$ yarn mesh serve
```

