import { AnyAction } from 'redux';

export interface ICar {
    id: number;
    img: string;
    name: string;
    make: string;
    model: string;
    year: number;
    available: boolean;
}

export interface IRetrieveCarsAction extends AnyAction {
    error?: boolean;
    payload: {
        cars: Array<ICar>;
        response?: {
            errors?: {};
            message?: string;
        }
    }
}

export interface ICarAvailable extends AnyAction {
    error?: boolean;
    payload: {
        available: string;
        response?: {
            errors?: {};
            message?: string;
        }
    }
}

