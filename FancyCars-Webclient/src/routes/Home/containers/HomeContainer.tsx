import { connect } from 'react-redux';
import Home from '../components/Home';

export namespace HomeProps {
    export interface IStateProps {
    }

    export interface IDispatchProps {
    }

    export interface IOwnProps {
    }

    export interface IProps extends IStateProps, IDispatchProps, IOwnProps { }

    export interface IState {

    }
}

function mapStateToProps(state: any) {
    return {

    };
}

function mapDispatchToProps(dispatch: any) {
    return {

    };
}

export default connect<HomeProps.IStateProps, HomeProps.IDispatchProps, HomeProps.IOwnProps>(mapStateToProps, mapDispatchToProps)(Home);
