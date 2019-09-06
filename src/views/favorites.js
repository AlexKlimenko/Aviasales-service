import elements from '../config/ui';


class FavoritesUI {
  constructor(el) {
    this.favoriteList = el.favoriteList;
    this.btnFavorite = el.btnFavorite
  }

  renderFavorites(list) {
    this.favoriteList.innerHTML = '';
    let fragment = '';
    list.forEach(item => {
      const template = FavoritesUI.listTemplate(item);
      fragment += template;
    });

    this.favoriteList.insertAdjacentHTML('afterbegin', fragment);

    this.btnFavorite.innerHTML = `FAVORITES <mark>${list.length}</mark>`;
  }
  static listTemplate(item) {
    return `
      <li data-id="${item.id}">
        <img src="http://pics.avs.io/200/200/${item.airline}.png" width="40" height="40" alt="logo">
        ${item.depart_date}, 
        from <b>${item.cityOrigin}</b> to <b>${item.cityDestination}</b>
        <button class="uk-button uk-button-danger uk-button-small delete-favorites-btn" type="button">Delete</button>
      </li>
    `;
  }
}

const favoriteUI = new FavoritesUI(elements);

export default favoriteUI;