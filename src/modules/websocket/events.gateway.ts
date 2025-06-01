import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private readonly authService: AuthService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): any {
    console.log('Received data:', data);
  }

  async handleConnection(socket) {
    console.log(`Websocket connection`, socket.handshake.auth.token);
    if (socket.handshake.auth.token) {
      const user = await this.authService.validateToken(
        socket.handshake.auth.token,
      );
      if (user) {
        socket.data.user = user; // Lưu thông tin người dùng vào socket
      } else {
        socket.disconnect();
      }
    } else {
      socket.disconnect();
    }
  }

  // Xử lý khi client ngắt kết nối
  handleDisconnect() {
    console.log(`Websocket disconnected`);
  }
}
