import { Server, Socket } from 'socket.io';

export type SocketEventPayload<T> = {
  server: Server;
  socket: Socket;
  userId: number;
} & T;
