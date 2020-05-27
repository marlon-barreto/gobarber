
// varibles: {name:'Diego',Link:'http://'}
interface ITemplateVariables {
  [key:string]: string | number;
}

export default interface IParseMailTemplateDTO {
  file:string;
  vaiables:ITemplateVariables;
}

