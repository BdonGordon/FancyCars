import * as React from 'react';
import { HomeProps } from '../containers/HomeContainer';

const initialState: HomeProps.IState = {

};

class Home extends React.Component<HomeProps.IProps, HomeProps.IState>{
    constructor(props: HomeProps.IProps) {
        super(props);
    }

    componentDidMount() {
        console.log("mounted");

        this.props.retrieveCars().then((response) => {
            console.log(this.props.cars.length);
        });
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <text>Home</text>
            </div>
        );
    }
}

export default Home;