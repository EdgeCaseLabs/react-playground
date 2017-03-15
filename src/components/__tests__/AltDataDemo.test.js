import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { test } from 'ava'
import { spy } from 'sinon'
var fetchMock = require('fetch-mock')

//jest.unmock('../AltDataDemo');
//jest.unmock('../../stores/AltDataDemoStore');
//jest.unmock('../../actions/AltDataDemoActions');

import AltDataDemo from '../AltDataDemo'

import '../../__tests__/_base'


// describe("Alt Data Demo tests", () => {
//
//     it("renders without blowing up", () => {
//         const wrapper = shallow(<AltDataDemo />);
//
//         expect(wrapper.contains(<h1>Abandoned Carts</h1>)).toBe(true);
//
//     })
//
//     it("fills with data")
//
//     it("handles errors")
//
// })


const wrap = () => {
  return shallow(<AltDataDemo />)
}
const real = () => {
  return mount(<AltDataDemo />)
}


test("renders without blowing up", t => {
  const wrapper = wrap()
  t.truthy(wrapper.length)
});

test("fills with data", t => {

  fetchMock
      .mock('/api/altdatademo/', {"carts": [
                    {
                        "ageDays": 2,
                        "ageHours": 41,
                        "createdDate": "2016-08-10T17:00:55.16",
                        "email": "bob@boberson.com",
                        "emailUses": 2,
                        "firstName": "Bob",
                        "lastName": "Boberson",
                        "orderCount": 0,
                        "userID": 1234
                    }
                ],
                "ok": true
            })

  const onButtonClick = spy()
  const wrapper = real()
  log(wrapper)
  //debugger;
  console.log("find")
  console.log(wrapper.find('button.dismiss'))
  wrapper.find('button.dismiss').simulate('click')
  t.true(onButtonClick.calledOnce)


});



test.only("handles errors", t => {
  const onButtonClick = spy()
  const wrapper = mount(
    <div>
      <span foo={3} bar={false} title="baz" />
      <table><tbody><tr><td>
      <button className="dismiss" onClick={onButtonClick}>CLICK ME</button>
      </td></tr></tbody></table>
    </div>
  )

  wrapper.find('[foo=3]')
  wrapper.find('[bar=false]')
  wrapper.find('[title="baz"]')

  wrapper.find('button.dismiss').simulate('click')
  t.true(onButtonClick.calledOnce)

});
