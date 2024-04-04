export const schema = gql`
  type Player {
    id: Int!
    name: String!
    team: Team
    teamId: Int
    matchResults1: [MatchResult]!
    matchResults2: [MatchResult]!
  }

  type Query {
    players: [Player!]! @requireAuth
    player(id: Int!): Player @requireAuth
  }

  input CreatePlayerInput {
    name: String!
    teamId: Int
  }

  input UpdatePlayerInput {
    name: String
    teamId: Int
  }

  type Mutation {
    createPlayer(input: CreatePlayerInput!): Player! @requireAuth
    updatePlayer(id: Int!, input: UpdatePlayerInput!): Player! @requireAuth
    deletePlayer(id: Int!): Player! @requireAuth
  }
`
