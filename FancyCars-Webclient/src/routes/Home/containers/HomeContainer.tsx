import { connect } from 'react-redux';
import Home from '../components/Home';
import { ICar, ICarAvailableAction, IRetrieveCarsAction } from '../../../models/Car';
import { retrieveCars, checkAvailability } from '../../../modules/car';

export namespace HomeProps {
    export interface IStateProps {
        cars: Array<ICar>;
        available: string;
    }

    export interface IDispatchProps {
        retrieveCars: () => Promise<IRetrieveCarsAction>;
        checkAvailability: (carID: number) => Promise<ICarAvailableAction>;
    }

    export interface IOwnProps {
    }

    export interface IProps extends IStateProps, IDispatchProps, IOwnProps { }

    export interface IState {
        carList: Array<ICar>;
        windowWidth: number;
        isSorting?: boolean;
        isSortedByName?: boolean;
        sortType?: string;
        isSortedByAvailability?: boolean;
        isCarSelected?: boolean;
    }
}

function mapStateToProps(state: any) {
    return {
        cars: state.cars.cars,
        available: state.cars.available
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        retrieveCars: () => dispatch(retrieveCars()),
        checkAvailability: (carID: number) => dispatch(checkAvailability(carID))
    };
}

export default connect<HomeProps.IStateProps, HomeProps.IDispatchProps, HomeProps.IOwnProps>(mapStateToProps, mapDispatchToProps)(Home);
