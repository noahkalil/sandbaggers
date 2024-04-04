import EditMatchupCell from 'src/components/Matchup/EditMatchupCell'

type MatchupPageProps = {
  id: number
}

const EditMatchupPage = ({ id }: MatchupPageProps) => {
  return <EditMatchupCell id={id} />
}

export default EditMatchupPage
