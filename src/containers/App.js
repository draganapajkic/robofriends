import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
// import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [], //niz robots
            searchfield: '',
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response =>
            response.json()).then(users => this.setState({ robots: users }))
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const { robots, searchfield } = this.state; // da bi robots ili searchfiled moglo da stoji samo, inace bi pisalo this.stane.robots ili this.state.searchfiled
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })

        if (robots.length === 0) { // ili (!robots.length)
            return <h1>Loading</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        {/* <ErrorBoundry> */}
                            <CardList robots={filteredRobots} />
                        {/* </ErrorBoundry> */}
                    </Scroll>   
                </div>
            );
        }


        // II nacin
        //return !robot.length ? <h1>...</h1> : (<div>.......</div>)
    }
}

export default App;