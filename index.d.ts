export function safePromiseAll<R = any, E = any>(
  promises: Promise[],
  unsafePromiseAll?: (promises: Promise[]) => Promise
): Promise<SafePromiseAllResult<R,E>>
