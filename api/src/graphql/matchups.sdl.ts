export const schema = gql`
  type Matchup {
    id: Int!
    week: Int!
    date: DateTime!
    team1: Team!
    team1Id: Int!
    team2: Team!
    team2Id: Int!
    season: Season!
    seasonId: Int!
    matchResults: [MatchResult]!
  }

  type Query {
    matchups: [Matchup!]! @requireAuth
    matchup(id: Int!): Matchup @requireAuth
  }

  input CreateMatchupInput {
    week: Int!
    date: DateTime!
    team1Id: Int!
    team2Id: Int!
    seasonId: Int!
  }

  input UpdateMatchupInput {
    week: Int
    date: DateTime
    team1Id: Int
    team2Id: Int
    seasonId: Int
  }

  type Mutation {
    createMatchup(input: CreateMatchupInput!): Matchup! @requireAuth
    updateMatchup(id: Int!, input: UpdateMatchupInput!): Matchup! @requireAuth
    deleteMatchup(id: Int!): Matchup! @requireAuth
  }
`
