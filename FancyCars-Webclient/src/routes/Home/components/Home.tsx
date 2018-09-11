import * as React from 'react';
import { HomeProps } from '../containers/HomeContainer';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { ICar } from '../../../models/Car';

const initialState: HomeProps.IState = {
    carList: new Array(),
    windowWidth: window.innerWidth,
    isSortedByName: false,
    sortType: 'ascending',
    isSortedByAvailability: false,
    isSorting: false
};

class Home extends React.Component<HomeProps.IProps, HomeProps.IState>{
    constructor(props: HomeProps.IProps) {
        super(props);

        this.state = initialState;

        this.renderCarList = this.renderCarList.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleSortByName = this.handleSortByName.bind(this);
        this.handleSortByAvailability = this.handleSortByAvailability.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);

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

    componentDidUpdate(prevProps: HomeProps.IProps, previousState: HomeProps.IState) {
        if (previousState.isSortedByAvailability !== this.state.isSortedByAvailability) {
            this.setState({
                carList: this.handleSortByAvailability(this.state.isSortedByAvailability)
            })
        }
        if (previousState.isSortedByName !== this.state.isSortedByName) {
            if (this.state.isSortedByName) {
                console.log("Sorted by name: " + this.state.sortType);
            }
            else {
                console.log("Unsorted: " + this.state.sortType);
            }
        }
    }


    /*
     * cars = cars.sort((carOne, carTwo) => {
                return carOne.name.charCodeAt(0) - carTwo.name.charCodeAt(0);
            });
     * */
    handleSortByName(sortType?: string): Array<ICar> {
        let cars: Array<ICar> = this.state.carList;

        return cars;
    }

    handleSortByAvailability(sorted: boolean): Array<ICar> {
        let cars: Array<ICar> = this.state.carList;

        if (sorted) {
            cars = this.state.carList.filter((car) => {
                if (car.available.toUpperCase() === "In Dealership".toUpperCase()) {
                    return car;
                }
            });
            return cars;
        }
        return this.props.cars;
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({
            windowWidth: window.innerWidth
        });
    }

    renderColumnDimensions(): string {
        if (this.state.windowWidth < 450) {
            return 'repeat(1, 1fr)';
        }
        else if (this.state.windowWidth < 650) {
            return 'repeat(2, 1fr)';
        }
        else if (this.state.windowWidth < 1000) {
            return 'repeat(3, 1fr)';
        }

        return 'repeat(4, 1fr)';
    }

    renderCarList() {
        if (!!this.state.carList && this.state.carList.length > 0) {
            return this.state.carList.map((car) => {
                return (
                    <div className="card" key={car.id}>
                        <div className="card-img">
                            <img src={require('../../../assets/lambo.jpg')} alt='Car 1' style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className="card-content">
                            <h4>{car.name}</h4>
                            <p className="price">{car.make}</p>
                            <p>{car.model}</p>
                            <p><button className={car.available.toUpperCase() === "In Dealership".toUpperCase()
                                ? 'available-button' : car.available.toUpperCase() === "Out of Stock".toUpperCase() ? 'out-of-stock-button' : 'unavailable-button'}>
                                {car.available.toUpperCase() === "In Dealership".toUpperCase() ? "BUY" : car.available.toUpperCase()}
                            </button></p>
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

    //for dropdown: this.renderSortByOptions() => return <text onClick={this.sortBy}> </text>

    render() {
        return (
            <div className='home-layout'>
                <div className='header-photo'>
                    <img src={require('../../../assets/lambo.jpg')} style={{ width: '100%', height: '20%' }} />
                </div>

                <div className='sort-by-dropdown'>
                    <button className="dropdown-button" onClick={() => this.setState({ isSorting: !this.state.isSorting })}>Sort By</button>
                    <div className="dropdown-content" style={{ display: this.state.isSorting ? 'block' : 'none' }}>
                        <text onClick={() => this.setState({ isSortedByName: !this.state.isSortedByName })}
                            style={{ color: this.state.isSortedByName ? '#3498DB' : '' }}>
                            Name
                        </text>
                        <text onClick={() => this.setState({ isSortedByAvailability: !this.state.isSortedByAvailability })}
                            style={{ color: this.state.isSortedByAvailability ? '#3498DB' : '' }}>
                            Available
                        </text>
                    </div>
                    <label className="sort-label" style={{ display: this.state.isSortedByName ? 'inline' : 'none' }}
                        onClick={() => this.setState({ sortType: this.state.sortType === "ascending" ? "descending" : "ascending" })}>
                        {this.state.sortType === "ascending" ? "Z-A" : "A-Z"}
                    </label>
                </div>

                <div className={isBrowser ? 'car-show' : 'car-show-mobile'} style={{ backgroundColor: 'darkolivegreen', gridTemplateColumns: this.renderColumnDimensions()}} >
                    {this.renderCarList()}
                </div>
            </div>
        );
    }
}

export default Home;