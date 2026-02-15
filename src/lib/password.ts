import bcrypt from 'bcrypt';

const salt_rounds = 12;

export async function hash_password(password: string): Promise<string> {
  return bcrypt.hash(password, salt_rounds);
}

export async function verify_password(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
