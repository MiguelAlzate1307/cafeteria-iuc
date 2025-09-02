import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { compare, genSalt, hash } from 'bcrypt';
import { createHash } from 'crypto';

@Injectable()
export class BcryptService implements HashingService {
  async hash(data: string | Buffer): Promise<string> {
    return await hash(data, await genSalt(10));
  }

  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return await compare(data, encrypted);
  }

  hashToken(data: string): string {
    return createHash('sha256').update(data).digest('hex');
  }

  compareTokens(data: string, encrypted: any): boolean {
    return this.hashToken(data) === encrypted;
  }
}
