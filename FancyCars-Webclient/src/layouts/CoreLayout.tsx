import * as React from 'react';
import { BrowserRouter, Route, NavLink, Link } from 'react-router-dom';
//import Routes from '../routes/index';

export interface ICoreLayoutProps {
}

export interface IState {
    isVisible: boolean;
}

class CoreLayout extends React.Component<ICoreLayoutProps, IState> {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <BrowserRouter>
                <div className="core-layout__viewport" style={{ margin: 0, padding: 0, height: '100%' }}>
                    <div className="layoutMain">
                        <div className="layoutRoutes">
                            <text>Hi</text>
                        </div>

                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default CoreLayout;