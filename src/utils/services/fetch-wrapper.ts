// a helper function to wrap fethc requests that also adds a service label for error messages
// by adding the service parameter we can generate more helpful logging.
// we only use a single service for this example app, but the pattern is good to enforce.
export const fetchRequest = async <T>(
  ...args: [...Parameters<typeof fetch>, service?: string]
): Promise<T> => {
  const [input, init, service] = args

  const response = await fetch(input, init)

  if (!response.ok) {
    const label = service ?? 'Request'
    throw new Error(`${label} failed: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}
