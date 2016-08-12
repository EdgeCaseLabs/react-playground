import React from 'react';
import { shallow, mount, render } from 'enzyme';

jest.unmock('../AltDataDemo');
//jest.unmock('../../stores/AltDataDemoStore');
//jest.unmock('../../actions/AltDataDemoActions');

import AltDataDemo from '../AltDataDemo';


describe("Alt Data Demo tests", () => {

    it("renders without blowing up", () => {
        const wrapper = shallow(<AltDataDemo />);

        expect(wrapper.contains(<h1>Abandoned Carts</h1>)).toBe(true);

    })

    it("fills with data")

    it("handles errors")

})
