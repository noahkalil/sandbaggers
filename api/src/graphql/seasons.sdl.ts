export const schema = gql`
  type Season {
    id: Int!
    year: Int!
    teams: [Team]!
    matchups: [Matchup]!
  }

  type Query {
    seasons: [Season!]! @requireAuth
    season(id: Int!): Season @requireAuth
  }

  input CreateSeasonInput {
    year: Int!
  }

  input UpdateSeasonInput {
    year: Int
  }

  type Mutation {
    createSeason(input: CreateSeasonInput!): Season! @requireAuth
    updateSeason(id: Int!, input: UpdateSeasonInput!): Season! @requireAuth
    deleteSeason(id: Int!): Season! @requireAuth
  }
`
