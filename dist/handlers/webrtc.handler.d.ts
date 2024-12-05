import { BaseHandler } from './base.handler';
export declare class WebRTCHandler extends BaseHandler {
    initialize(): void;
    private handleIceCandidate;
    private handleOffer;
    private handleAnswer;
}
