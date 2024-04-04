import MatchupCell from 'src/components/Matchup/MatchupCell'

type MatchupPageProps = {
  id: number
}

const MatchupPage = ({ id }: MatchupPageProps) => {
  return <MatchupCell id={id} />
}

export default MatchupPage
