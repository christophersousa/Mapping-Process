export interface PropsProcess{
  id: string;
  name: string;
  documentation: string;
  diffd_ays: number;
  handleClick: (id: string) => Promise<void>
}

export interface PropsDataProcess{
  id: string;
  id_process: string;
  name: string;
  documentation: string;
  description: string;
  created_at: string;
  system_used: string;
  Responsible: PropsResponsible[];
  Subprocess: PropsProcess[];
  Area: PropsArea;
}

export interface PropsResponsible{
  name: string;
}

export interface PropsArea{
  name: string;
}

export interface PropsPaginated{
  itemsPerPage: number;
  cardsProcessed: PropsProcess[];
  handleClick: (id: string) => Promise<void>;
}

export interface PropsSendDataProcess{
  id: string;
  name: string;
  documentation: string;
  description: string;
  created_at: string;
  system_used: string;
  responsibles: string[];
  name_area: string;
}

export interface PropsSendDataSubprocess{
  id: string;
  id_process: string;
  name: string;
  documentation: string;
  description: string;
  created_at: string;
  system_used: string;
  responsibles: string[];
  name_area: string;
}