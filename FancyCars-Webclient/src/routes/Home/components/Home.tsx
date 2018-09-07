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
            response.payload.cars.map((car) => {
                console.log(car);
            });
        });
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                Home
            </div>
        );
    }
}

export default Home;