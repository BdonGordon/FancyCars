import { ICar, ICarAvailable, IRetrieveCarsAction } from '../models/Car';
import { CALL_API } from 'redux-api-middleware';
import { CARS_SERVICE_URL, AVAILABILITY_URL } from '../api/databaseConstants';

const GET_CARS_REQUEST = 'cars/GET_CARS_REQUEST';
const GET_CARS_RESPONSE = 'cars/GET_CARS_RESPONSE';
const GET_CARS_ERROR = 'cars/GET_CARS_ERROR';

const CHECK_AVAILABLE_REQUEST = 'availability/CHECK_AVAILABLE_REQUEST';
const CHECK_AVAILABLE_RESPONSE = 'availability/CHECK_AVAILABLE_RESPONSE';
const CHECK_AVAILABLE_ERROR = 'availability/CHECK_AVAILABLE_ERROR';

type ICarActions = ICarAvailable & IRetrieveCarsAction;

interface ICarState {
    readonly isFetching: boolean;
    readonly cars: Array<ICar>;
    readonly available: string;
}

const initialState: ICarState = {
    isFetching: false,
    cars: new Array(),
    available: ''
};

//https://dashboard.ngrok.com/get-started#
export function retrieveCars(): ICallApiAction {
    return {
        [CALL_API]: {
            endpoint: CARS_SERVICE_URL,
            method: 'GET',
            types: [GET_CARS_REQUEST, GET_CARS_RESPONSE, GET_CARS_ERROR],
            headers: {
                'Content-Type': 'application/json'
            }
        }
    };
}

export function checkAvailability(carID: number): ICallApiAction {
    return {
        [CALL_API]: {
            endpoint: `${AVAILABILITY_URL}${carID}`,
            method: 'GET',
            types: [CHECK_AVAILABLE_REQUEST, CHECK_AVAILABLE_RESPONSE, CHECK_AVAILABLE_ERROR],
            headers: {
                'Content-Type': 'application/json'
            }
        }
    };
}

export function carsReducer(state: ICarState = initialState, action: ICarActions) {
    switch (action.type) {
        case GET_CARS_REQUEST: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }

        case GET_CARS_RESPONSE: {
            return Object.assign({}, state, {
                isFetching: false,
                cars: action.payload.cars
            });
        }

        case GET_CARS_ERROR: {
            return Object.assign({}, state, {
                isFetching: false
            });
        }

        case CHECK_AVAILABLE_REQUEST: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }

        case CHECK_AVAILABLE_RESPONSE: {
            return Object.assign({}, state, {
                isFetching: false,
                available: action.payload.available
            });
        }

        case CHECK_AVAILABLE_ERROR: {
            return Object.assign({}, state, {
                isFetching: false
            });
        }

        default:
            return state;
    }
}