import { mount } from 'vue-test-utils'
import SvgCanvas from '../src/components/Page/SvgCanvas'
import ItemCircle from '../src/models/item-circle'

import Point from '../src/models/point'

describe('SvgCanvas', () => {
  let cmp

  beforeEach(() => {
    cmp = mount(SvgCanvas)
  })

  it('renders empty svgu', () => {
    expect(cmp.html()).toMatchSnapshot()
  })

  it('renders svg with allItems = circle', () => {
    const allItems = [];
    allItems.push(new ItemCircle(new Point(50, 20), 40));
    cmp.setProps({ allItems: allItems })
    expect(cmp.html()).toMatchSnapshot()
  })

  it('renders svg with allItems = selected circle', () => {
    const allItems = [];
    const item = new ItemCircle(new Point(50, 20), 40);
    item.selected = true;
    allItems.push(item);
    cmp.setProps({ allItems: allItems })
    expect(cmp.html()).toMatchSnapshot()
  })
})
