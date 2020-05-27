import handlebars from 'handlebars';
import fs from 'fs';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTempleProvider from '../models/IMailTemplateProvider';

class HandleBarsMailTemplateProvider implements IMailTempleProvider {

  public async parse({file,vaiables}:IParseMailTemplateDTO) {

    const templateFileContent = await fs.promises.readFile(file,{
      encoding: 'utf-8',
    })

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(vaiables);
  }
}

export default HandleBarsMailTemplateProvider;
