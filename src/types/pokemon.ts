export interface PokemonSummary {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonSummary[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  weight: number;
  height: number;
  types: PokemonType[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
  };
}

// flattened shape used to feed BaseModal once a pokemon is selected
export interface SelectedPokemon {
  id: number;
  image: string;
  name: string;
  weight: number;
  height: number;
  types: string;
}
