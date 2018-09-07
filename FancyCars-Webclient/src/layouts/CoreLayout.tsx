import * as React from 'react';
import { BrowserRouter, Route, NavLink, Link } from 'react-router-dom';
import Routes from '../routes/index';
import Header from '../components/Header/components/Header';

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
                <div>
                    <div className="layoutMain">
                        <div className="layoutHeader">
                            <Header />
                        </div>

                        <div className="layoutRoutes">
                            <Routes />
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default CoreLayout;