const SALT = 'admin_salt_v1'

export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password + SALT)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}


function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false

  let diff = 0
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return diff === 0
}

export async function verifyPassword(password: string, expectedPassword: string): Promise<boolean> {
  const [inputHash, expectedHash] = await Promise.all([
    hashPassword(password),
    hashPassword(expectedPassword),
  ])

  return safeCompare(inputHash, expectedHash)
}

export async function verifyToken(token: string, adminPassword: string): Promise<boolean> {
  const expected = await hashPassword(adminPassword)
  return safeCompare(token, expected)
}
