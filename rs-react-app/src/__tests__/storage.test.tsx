import { setStorage } from '../shared';

describe('localStorage tests', () => {
  let mockLocalStorage;
  const KEY = 'storageValue';

  beforeEach(() => {
    mockLocalStorage = (function () {
      let store = {};
      return {
        setItem: (key, value) => {
          store[key] = value;
        },
        getItem: (key) => store[key] || null,
        clear: () => {
          store = {};
        },
      };
    })();
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save the value to localStorage with key "storageValue"', () => {
    const testValue = 'testValue';
    setStorage(testValue);
    expect(localStorage.getItem(KEY)).toBe(testValue);
  });

  it('should overwrite existing value with same key', () => {
    const initialValue = 'initialValue';
    const newValue = 'newValue';
    localStorage.setItem(KEY, initialValue);
    setStorage(newValue);
    expect(localStorage.getItem(KEY)).toBe(newValue);
  });

  it('should return existing value with same key', () => {
    const initialValue = 'initialValue';
    const newValue = 'newValue';
    localStorage.setItem(KEY, initialValue);
    setStorage(newValue);
    expect(localStorage.getItem(KEY)).toBe(newValue);
  });
});
