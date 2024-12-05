"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebRTCHandler = void 0;
const base_handler_1 = require("./base.handler");
const constants_1 = require("../config/constants");
class WebRTCHandler extends base_handler_1.BaseHandler {
    initialize() {
        this.handleIceCandidate();
        this.handleOffer();
        this.handleAnswer();
    }
    handleIceCandidate() {
        this.socket.on(constants_1.SOCKET_EVENTS.ICE_CANDIDATE, async (roomId, userId, candidate) => {
            await this.publishToRoom(roomId, constants_1.SOCKET_EVENTS.ICE_CANDIDATE, {
                userId,
                candidate
            });
        });
    }
    handleOffer() {
        this.socket.on(constants_1.SOCKET_EVENTS.OFFER, async (roomId, userId, offer) => {
            await this.publishToRoom(roomId, constants_1.SOCKET_EVENTS.OFFER, {
                userId,
                offer
            });
        });
    }
    handleAnswer() {
        this.socket.on(constants_1.SOCKET_EVENTS.ANSWER, async (roomId, userId, answer) => {
            await this.publishToRoom(roomId, constants_1.SOCKET_EVENTS.ANSWER, {
                userId,
                answer
            });
        });
    }
}
exports.WebRTCHandler = WebRTCHandler;
//# sourceMappingURL=webrtc.handler.js.map