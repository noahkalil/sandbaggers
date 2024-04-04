import type {
  QueryResolvers,
  MutationResolvers,
  MatchResultRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const matchResults: QueryResolvers['matchResults'] = () => {
  return db.matchResult.findMany()
}

export const matchResult: QueryResolvers['matchResult'] = ({ id }) => {
  return db.matchResult.findUnique({
    where: { id },
  })
}

export const createMatchResult: MutationResolvers['createMatchResult'] = ({
  input,
}) => {
  return db.matchResult.create({
    data: input,
  })
}

export const updateMatchResult: MutationResolvers['updateMatchResult'] = ({
  id,
  input,
}) => {
  return db.matchResult.update({
    data: input,
    where: { id },
  })
}

export const deleteMatchResult: MutationResolvers['deleteMatchResult'] = ({
  id,
}) => {
  return db.matchResult.delete({
    where: { id },
  })
}

export const MatchResult: MatchResultRelationResolvers = {
  matchup: (_obj, { root }) => {
    return db.matchResult.findUnique({ where: { id: root?.id } }).matchup()
  },
  player1: (_obj, { root }) => {
    return db.matchResult.findUnique({ where: { id: root?.id } }).player1()
  },
  player2: (_obj, { root }) => {
    return db.matchResult.findUnique({ where: { id: root?.id } }).player2()
  },
}
