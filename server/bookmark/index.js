import Model from '../model';

class Bookmark extends Model {

  constructor() {
    super('bookmark');
    this.get = this.get.bind(this);
  }

  get(req, res) {

  }

  create() {

  }

  update() {

  }

  del() {

  }

}

export default new Bookmark()
