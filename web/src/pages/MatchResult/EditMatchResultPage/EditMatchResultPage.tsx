import EditMatchResultCell from 'src/components/MatchResult/EditMatchResultCell'

type MatchResultPageProps = {
  id: number
}

const EditMatchResultPage = ({ id }: MatchResultPageProps) => {
  return <EditMatchResultCell id={id} />
}

export default EditMatchResultPage
