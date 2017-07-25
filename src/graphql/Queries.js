import { gql } from 'react-apollo';

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

export const userQuery = gql`
  query {
    user {
      id
    }
  }
`;
