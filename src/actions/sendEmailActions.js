import Communications from 'react-native-communications';
import * as constant from '../constants/sendAgentEmail';

const sendEmailAlert = (visitData, counselor) => {
  const agentEmail = (visitData.visit.agentEmail);
  const CAEUf = counselor.profile.CAE_UF.substr(0, 2);
  const emailBody = `Prezado (a) Senhor(a),\n
  Trata-se da solicitação de um Auditor da Vigilância Sanitária, a fim de acompanhar os Conselheiros do Conselho de Alimentação Escolar pertencente ao(à) ${counselor.profile.CAE}, em visita técnica a realizar-se em ${visitData.visit.date}, na instituição escolar ${visitData.visit.schoolName}, em cumprimento à Lei nº 11.947, de 16 de junho de 2009 - que dispõe sobre o atendimento da alimentação escolar.\n
  Atenciosamente,
  ${counselor.name}
  Representando ${counselor.profile.segment} do CAE – ${counselor.profile.CAE}\n
  Conselho de Alimentação Escolar do Estado – CAE/${CAEUf}`;

  Communications.email(
    // To, cc, bcc, subject, email text
    [agentEmail],
    null,
    null,
    constant.EMAIL_SUBJECT,
    emailBody,
  );
};

export default sendEmailAlert;
