import { Strategy } from 'passport-jwt';
declare const AtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class AtStrategy extends AtStrategy_base {
    constructor();
    validate(payload: any): {
        userId: any;
        email: any;
        role: any;
    };
}
export {};
