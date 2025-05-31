import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): any {
    console.log('Received data:', data);
  }

  handleConnection() {
    console.log(`Websocket connection`);
  }

  // Xử lý khi client ngắt kết nối
  handleDisconnect() {
    console.log(`Websocket disconnected`);
  }
}
