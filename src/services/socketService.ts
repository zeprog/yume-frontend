import { io, Socket } from 'socket.io-client';

export class SocketService {
  private socket: Socket | null = null;

  connect(serverUrl: string) {
    if (this.socket) {
      console.warn('Socket is already connected.');
      return;
    }
    this.socket = io(serverUrl);

    this.socket.on('connect', () => {
      console.log(`[SocketService] Connected: ${this.socket?.id}`);
    });
    this.socket.on('disconnect', () => {
      console.log('[SocketService] Disconnected');
    });
    console.log(`[SocketService] Socket connecting to ${serverUrl}...`);
  }

  sendMessage(event: string, data: any) {
    console.log('[SocketService] Emitting event:', event, data);
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
      console.warn('[SocketService] No socket connected');
    }
  }

  onMessage(event: string, callback: (data: any) => void) {
    if (this.socket) {
      console.log(`[SocketService] onMessage for event=${event}`);
      this.socket.on(event, callback);
    } else {
      console.warn(`[SocketService] Socket not connected. Cannot listen: ${event}`);
    }
  }

  offMessage(event: string, callback: (data: any) => void) {
    if (this.socket) {
      console.log(`[SocketService] offMessage for event=${event}`);
      this.socket.off(event, callback);
    } else {
      console.warn(`[SocketService] Socket not connected. Cannot off: ${event}`);
    }
  }

  disconnect() {
    if (this.socket) {
      console.log('[SocketService] Disconnecting socket...');
      this.socket.disconnect();
      this.socket = null;
    } else {
      console.warn('[SocketService] Socket is already disconnected.');
    }
  }
}

export const socketService = new SocketService();
