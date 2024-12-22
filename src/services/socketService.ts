import { io, Socket } from 'socket.io-client';

export class SocketService {
  private socket: Socket | null = null;

  connect(serverUrl: string) {
    this.socket = io(serverUrl);
    console.log(`Socket connected to ${serverUrl}`);
    this.socket.on('connect', () => {
      console.log(`Socket successfully connected: ${this.socket?.id}`);
    });
    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }
  
  sendMessage(event: string, data: any) {
    console.log(`Sending message: Event=${event}, Data=`, data);
    this.socket?.emit(event, data);
  }
  
  onMessage(event: string, callback: (data: any) => void) {
    console.log(`Listening for event: ${event}`);
    this.socket?.on(event, callback);
  }
  
  disconnect() {
    console.log('Disconnecting socket');
    this.socket?.disconnect();
  }
  
}

export const socketService = new SocketService();