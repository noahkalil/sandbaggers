import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { Score } from '../../components/score/Score'

const MatchupsPage = () => {
  return (
    <>
      <Metadata title="Matchups" description="Matchups page" />

      <h1>Matchups</h1>
      <p></p>
      <Score />
    </>
  )
}

export default MatchupsPage
