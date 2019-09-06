class FavoritesStore {
  constructor() {
    this._favorites = {};
  }

  get favorites() {
    return Object.values(this._favorites);
  }

  addNewFavorite(item) {
    this._favorites[item.id] = item;
  }
  deleteFavorite(id) {
    delete this._favorites[id];
  }
}

const favoritesStore = new FavoritesStore();

export default favoritesStore;