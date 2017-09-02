import { gql } from 'react-apollo';

// Mutation for signing in a user, returns a token
export const signInUser = gql`
  mutation ($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`;

// Mutation for creating a game
export const createGame = gql`
  mutation ($won: Boolean!, $id: ID!) {
    createGame(won: $won userId: $id) {
      createdAt
      won
    }
  }
`;
