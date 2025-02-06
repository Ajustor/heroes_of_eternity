import { Security } from '@/core/base/security'

export class SecurityService extends Security {
  encodePassword(password: string): Promise<string> {
    return Bun.password.hash(password)
  }

  validatePassword(toCheck: string, validPassword: string): Promise<boolean> {
    return Bun.password.verify(toCheck, validPassword)
  }

  generateAuthorisationKey(key: string): string {
    const hasher = new Bun.CryptoHasher('blake2b256')
    const authorizationKey = hasher.update(key, 'hex')
    return authorizationKey.digest('base64')
  }
}