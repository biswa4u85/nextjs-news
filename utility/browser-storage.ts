export function loadState(KEY: string) {
  try {
    const serializedState = sessionStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function saveState(KEY: string, state: any) {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}