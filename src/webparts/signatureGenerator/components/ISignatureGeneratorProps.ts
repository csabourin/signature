export interface ISignatureInitialData {
  name?: string;
  email?: string;
  roleEn?: string;
  cell?: string;
  ext?: string;
  roleFr?:string;
}

export interface ISignatureGeneratorProps {
  className?: string;
  initialData?: ISignatureInitialData;
}
