import sinon from 'sinon';
import Models from '../server/models';
import Bookmark from '../server/bookmark';

const mockFunction = () {
  return new Promise((resolve) => {
    resolve(true);
  })
}
sinon.stub(Models, "get", mockFunction)
describe('Bookmark api', function(){
  it('Should get all bookmarks', function(){

  })

  it('Should add new bookmarks', function(){

  })

  it('Should update existing bookmarks', function(){

  })

  it('Should delete existing bookmarks', function(){

  })
})
