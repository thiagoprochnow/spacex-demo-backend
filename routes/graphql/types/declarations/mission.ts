import { gql } from 'graphql-tag';

export const Mission = gql`
  type Mission {
    id: ID!
    name: String
    shipId: String
  }

  input MissionsInput {
    shipId: String!
  }
`;
