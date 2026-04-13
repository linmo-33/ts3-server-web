export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') {
    return;
  }

  const { ensureTS3SamplerStarted } = await import('@/lib/ts3-data');
  ensureTS3SamplerStarted();
}
