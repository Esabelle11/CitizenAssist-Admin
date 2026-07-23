
export async function retry<T>(
    fn: () => Promise<T>,
    retries = 5,
    delay = 300
  ): Promise<T> {
    let lastError: unknown;
  
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err;
        console.log(`Attempt ${i + 1} failed`, err);
  
        if (i < retries - 1) {
          await new Promise((r) =>
            setTimeout(r, delay * Math.pow(2, i))
          );
        }
      }
    }
  
    throw lastError;
  }