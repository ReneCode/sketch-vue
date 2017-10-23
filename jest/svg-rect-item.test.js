import { mount } from 'vue-test-utils'
import SvgRectItem from '../src/components/Page/SvgRectItem'
import ItemRectangle from '../src/models/item-rectangle'
import Point from '../src/models/point'

describe('SvgRectItem', () => {

  const p1 = new Point(33, 44);
  const p2 = new Point(55, 77);
  const itemRect = new ItemRectangle(p1, p2);
  itemRect.svg.stroke = "red";
  itemRect.svg.strokeWidth = "3px";
  itemRect.svg.fill = "blue";

  const wrapper = mount(SvgRectItem, {
    propsData: {
      item: itemRect
    }
  })

  it('renders the markup', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
