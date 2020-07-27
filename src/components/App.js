import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { handleInitialData } from '../actions/shared'
import Home from './Home'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Leaderboard from './Leaderboard'
import Login from './Login'
import Nav from './Nav'

import '../App.css';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        return (
            <Router>
              <Fragment>
                <LoadingBar />
                <div className='container'>
                <Nav />
                {!this.props.loggedIn
                    ?
                    (<Login />)
                    : (<div>
                       <Route path='/' exact component={Home} />
                       <Route path='/questions/:question_id' component={QuestionPage} />
                       <Route path='/add' component={NewQuestion} />
                       <Route path='/leaderboard' component={Leaderboard} />
                       <Route path='/login' component={Login} />
                      </div>
                  )}
                      </div>
                 </Fragment>
               </Router>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        loggedIn: authedUser
    }
}
export default connect(mapStateToProps)(App);
