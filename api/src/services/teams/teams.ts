import type {
  QueryResolvers,
  MutationResolvers,
  TeamRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const teams: QueryResolvers['teams'] = () => {
  return db.team.findMany()
}

export const team: QueryResolvers['team'] = ({ id }) => {
  return db.team.findUnique({
    where: { id },
  })
}

export const createTeam: MutationResolvers['createTeam'] = ({ input }) => {
  return db.team.create({
    data: input,
  })
}

export const updateTeam: MutationResolvers['updateTeam'] = ({ id, input }) => {
  return db.team.update({
    data: input,
    where: { id },
  })
}

export const deleteTeam: MutationResolvers['deleteTeam'] = ({ id }) => {
  return db.team.delete({
    where: { id },
  })
}

export const Team: TeamRelationResolvers = {
  players: (_obj, { root }) => {
    return db.team.findUnique({ where: { id: root?.id } }).players()
  },
  season: (_obj, { root }) => {
    return db.team.findUnique({ where: { id: root?.id } }).season()
  },
  matchupsTeam1: (_obj, { root }) => {
    return db.team.findUnique({ where: { id: root?.id } }).matchupsTeam1()
  },
  matchupsTeam2: (_obj, { root }) => {
    return db.team.findUnique({ where: { id: root?.id } }).matchupsTeam2()
  },
}
