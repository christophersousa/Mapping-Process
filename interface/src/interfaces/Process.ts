export interface PropsProcess{
  id: string;
  name: string;
  documentation: string;
  diff_days: number;
}

export interface PropsDataProcess{
  id: string;
  name: string;
  documentation: string;
  description: string;
  create_at: Date;
  system_used: string;
  Responsable: PropsResponsable[];
  Subprocess: PropsProcess[]
}

export interface PropsResponsable{
  id: string;
  name: string;
}

export interface PropsPaginated{
  itemsPerPage: number;
  cardsProcessed: PropsProcess[];
}