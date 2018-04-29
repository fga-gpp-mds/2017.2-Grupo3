import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProfileInfoScreen from '../../src/screens/ProfileInfoScreen';

Enzyme.configure({ adapter: new Adapter() });
// imported as a connected component!

const props = {
  counselor: {
    nuvemCode: 1,
    email: 'rodolfo@gmail.com',
    name: 'Rodolfo',
    userName: 'rodolfo@gmail.com',
    password: 'senha',
    token: 'tokenGenerico',
    profile: {
      cpf: '12312312312',
      phone: '96661234',
      isPresident: false,
      segment: 'Titular',
      CAE_Type: 'Estadual',
      CAE: 'Distrito Federal',
    },
  },
};

describe('Testing ProfileInfoScreen', () => {
  it('Displays charge president if user is president', () => {
    const myProps = {
      counselor: {
        ...props.counselor,
        profile: {
          ...props.counselor.profile,
          isPresident: true,
        },
      },
    };
    const wrapper = shallow(<ProfileInfoScreen {...myProps} />);

    const foundPresident = wrapper.findWhere(c => c.text() === 'Presidente');
    const foundConselour = wrapper.findWhere(c => c.text() === 'Conselheiro');

    expect(foundPresident.length).toBe(1);
    expect(foundConselour.length).toBe(0);
  });

  it('Displays charge counselor if the user is counselor', () => {
    const myProps = {
      counselor: {
        ...props.counselor,
        profile: {
          ...props.counselor.profile,
          isPresident: false,
        },
      },
    };
    const wrapper = shallow(<ProfileInfoScreen {...myProps} />);

    const foundPresident = wrapper.findWhere(c => c.text() === 'Presidente');
    const foundConselour = wrapper.findWhere(c => c.text() === 'Conselheiro');

    expect(foundPresident.length).toBe(0);
    expect(foundConselour.length).toBe(1);
  });
});
