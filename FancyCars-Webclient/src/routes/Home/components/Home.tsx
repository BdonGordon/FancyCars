import * as React from 'react';
import { HomeProps } from '../containers/HomeContainer';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const initialState: HomeProps.IState = {
    carList: new Array()
};

class Home extends React.Component<HomeProps.IProps, HomeProps.IState>{
    constructor(props: HomeProps.IProps) {
        super(props);

        this.state = initialState;

        this.renderCarList = this.renderCarList.bind(this);
        this.renderTestCards = this.renderTestCards.bind(this);
    }

    componentDidMount() {
        this.props.retrieveCars().then((response) => {
            if (!!response.payload.cars && response.payload.cars.length > 0) {
                this.setState({
                    carList: response.payload.cars
                });
            }
            else {
            }
        });
    }

    renderCarList() {
        if (!!this.state.carList && this.state.carList.length > 0) {
            return this.state.carList.map((car) => {
                return (
                    <div key={car.id} className="car-div">
                        {/*height will be adjusted accordingly based on the phone*/}
                        <div className="car-image" style={{ height: 80 }}>
                            
                        </div>
                        <div className="car-content">
                            {car.name}
                        </div>
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

    renderTestCards() {
            return (
                <div className={isBrowser ? 'car-show' : 'car-show-mobile'}>
                    <div className="card">
                        <div className="card-img">
                            <img src={require('../../../assets/lambo.jpg')} alt='Car 1' style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className="card-content">
                            <h4>Lambo dambo</h4>
                            <p className="price">$19.99</p>
                            <p>Text about jeans ... </p>
                            <p><button>Buy</button></p>
                        </div>
                    </div>
                    <div className="card">
                        <img src={require('../../../assets/lambo.jpg')} alt='Car 1' style={{ width: '100%' }} />
                        <h4>Lambo dambo 2</h4>
                        <p className="price">$19.99</p>
                        <p>Text about jeans ... </p>
                        <p><button>Buy</button></p>
                    </div>
                    <div className="card">
                        <img src={require('../../../assets/lambo.jpg')} alt='Car 1' style={{ width: '100%' }} />
                        <h4>Lambo dambo</h4>
                        <p className="price">$19.99</p>
                        <p>Text about jeans ... </p>
                        <p><button>Buy</button></p>
                    </div>
                    <div className="card">
                        <img src={require('../../../assets/lambo.jpg')} alt='Car 1' style={{ width: '100%' }} />
                        <h4>Lambo dambo 3</h4>
                        <p className="price">$19.99</p>
                        <p>Text about jeans ... </p>
                        <p><button>Buy</button></p>
                    </div>
                    <div className="card">
                        <img src={require('../../../assets/lambo.jpg')} alt='Car 1' style={{ width: '100%' }} />
                        <h4>Lambo dambo 4</h4>
                        <p className="price">$19.99</p>
                        <p>Text about jeans ... </p>
                        <p><button>Buy</button></p>
                    </div>
                </div>
            );
    }

    render() {
        return (
            <div className='home-layout'>
                <div className='header-photo'>
                    <img src={require('../../../assets/lambo.jpg')} style={{ width: '100%', height: '20%' }} />
                </div>

                <div className='option-div'>
                    <h6>Sort By:</h6>
                    <button>Test</button>
                </div>

                {this.renderTestCards()}
            </div>
        );
    }
}

export default Home;