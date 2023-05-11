import { SHA256 } from 'crypto-js';
import dayjs from 'dayjs';

interface AuthInfo {
  allowed: boolean;
  expires: number;
}

export class AuthCache {
  private TTL = 60; // 60 minutes
  private store: Map<string, AuthInfo> = new Map();

  private authKeyFrom(token: string) {
    return SHA256(token).toString();
  }

  checkIfAllowed(token: string): boolean {
    const key = this.authKeyFrom(token);
    const authInfo = this.store[key];
    const allowed = !!authInfo?.allowed;
    if (!allowed) return false;
    const isExpired = authInfo.expires < Date.now();
    if (isExpired) return false;
    return true;
  }

  markAsAllowed(token: string) {
    const key = this.authKeyFrom(token);
    this.store[key] = {
      allowed: true,
      expires: dayjs().add(this.TTL, 'minutes').unix() * 1000,
    };
  }
}
