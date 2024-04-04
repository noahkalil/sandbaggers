export const schema = gql`
  type Team {
    id: Int!
    name: String!
    players: [Player]!
    season: Season!
    seasonId: Int!
    matchupsTeam1: [Matchup]!
    matchupsTeam2: [Matchup]!
  }

  type Query {
    teams: [Team!]! @requireAuth
    team(id: Int!): Team @requireAuth
  }

  input CreateTeamInput {
    name: String!
    seasonId: Int!
  }

  input UpdateTeamInput {
    name: String
    seasonId: Int
  }

  type Mutation {
    createTeam(input: CreateTeamInput!): Team! @requireAuth
    updateTeam(id: Int!, input: UpdateTeamInput!): Team! @requireAuth
    deleteTeam(id: Int!): Team! @requireAuth
  }
`
