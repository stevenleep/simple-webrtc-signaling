export interface WebRTCMessage {
  userId: string;
  roomId: string;
  type: string;
  payload: any;
}

export interface IceCandidate {
  userId: string;
  candidate: RTCIceCandidate;
}

export interface SDPMessage {
  userId: string;
  sdp: RTCSessionDescription;
}

export interface RoomMessage {
  roomId: string;
  userId: string;
  type: string;
  payload?: any;
}
