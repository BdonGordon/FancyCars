import * as React from 'react';
import { HomeProps } from '../containers/HomeContainer';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { ICar } from '../../../models/Car';

const initialState: HomeProps.IState = {
    carList: new Array(),
    windowWidth: window.innerWidth,
    isSortedByName: false,
    sortType: 'ascending',
    sortedByAvailabilityType: '',
    isSorting: false,
    isCarSelected: false,
    carSelected: undefined
};

class Home extends React.Component<HomeProps.IProps, HomeProps.IState>{
    constructor(props: HomeProps.IProps) {
        super(props);

        this.state = initialState;

        this.renderCarList = this.renderCarList.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleSortByName = this.handleSortByName.bind(this);
        this.handleSortByAvailability = this.handleSortByAvailability.bind(this);
        this.handleSelectCar = this.handleSelectCar.bind(this);
        this.renderDialogMessage = this.renderDialogMessage.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);

        //immediately when the component is mounted, we want to grab all the car objects from the API to display once component is rendered
        this.props.retrieveCars().then((response) => {
            if (!!response.payload.cars && response.payload.cars.length > 0) {
                this.setState({
                    carList: response.payload.cars
                });
            }
        });
    }

    /**
     * This lifecycle method, for this app, is just to keep track of filtering interaction
     * @param prevProps
     * @param previousState
     */
    componentDidUpdate(prevProps: HomeProps.IProps, previousState: HomeProps.IState) {
        if (previousState.sortedByAvailabilityType !== this.state.sortedByAvailabilityType) {
            this.setState({
                carList: this.handleSortByAvailability(this.state.sortedByAvailabilityType)
            });
            //if the list is still sorted by name, but the availability filter is removed
            if (this.state.isSortedByName && !(!!this.state.sortedByAvailabilityType)) {
                this.setState({
                    carList: this.handleSortByName(this.state.sortType, this.props.cars)
                });
            }
        }
        if (previousState.isSortedByName !== this.state.isSortedByName) {
            if (this.state.isSortedByName) {
                if (!!this.state.sortedByAvailabilityType) {
                    this.setState({
                        carList: this.handleSortByName(this.state.sortType)
                    });
                }
                else {
                    this.setState({
                        carList: this.handleSortByName(this.state.sortType, this.props.cars)
                    });
                }
            }
            else {
                this.setState({
                    carList: this.handleSortByName()
                })
            }
        }

        if (previousState.sortType !== this.state.sortType) {
            if (this.state.isSortedByName) {
                this.setState({
                    carList: this.handleSortByName(this.state.sortType)
                })
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    /**
     * Continuously listens to the window resizing to adjust the number of cars shown per row
     */
    updateWindowDimensions() {
        this.setState({
            windowWidth: window.innerWidth
        });
    }

    /**
     * 
     * @param sortType ==> optional. If 'ascending', then the cars will be sorted in ascending alphabetical order ... vise versa for 'descending'
     */
    handleSortByName(sortType?: string, carsFromAvailability?: Array<ICar>): Array<ICar> {
        let cars: Array<ICar> = !!carsFromAvailability ? carsFromAvailability : this.state.carList;

        if (!!sortType) {
            if (sortType === 'ascending') {
                return cars.sort((carOne: ICar, carTwo: ICar) => {
                    //strip all the spaces then convert to uppercase to get proper matching of ASCII values
                    let carOneName = carOne.name.replace(/ /g, '').toUpperCase();
                    let carTwoName = carTwo.name.replace(/ /g, '').toUpperCase();

                    for (let i = 0; i < carOne.name.length - 1; i++) {
                        //traverse through each character until one is different, then we compare and return
                        if (carOneName.charCodeAt(i) !== carTwoName.charCodeAt(i)) {
                            return carOneName.charCodeAt(i) - carTwoName.charCodeAt(i);
                        }
                    }
                });
            }
            else {
                return cars.sort((carOne: ICar, carTwo: ICar) => {
                    let carOneName = carOne.name.replace(/ /g, '').toUpperCase();
                    let carTwoName = carTwo.name.replace(/ /g, '').toUpperCase();

                    for (let i = 0; i < carTwo.name.length-1; i++) {
                        if (carTwoName.charCodeAt(i) !== carOneName.charCodeAt(i)) {
                            return carTwoName.charCodeAt(i) - carOneName.charCodeAt(i);
                        }
                    }
                });
            }
        }

        //if sortType does not contain a value, then we sort how we originally received the cars from the API (from ascending id value)
        return cars.sort((carOne: ICar, carTwo: ICar) => {
            return carOne.id - carTwo.id;
        });
    }

    /**
     * Self-explanatory
     * @param sorted
     */
    handleSortByAvailability(availablity?: string): Array<ICar> {
        let cars: Array<ICar> = this.state.carList;

        if (!!availablity) {
            if (availablity.toUpperCase() === "In Dealership".toUpperCase()) {
                cars = this.props.cars.filter((car) => {
                    if (car.available.toUpperCase() === 'In Dealership'.toUpperCase()) {
                        return car;
                    }
                });
            }
            else if (availablity.toUpperCase() === "Out of Stock".toUpperCase()) {
                cars = this.props.cars.filter((car) => {
                    if (car.available.toUpperCase() === 'Out of Stock'.toUpperCase()) {
                        return car;
                    }
                });
            }
            else if (availablity.toUpperCase() === "Unavailable".toUpperCase()) {
                cars = this.props.cars.filter((car) => {
                    if (car.available.toUpperCase() === 'Unavailable'.toUpperCase()) {
                        return car;
                    }
                });
            }

            //sort names AFTER we get the availability order of the cars
            if (this.state.isSortedByName) {
                cars = this.handleSortByName(this.state.sortType, cars);
            }

            return cars;
        }
        return this.props.cars;
    }

    /**
     * Whenever the button for the car card is pressed, this function will be called
     * @param car
     */
    handleSelectCar(car: ICar) {
        this.props.checkAvailability(car.id).then((response) => {
            //value of the availability of the car is in response.payload.available. We want to pass the object to manipulate in dialog easier
            this.setState({
                isCarSelected: true,
                carSelected: car
            });
        });
    }

    /**
     * Based on the size of the window, there we will be corresponding number of cars per row.
     * For a phone (which is typically < 450 in width will render one)
     */
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

    /**
     * Render the car list based on the database data retrieved
     */
    renderCarList() {
        if (!!this.state.carList && this.state.carList.length > 0) {
            return this.state.carList.map((car) => {
                return (
                    <div className='card' key={car.id}>
                        <div className='card-img'>
                            <img src={require('../../../assets/' + car.img + '.jpg')} alt='Car 1' style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className='card-content'>
                            <h4>{car.name}</h4>
                            <p><i>Make</i> {car.make}</p>
                            <p><i>Model</i> {car.model}</p>
                            <button onClick={() => this.handleSelectCar(car)} style={{ alignSelf: 'flex-end' }}
                                className={car.available.toUpperCase() === 'In Dealership'.toUpperCase()
                                ? 'available-button' : car.available.toUpperCase() === 'Out of Stock'.toUpperCase() ? 'out-of-stock-button' : 'unavailable-button'}>
                                {car.available.toUpperCase() === 'In Dealership'.toUpperCase() ? 'BUY' : car.available.toUpperCase()}
                            </button>
                        </div>
                    </div>
                );
            });
        }
        else {
            return (
                <h5 style={{ color: 'white' }}>No cars in stock</h5>
            );
        }
    }

    /**
     * Dialog message
     */
    renderDialogMessage(): string {
        if (this.state.carSelected.available.toLowerCase() === 'In Dealership'.toLowerCase()) {
            return `Congratulations on purchasing your ${this.state.carSelected.name} from FancyCars!`;
        }
        else if (this.state.carSelected.available.toLowerCase() === 'Unavailable'.toLowerCase()) {
            return `We sincerely apologize for the inconvenience, but our ${this.state.carSelected.name} is 
                ${this.state.carSelected.available.toLowerCase()} at the moment. Please feel free to contact us at 905-123-1234 to find out more.`;
        }
        else {
            return `We sincerely apologize for the inconvenience, but our ${this.state.carSelected.name} is currently
                ${this.state.carSelected.available.toLowerCase()}. We will receive shipment of ${this.state.carSelected.name} on December 29th, 2019.`;
        }
    }

    render() {
        return (
            <div className='home-layout'>
                <div className='header-photo'>
                    <img src={require('../../../assets/lambo.jpg')} style={{ width: '100%', height: '20%' }} />
                </div>

                <div className='sort-by-dropdown'>
                    <button className='dropdown-button' onClick={() => this.setState({ isSorting: !this.state.isSorting })}>Sort By</button>
                    <div className='dropdown-content' style={{ display: this.state.isSorting ? 'block' : 'none' }}>
                        <label onClick={() => this.setState({ isSortedByName: !this.state.isSortedByName, isSorting: false })}
                            style={{ color: this.state.isSortedByName ? '#3498DB' : '' }}>
                            Name
                        </label>
                        <label onClick={() => this.setState({
                            /*the logic here is to ensure that if an availability filter is on, and another one is selected, we will set state to
                            that newly clicked one. If we select the one that is already selected, then we clear the filter*/
                            sortedByAvailabilityType: this.state.sortedByAvailabilityType === 'In Dealership' ? '' : 'In Dealership',
                            isSorting: false
                        })}
                            style={{ color: this.state.sortedByAvailabilityType === 'In Dealership' ? '#3498DB' : '' }}>
                            In Dealership
                        </label>
                        <label onClick={() => this.setState({
                            sortedByAvailabilityType: this.state.sortedByAvailabilityType  === 'Out of Stock' ? '' : 'Out of Stock',
                            isSorting: false
                        })}
                            style={{ color: this.state.sortedByAvailabilityType === 'Out of Stock' ? '#3498DB' : '' }}>
                            Out of Stock
                        </label>
                        <label onClick={() => this.setState({
                            sortedByAvailabilityType: this.state.sortedByAvailabilityType === 'Unavailable' ? '' : 'Unavailable',
                            isSorting: false
                        })}
                            style={{ color: this.state.sortedByAvailabilityType === "Unavailable" ? '#3498DB' : '' }}>
                            Unavailable
                        </label>
                    </div>
                    <label className='sort-label' style={{ display: this.state.isSortedByName ? 'inline' : 'none' }}
                        onClick={() => this.setState({ sortType: this.state.sortType === 'ascending' ? 'descending' : 'ascending' })}>
                        <i className={this.state.sortType === 'ascending' ? 'descend-arrow' : 'ascend-arrow'} /> {this.state.sortType === 'ascending' ? 'Z-A' : 'A-Z'}
                    </label>
                </div>


                <div className='dialog-popup' style={{ display: this.state.isCarSelected ? 'flex' : 'none' }}>
                    <div className='dialog-header'>
                        <button onClick={() => { this.setState({ isCarSelected: false }) }} className='dialog-close-button'>X</button> 
                    </div>
                    <div className='dialog-content'>
                        {!!this.state.isCarSelected && <label>{this.renderDialogMessage()}</label>}
                    </div>
                </div>

                <div className={isBrowser ? 'car-show' : 'car-show-mobile'} style={{ gridTemplateColumns: this.renderColumnDimensions() }} >
                    {this.renderCarList()}
                </div>
            </div>
        );
    }
}

export default Home;