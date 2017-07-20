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
