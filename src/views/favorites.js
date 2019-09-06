import elements from '../config/ui';

class FavoritesUI {
  constructor(el) {
    this.favoriteList = el.favoriteList;
  }

  renderFavorites(list) {
    this.favoriteList.innerHTML = '';
    let fragment = '';
    list.forEach(item => {
      const template = FavoritesUI.listTemplate(item);
      fragment += template;
    });

    this.favoriteList.insertAdjacentHTML('afterbegin', fragment);
  }
  static listTemplate(item) {
    return `
      <li data-id="${item.id}">${item.departure_at}, ${item.airline}</li>
    `;
  }
}

const favoriteUI = new FavoritesUI(elements);

export default favoriteUI;