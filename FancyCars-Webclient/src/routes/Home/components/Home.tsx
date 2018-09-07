import * as React from 'react';
import { HomeProps } from '../containers/HomeContainer';

const initialState: HomeProps.IState = {
    carList: new Array()
};

class Home extends React.Component<HomeProps.IProps, HomeProps.IState>{
    constructor(props: HomeProps.IProps) {
        super(props);

        this.state = initialState;

        this.renderCarList = this.renderCarList.bind(this);
    }

    componentDidMount() {
        this.props.retrieveCars().then((response) => {
            if (!!response.payload.cars && response.payload.cars.length > 0) {
                this.setState({
                    carList: response.payload.cars
                });
            }
            else {
                console.log("Hi");
            }
        });
    }

    renderCarList() {
        if (!!this.state.carList && this.state.carList.length > 0) {
            return this.state.carList.map((car) => {
                return (
                    <div key={car.id} className="car-div">
                        {car.name}
                    </div>
                );
            });
        }
        else {
            return (
                <h5>No cars in stock</h5>
            );
        }
    }

    render() {
        return (
            <div className='home-layout'>
                <div className='header-photo'>
                    <img src={require('../../../assets/lambo.jpg')} style={{ width: '100%', height: '20%' }} />
                </div>

                <div className='car-show'>
                    {this.renderCarList()}
                </div>
            </div>
        );
    }
}

export default Home;