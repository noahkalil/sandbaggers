import MatchResultCell from 'src/components/MatchResult/MatchResultCell'

type MatchResultPageProps = {
  id: number
}

const MatchResultPage = ({ id }: MatchResultPageProps) => {
  return <MatchResultCell id={id} />
}

export default MatchResultPage
