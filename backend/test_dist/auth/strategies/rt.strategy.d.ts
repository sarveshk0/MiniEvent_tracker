import { Strategy } from 'passport-jwt';
import { Request } from 'express';
declare const RtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class RtStrategy extends RtStrategy_base {
    constructor();
    validate(req: Request, payload: any): any;
}
export {};
