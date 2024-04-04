// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Players" titleTo="players" buttonLabel="New Player" buttonTo="newPlayer">
        <Route path="/players/new" page={PlayerNewPlayerPage} name="newPlayer" />
        <Route path="/players/{id:Int}/edit" page={PlayerEditPlayerPage} name="editPlayer" />
        <Route path="/players/{id:Int}" page={PlayerPlayerPage} name="player" />
        <Route path="/players" page={PlayerPlayersPage} name="players" />
      </Set>
      <Set wrap={ScaffoldLayout} title="MatchResults" titleTo="matchResults" buttonLabel="New MatchResult" buttonTo="newMatchResult">
        <Route path="/match-results/new" page={MatchResultNewMatchResultPage} name="newMatchResult" />
        <Route path="/match-results/{id:Int}/edit" page={MatchResultEditMatchResultPage} name="editMatchResult" />
        <Route path="/match-results/{id:Int}" page={MatchResultMatchResultPage} name="matchResult" />
        <Route path="/match-results" page={MatchResultMatchResultsPage} name="matchResults" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Matchups" titleTo="matchups" buttonLabel="New Matchup" buttonTo="newMatchup">
        <Route path="/matchups/new" page={MatchupNewMatchupPage} name="newMatchup" />
        <Route path="/matchups/{id:Int}/edit" page={MatchupEditMatchupPage} name="editMatchup" />
        <Route path="/matchups/{id:Int}" page={MatchupMatchupPage} name="matchup" />
        <Route path="/matchups" page={MatchupMatchupsPage} name="matchups" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Teams" titleTo="teams" buttonLabel="New Team" buttonTo="newTeam">
        <Route path="/teams/new" page={TeamNewTeamPage} name="newTeam" />
        <Route path="/teams/{id:Int}/edit" page={TeamEditTeamPage} name="editTeam" />
        <Route path="/teams/{id:Int}" page={TeamTeamPage} name="team" />
        <Route path="/teams" page={TeamTeamsPage} name="teams" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Seasons" titleTo="seasons" buttonLabel="New Season" buttonTo="newSeason">
        <Route path="/seasons/new" page={SeasonNewSeasonPage} name="newSeason" />
        <Route path="/seasons/{id:Int}/edit" page={SeasonEditSeasonPage} name="editSeason" />
        <Route path="/seasons/{id:Int}" page={SeasonSeasonPage} name="season" />
        <Route path="/seasons" page={SeasonSeasonsPage} name="seasons" />
      </Set>
d     <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
