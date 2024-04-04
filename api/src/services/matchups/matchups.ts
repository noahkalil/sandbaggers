import type {
  QueryResolvers,
  MutationResolvers,
  MatchupRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const matchups: QueryResolvers['matchups'] = () => {
  return db.matchup.findMany()
}

export const matchup: QueryResolvers['matchup'] = ({ id }) => {
  return db.matchup.findUnique({
    where: { id },
  })
}

export const createMatchup: MutationResolvers['createMatchup'] = ({
  input,
}) => {
  return db.matchup.create({
    data: input,
  })
}

export const updateMatchup: MutationResolvers['updateMatchup'] = ({
  id,
  input,
}) => {
  return db.matchup.update({
    data: input,
    where: { id },
  })
}

export const deleteMatchup: MutationResolvers['deleteMatchup'] = ({ id }) => {
  return db.matchup.delete({
    where: { id },
  })
}

export const Matchup: MatchupRelationResolvers = {
  team1: (_obj, { root }) => {
    return db.matchup.findUnique({ where: { id: root?.id } }).team1()
  },
  team2: (_obj, { root }) => {
    return db.matchup.findUnique({ where: { id: root?.id } }).team2()
  },
  season: (_obj, { root }) => {
    return db.matchup.findUnique({ where: { id: root?.id } }).season()
  },
  matchResults: (_obj, { root }) => {
    return db.matchup.findUnique({ where: { id: root?.id } }).matchResults()
  },
}
