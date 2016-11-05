import FolderService from './folder';

class Service extends FolderService {
  getItems() {
    return new Promise((resolve, reject) => {
      fetch('/api/bookmark')
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
    })
  }

  add(bookmark) {
    return new Promise((resolve, reject) => {
      fetch(`/api/bookmark`, {
        method: 'POST',
        body: JSON.stringify(bookmark),
        headers: new Headers({
          'Content-Type': 'application/json',
        })
      })
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
    })
  }


  deleteItem(id) {
    return new Promise((resolve, reject) => {
      fetch(`/api/bookmark/${id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
    })
  }

  update(id, update) {
    console.log(update);
    return new Promise((resolve, reject) => {
      fetch(`/api/bookmark/${id}`, {
        method: 'PUT',
        body: JSON.stringify(update),
        headers: new Headers({
          'Content-Type': 'application/json',
        })
      })
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
    })
  }
}
export default new Service();
