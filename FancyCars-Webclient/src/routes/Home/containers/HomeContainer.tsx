import { connect } from 'react-redux';
import Home from '../components/Home';
import { ICar, ICarAvailable, IRetrieveCarsAction } from '../../../models/Car';
import { retrieveCars, checkAvailability } from '../../../modules/car';

export namespace HomeProps {
    export interface IStateProps {
        cars: Array<ICar>;
        available: string;
    }

    export interface IDispatchProps {
        retrieveCars: () => Promise<IRetrieveCarsAction>;
    }

    export interface IOwnProps {
    }

    export interface IProps extends IStateProps, IDispatchProps, IOwnProps { }

    export interface IState {
        unsortedCarList: Array<ICar>;
        carList: Array<ICar>;
        windowWidth: number;
        isSorting?: boolean;
        isSortedByNameAscending?: boolean;
        isSortedByNameDescending?: boolean;
        isSortedByAvailability?: boolean;
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
        retrieveCars: () => dispatch(retrieveCars())
    };
}

export default connect<HomeProps.IStateProps, HomeProps.IDispatchProps, HomeProps.IOwnProps>(mapStateToProps, mapDispatchToProps)(Home);
