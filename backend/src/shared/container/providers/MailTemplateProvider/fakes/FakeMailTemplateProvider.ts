import IMailTempleProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTempleProvider {

  public async parse() {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;
