import { Injectable, Scope } from '@nestjs/common';
import { ConnectOptions, Connection, createConnection } from 'mongoose';

@Injectable({ scope: Scope.REQUEST })
export class TenantDatabaseService {
  private connections: Map<string, Connection> = new Map();

  async getConnection(tenantId: string): Promise<Connection> {
    if (this.connections.has(tenantId)) {
      return this.connections.get(tenantId);
    }

    const connection = await createConnection(
      `mongodb://0.0.0.0:27017/${tenantId}`,
      {
        dbName: tenantId,
      } as ConnectOptions,
    );

    this.connections.set(tenantId, connection);
    return connection;
  }
}
