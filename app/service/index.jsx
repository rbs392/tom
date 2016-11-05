class Service {
  get() {
    return new Promise((resolve, reject) => {
      resolve({
        items: new Array(20).fill({title: 'hello', url: 'http://www.google.com', folder: 'public'}),
        folders: ['private', 'lectures'],
      })
    })
  }
}
export default new Service();
