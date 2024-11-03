export interface Message {
  _id: string;
  senderId: string;
  message: string;
  shouldShake: boolean;
  createdAt: Date;
}
