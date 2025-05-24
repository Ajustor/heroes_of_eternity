export abstract class Security {
  abstract validatePassword(toCheck: string, validPassword: string): Promise<boolean>
  abstract encodePassword(newPassword: string): Promise<string>
  abstract generateAuthorisationKey(key: string): string
}