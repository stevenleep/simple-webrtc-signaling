import { BaseHandler } from './base.handler';
import { SOCKET_EVENTS } from '../config/constants';
import { RTCMessage, RTCIceCandidateInit, RTCSessionDescriptionInit } from '../types/webrtc';

export class WebRTCHandler extends BaseHandler {
  initialize(): void {
    this.handleIceCandidate();
    this.handleOffer();
    this.handleAnswer();
  }

  private handleIceCandidate(): void {
    this.socket.on(
      SOCKET_EVENTS.ICE_CANDIDATE,
      async (roomId: string, userId: string, candidate: RTCIceCandidateInit) => {
        await this.publishToRoom(roomId, SOCKET_EVENTS.ICE_CANDIDATE, {
          userId,
          candidate
        });
      }
    );
  }

  private handleOffer(): void {
    this.socket.on(
      SOCKET_EVENTS.OFFER,
      async (roomId: string, userId: string, offer: RTCSessionDescriptionInit) => {
        await this.publishToRoom(roomId, SOCKET_EVENTS.OFFER, {
          userId,
          offer
        });
      }
    );
  }

  private handleAnswer(): void {
    this.socket.on(
      SOCKET_EVENTS.ANSWER,
      async (roomId: string, userId: string, answer: RTCSessionDescriptionInit) => {
        await this.publishToRoom(roomId, SOCKET_EVENTS.ANSWER, {
          userId,
          answer
        });
      }
    );
  }
} 