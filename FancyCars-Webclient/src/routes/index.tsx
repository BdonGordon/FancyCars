import { Route, Switch } from 'react-router-dom';
import * as React from 'react';
import Home from './Home';

export default class Routes extends React.Component<{}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route path='/' component={Home}/>
            </Switch>
        );
    }
}