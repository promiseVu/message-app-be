import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { MessagesService } from '../messages/messages.service';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { Socket } from 'socket.io';

interface WebsocketResponse {
  status: 'success' | 'error';
  data: any;
}
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  private userSocket: Map<string, Set<string>> = new Map();
  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessagesService,
  ) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinConversation')
  async joinConversation(
    @MessageBody() payload: { conversationId: string },
    @ConnectedSocket() socket: Socket,
  ): Promise<WebsocketResponse> {
    try {
      socket.join(payload.conversationId);
      if (!this.userSocket.has(payload.conversationId)) {
        this.userSocket.set(payload.conversationId, new Set());
      }
      this.userSocket.get(payload.conversationId)?.add(socket.id);
      const listMessages = await this.messageService.getConversationMessages(
        payload.conversationId,
      );
      return { status: 'success', data: listMessages };
    } catch (e) {
      console.error(e);
    }
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody() payload: { message: CreateMessageDto },
    @ConnectedSocket() socket: Socket,
  ) {
    const response = await this.messageService.create({
      ...payload.message,
      sender: socket.data.user._id,
    });

    const message = await this.messageService.findById(response._id.toString());

    this.server
      .to(payload.message.conversation)
      .emit('receivedMessage', { status: 'success', data: message });
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
