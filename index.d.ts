export type SafePromiseAllResult<R,E> = {
  result: R | null,
  error: E | null
}
declare function safePromiseAll<R = any, E = any>(
  promises: Promise<R>[],
  unsafePromiseAll?: (promises: Promise<R>[]) => Promise<R[]>
): Promise<SafePromiseAllResult<R,E>>

export default safePromiseAll