export interface RTCMessage {
  userId: string;
  roomId: string;
  candidate?: RTCIceCandidateInit;
  sdp?: RTCSessionDescriptionInit;
  type: 'offer' | 'answer' | 'candidate';
}

// 如果不想使用 DOM 类型库，可以手动定义这些接口
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