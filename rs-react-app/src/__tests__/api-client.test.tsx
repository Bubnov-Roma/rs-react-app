import { getAllPokemon, getOnePokemon } from '../pages/main/api';

describe('API functions', () => {
  beforeAll(() => {
    if (!global.fetch) {
      global.fetch = jest.fn();
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAllPokemon returns data on successful fetch', async () => {
    const mockData = { results: [{ name: 'bulbasaur' }] };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const data = await getAllPokemon();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    );
    expect(data).toEqual(mockData);
  });

  it('getAllPokemon returns error on failed fetch', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    });

    const data = await getAllPokemon();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    );
    expect(data).toBeInstanceOf(Error);
  });

  it('getOnePokemon returns data on successful fetch', async () => {
    const mockData = { name: 'bulbasaur', id: 1 };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const data = await getOnePokemon('bulbasaur');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/bulbasaur'
    );
    expect(data).toEqual(mockData);
  });

  it('getOnePokemon returns error on failed fetch', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    const data = await getOnePokemon('bulbasaur');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/bulbasaur'
    );
    expect(data).toBeInstanceOf(Error);
  });
});
