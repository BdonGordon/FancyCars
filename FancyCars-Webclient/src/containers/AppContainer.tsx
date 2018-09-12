import * as React from 'react';
import CoreLayout from '../layouts/CoreLayout';
import { Store } from 'redux';
import { Provider } from 'react-redux';

interface IAppContainer extends React.Props<any> {
    store: Store<any>;
}

/**
 * Provide the application with the store here
 */
class AppContainer extends React.Component<IAppContainer, {}> {
    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <div className="body">
                    <CoreLayout />
                </div>
            </Provider>
        );
    }
}

export default AppContainer;