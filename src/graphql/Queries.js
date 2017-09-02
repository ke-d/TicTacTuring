import { gql } from 'react-apollo';

// A Profile page query that supports pagination
export const getUserData = gql`
  query ($first: Int!, $skip: Int!) {
      user {
        id
        email
        games (first: $first, skip: $skip) {
  				id
          won
          createdAt
        }
      }
  }
`;

// A Profile page query without pagination
export const getUserDataNoPage = gql`
  query  {
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

// See if the user is still logged in query
export const userQuery = gql`
  query {
    user {
      id
    }
  }
`;
