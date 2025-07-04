import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  // Entra em uma "sala" com base no userId passado no handshake
  handleConnection(socket: Socket) {
    const userId = socket.handshake.query['userId'];
    if (userId) {
      void socket.join(String(userId));
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`Usuário ${userId} conectado via WebSocket`);
    }
  }

  notificarConfirmacao(userId: number, dados: any) {
    console.log(
      `Notificando usuário ${userId} sobre confirmação de pagamento`,
      dados,
    );
    this.server.to(String(userId)).emit('pagamento.confirmado', dados);
  }
}
