import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../../src/actions/schedulingMeetingActions';
import * as types from '../../src/actions/types';
import { POSTS_LINK_NUVEM_CIVICA } from '../../src/constants/linkConstants';
import { MEETING_POSTING_TYPE_CODE } from '../../src/constants/codeNumbers';


const LATITUDE = 0.9;
const LONGITUDE = 0.8;

describe('Testing scheduleMeetingActions', () => {
  it('Test if we can set Meeting Latitude', () => {
    let actionReturn = actions.setMeetingLocationLatitude(LATITUDE);

    expect(actionReturn.payload).not.toBe(0.50);
    expect(actionReturn.type).toBe(types.SET_MEETING_LOCATION_LATITUDE);

    actionReturn = actions.setMeetingLocationLatitude(0.50);

    expect(actionReturn.payload).toEqual({ latitude: 0.50 });
    expect(actionReturn.type).toBe(types.SET_MEETING_LOCATION_LATITUDE);
  });

  it('Test if we can set meeting Longitude', () => {
    let actionReturn = actions.setMeetingLocationLongitude(LONGITUDE);

    expect(actionReturn.payload).not.toBe(0.50);
    expect(actionReturn.type).toBe(types.SET_MEETING_LOCATION_LONGITUDE);

    actionReturn = actions.setMeetingLocationLongitude(0.50);

    expect(actionReturn.payload).toEqual({ longitude: 0.50 });
    expect(actionReturn.type).toBe(types.SET_MEETING_LOCATION_LONGITUDE);
  });

  it('Test getMeetingPostList', async () => {
    const mock = new MockAdapter(axios);

    const getScheduleMeetingParamsAndHeader = {
      params: {
        codGrupoDestino: 1,
        codTiposPostagem: MEETING_POSTING_TYPE_CODE,
      },
      headers: {
        appToken: 4,
      },
    };
    mock.onGet(POSTS_LINK_NUVEM_CIVICA, getScheduleMeetingParamsAndHeader)
      .reply(200);
    const actionReturn = await actions.getMeetingPostList(getScheduleMeetingParamsAndHeader);

    expect(actionReturn.status).toBe(200);
  });

  it('Test getMeetingContent', async () => {
    const mock = new MockAdapter(axios);

    const getContentHeader = {
      headers: {
        appToken: 2,
      },
    };
    const contentLink = 'http://nuvemcivica.com/';

    mock.onGet(contentLink, getContentHeader)
      .reply(200, {
        postagem: {
          codPostagem: 1,
        },
        codConteudoPost: 2,
        JSON: "{'lat':-15.87238105340287,'long':-47.869909234769715,'date':'12-12-9999','time':'17:29','meetingListOfInvitees':{'5888':{'nuvemCode':5888,'confirmed':true},'6121':{'nuvemCode':6121,'confirmed':false}},'meetingDescription':''}",
      });

    const counselor = {
      name: 'testCounselor',
      email: 'test@test.com',
      token: 'abc',
      nuvemCode: 5888,
    };

    const dispatch = jest.fn();
    await actions.getMeetingContent(contentLink, counselor, dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
  });

  // Need promise to work
  /* it('Test SchedulingMeeting', () => {
    const parameter = {
      appToken: 1,
      nuvemCode: 2,
      meeting: {
        lat: 0.9,
        long: 0.5,
        date: '31-12-12',
        time: '20:20',
        meetingListOfInvitees: {
          6122: {
            nuvemCode: 6122,
            confirmed: false,
          },
        },
        meetingDescription: 'descricao',
      },
    };
    const mock = new MockAdapter(axios);
    mock.onPost(POSTS_LINK_NUVEM_CIVICA).reply(200);

    const dispatchMock = jest.fn();
    const functionReturn = actions.schedulingMeeting(parameter, dispatchMock);
    console.log(dispatchMock.mock.calls.length);
    expect(dispatchMock.mock.calls.length).toBe(1);
  }); */
});
