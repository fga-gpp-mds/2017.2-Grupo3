export const verifyAgentInvited = (visitSchedule) => {
  if (visitSchedule.content.invitedAgent) {
    return 'Um agente foi convidado';
  }
  return 'Agente não convidado';
};

export const verifyStatus = (isConfirmed, text) => {
  if (isConfirmed === true) {
    return text;
  }
  return `Não , ${text}!`;
};

export const getVisitData = (visitSchedule) => {
  const data = [
    {
      label: 'Escola:',
      value: visitSchedule.content.schoolName,
    },
    {
      label: 'Data:',
      value: visitSchedule.content.date,
    },
    {
      label: 'Horário:',
      value: visitSchedule.content.time,
    },
    {
      label: verifyAgentInvited(visitSchedule),
      value: '',
    },
    {
      label: 'Número de participantes:',
      value: Object.keys(visitSchedule.content.visitListOfInvitees).length,
    },
  ];
  return data;
};

export const getCounselorData = (counselor) => {
  const data = [
    {
      label: 'Nome:',
      value: counselor.name,
    },
    {
      label: 'Email:',
      value: counselor.email,
    },
    {
      label: 'Telefone:',
      value: counselor.profile.phone,
    },
    {
      label: 'Status da Visita:',
      value: verifyStatus(counselor.confirmed, 'Confirmado'),
    },
    {
      label: 'Status da Fiscalização:',
      value: verifyStatus(counselor.realizedVisit, 'Realizada'),
    },
  ];

  return data;
};
