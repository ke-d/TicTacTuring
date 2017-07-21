import { gql } from 'react-apollo';

export const signInUser = gql`
  mutation ($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`;

export const createGame = gql`
  mutation ($won: Boolean!, $id: ID!) {
    createGame(won: $won userId: $id) {
      createdAt
      won
    }
  }
`;
