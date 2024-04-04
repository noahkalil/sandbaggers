export const schema = gql`
  type MatchResult {
    id: Int!
    matchup: Matchup!
    matchupId: Int!
    player1: Player!
    player1Id: Int!
    player2: Player!
    player2Id: Int!
    player1Score: Int!
    player2Score: Int!
  }

  type Query {
    matchResults: [MatchResult!]! @requireAuth
    matchResult(id: Int!): MatchResult @requireAuth
  }

  input CreateMatchResultInput {
    matchupId: Int!
    player1Id: Int!
    player2Id: Int!
    player1Score: Int!
    player2Score: Int!
  }

  input UpdateMatchResultInput {
    matchupId: Int
    player1Id: Int
    player2Id: Int
    player1Score: Int
    player2Score: Int
  }

  type Mutation {
    createMatchResult(input: CreateMatchResultInput!): MatchResult! @requireAuth
    updateMatchResult(id: Int!, input: UpdateMatchResultInput!): MatchResult!
      @requireAuth
    deleteMatchResult(id: Int!): MatchResult! @requireAuth
  }
`
