import { Server as HTTPServer } from 'http';
import { WebSocket, WebSocketServer as WSServer } from 'ws';
import { logger } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

interface Client {
  id: string;
  ws: WebSocket;
  subscriptions: Set<string>;
}

export class WebSocketServer {
  private wss: WSServer;
  private clients: Map<string, Client> = new Map();

  constructor(server: HTTPServer) {
    this.wss = new WSServer({ server, path: '/ws' });
    this.initialize();
  }

  private initialize() {
    this.wss.on('connection', (ws: WebSocket) => {
      const clientId = uuidv4();
      const client: Client = {
        id: clientId,
        ws,
        subscriptions: new Set(),
      };

      this.clients.set(clientId, client);
      logger.info(`WebSocket client connected: ${clientId}`);

      ws.on('message', (data: string) => {
        this.handleMessage(client, data);
      });

      ws.on('close', () => {
        this.clients.delete(clientId);
        logger.info(`WebSocket client disconnected: ${clientId}`);
      });

      ws.on('error', (error) => {
        logger.error(`WebSocket error for ${clientId}:`, error);
      });
    });
  }

  private handleMessage(client: Client, data: string) {
    try {
      const message = JSON.parse(data);
      const { type, payload } = message;

      switch (type) {
        case 'subscribe':
          this.handleSubscribe(client, payload);
          break;
        case 'unsubscribe':
          this.handleUnsubscribe(client, payload);
          break;
        default:
          logger.warn(`Unknown message type: ${type}`);
      }
    } catch (error) {
      logger.error('Error handling WebSocket message:', error);
    }
  }

  private handleSubscribe(client: Client, payload: any) {
    const { channel } = payload;
    client.subscriptions.add(channel);
    logger.info(`Client ${client.id} subscribed to ${channel}`);

    client.ws.send(
      JSON.stringify({
        type: 'subscription_confirmed',
        channel,
      })
    );
  }

  private handleUnsubscribe(client: Client, payload: any) {
    const { channel } = payload;
    client.subscriptions.delete(channel);
    logger.info(`Client ${client.id} unsubscribed from ${channel}`);
  }

  public broadcast(channel: string, data: any) {
    this.clients.forEach((client) => {
      if (client.subscriptions.has(channel)) {
        client.ws.send(
          JSON.stringify({
            type: 'data',
            channel,
            data,
          })
        );
      }
    });
  }
}
