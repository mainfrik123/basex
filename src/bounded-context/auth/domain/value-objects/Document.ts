export type DocType = 'CPF' | 'IDENTIDADE' | 'PASSAPORTE';

export interface DocumentId {
  type: DocType;
  number: string;
}
