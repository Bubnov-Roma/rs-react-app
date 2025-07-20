const KEY = 'storageValue';

export function setStorage(value?: string) {
  localStorage.setItem(KEY, value ?? '');
}

export function getStorage() {
  return localStorage.getItem(KEY);
}
