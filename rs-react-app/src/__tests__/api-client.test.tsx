import { getListOfPokemon, getOnePokemon } from '../pages/main/api';

describe('API functions', () => {
  beforeAll(() => {
    if (!global.fetch) {
      global.fetch = jest.fn();
    }
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('getListOfPokemon returns data on successful fetch', async () => {
    const mockData = { results: [{ name: 'bulbasaur' }] };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const data = await getListOfPokemon();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/'
    );
    expect(data).toEqual(mockData);
  });

  test('getListOfPokemon returns error on unsuccessful response', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);

    const data = await getListOfPokemon();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/'
    );
    expect(data).toBeInstanceOf(Error);
  });

  test('getOnePokemon returns data on successful fetch', async () => {
    const mockData = { name: 'bulbasaur', id: 1 };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const data = await getOnePokemon('bulbasaur');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/bulbasaur'
    );
    expect(data).toEqual(mockData);
  });

  test('getOnePokemon returns an error if response fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);

    const data = await getOnePokemon('bulbasaur');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/bulbasaur'
    );
    expect(data).toBeInstanceOf(Error);
  });
});
