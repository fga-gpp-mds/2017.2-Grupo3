const getMeetingData = (meeting) => {
  const data = [
    {
      label: 'Data:',
      value: meeting.date,
    },
    {
      label: 'Horário:',
      value: meeting.time,
    },
  ];
  return data;
};

export default getMeetingData;
