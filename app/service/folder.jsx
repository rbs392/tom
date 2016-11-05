class FolderService {
  getFolders() {
    return new Promise((resolve, reject) => {
      fetch('/api/folder')
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
    })
  }

  addFolder(folder) {
    return new Promise((resolve, reject) => {
      fetch(`/api/folder`, {
        method: 'POST',
        body: JSON.stringify(folder),
        headers: new Headers({
          'Content-Type': 'application/json',
        })
      })
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
    })
  }

  deleteFolder(id) {
    return new Promise((resolve, reject) => {
      fetch(`/api/folder/${id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
    })
  }
}

export default FolderService;
