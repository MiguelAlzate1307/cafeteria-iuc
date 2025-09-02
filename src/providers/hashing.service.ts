import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  abstract hash(data: string | Buffer): Promise<string>;
  abstract compare(data: string | Buffer, encrypted: string): Promise<boolean>;
  abstract hashToken(data: string): string;
  abstract compareTokens(data: string, encrypted): boolean;
}
