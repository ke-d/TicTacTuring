import { gql } from 'react-apollo';

export const getUserData = gql`
  query {
      user {
        id
        email
        games {
  				id
          won
          createdAt
        }
      }
  }
`;

export const userQuery = gql`
  query {
    user {
      id
    }
  }
`;
