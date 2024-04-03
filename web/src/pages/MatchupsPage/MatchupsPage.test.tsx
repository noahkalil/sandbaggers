import { render } from '@redwoodjs/testing/web'

import MatchupsPage from './MatchupsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MatchupsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MatchupsPage />)
    }).not.toThrow()
  })
})
