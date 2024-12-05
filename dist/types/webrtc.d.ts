export interface RTCMessage {
    userId: string;
    roomId: string;
    candidate?: RTCIceCandidateInit;
    sdp?: RTCSessionDescriptionInit;
    type: 'offer' | 'answer' | 'candidate';
}
export interface RTCIceCandidateInit {
    candidate: string;
    sdpMid: string | null;
    sdpMLineIndex: number | null;
    usernameFragment: string | null;
}
export interface RTCSessionDescriptionInit {
    sdp: string;
    type: 'offer' | 'answer' | 'pranswer' | 'rollback';
}
