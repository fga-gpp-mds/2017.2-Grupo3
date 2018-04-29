// Constants used on the complaintScreen.

export const COMPLAINT_TITLE = 'Quer fazer uma denúncia? Entre em contato com os órgãos competentes:';

export const ADDRESS = 'Endereço: ';
export const WEB_SITE = 'Endereço na internet: ';
export const EMAIL = 'E-mail: ';
export const PHONE = 'Telefone: ';

export const FNDE = 'Fundo Nacional de Desenvolvimento da Educação (FNDE)';
export const FNDE_ADDRESS = 'SBS - Quadra 2, Bloco F, Edifício FNDE Brasília-DF CEP: 70070.929';
export const FNDE_PHONE = '0800-616161';
export const FNDE_WEB_SITE = 'www.fnde.gov.br';
export const FNDE_EMAIL = 'ouvidoria@fnde.gov.br | audit@fnde.gov.br';

export const FNDE_DATA = [
  {
    label: ADDRESS,
    value: FNDE_ADDRESS,
  },
  {
    label: PHONE,
    value: FNDE_PHONE,
  },
  {
    label: EMAIL,
    value: FNDE_EMAIL,
  },
  {
    label: WEB_SITE,
    value: FNDE_WEB_SITE,
  },
];

export const CGU = 'Ministério da Transparência, Fiscalização e Controladoria-Geral da União (CGU)';
export const CGU_ADDRESS = 'SAS - Quadra 1, Bloco A, 8º andar Edifício Darcy Ribeiro Brasília-DF CEP: 70.070-905';
export const CGU_WEB_SITE = 'http://www.cgu.gov.br/assuntos/ouvidoria/denuncias-e-manifestacoes';

export const CGU_DATA = [
  {
    label: ADDRESS,
    value: CGU_ADDRESS,
  },
  {
    label: WEB_SITE,
    value: CGU_WEB_SITE,
  },
];

export const MPF = 'Ministério Público Federal';
export const MPF_ADDRESS = 'SAFS, Quadra 04, conjunto “C” Brasília-DF CEP: 70050-900';
export const MPF_PHONE = '(61) 3031-5100';
export const MPF_WEB_SITE = 'http://www.mpf.mp.br/para-o-cidadao/sac';

export const MPF_DATA = [
  {
    label: ADDRESS,
    value: MPF_ADDRESS,
  },
  {
    label: PHONE,
    value: MPF_PHONE,
  },
  {
    label: WEB_SITE,
    value: MPF_WEB_SITE,
  },
];

export const TCU = 'Tribunal de Contas da União';
export const TCU_ADDRESS = 'SAFS - Quadra 04, Lote 01 Brasília-DF CEP: 70042-900';
export const TCU_PHONE = '0800-6441500';
export const TCU_WEB_SITE = 'www.tcu.gov.br/ouvidoria';

export const TCU_DATA = [
  {
    label: ADDRESS,
    value: TCU_ADDRESS,
  },
  {
    label: PHONE,
    value: TCU_PHONE,
  },
  {
    label: WEB_SITE,
    value: TCU_WEB_SITE,
  },
];

export const ALL_PUBLIC_DATA = [
  {
    title: FNDE,
    payload: FNDE_DATA,
  },
  {
    title: CGU,
    payload: CGU_DATA,
  },
  {
    title: MPF,
    payload: MPF_DATA,
  },
  {
    title: TCU,
    payload: TCU_DATA,
  },
];
