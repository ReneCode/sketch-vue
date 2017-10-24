import { mount } from 'vue-test-utils'
import SvgRectItem from '../src/components/Page/SvgRectItem'
import SvgCircleItem from '../src/components/Page/SvgCircleItem'
import SvgPolygonItem from '../src/components/Page/SvgPolygonItem'
import SvgPolylineItem from '../src/components/Page/SvgPolylineItem'

import ItemRectangle from '../src/models/item-rectangle'
import ItemCircle from '../src/models/item-circle'
import ItemPolygon from '../src/models/item-polygon'
import ItemPolyline from '../src/models/item-polyline'

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

describe('SvgCircleItem', () => {
  const pt = new Point(50, 70);
  const item = new ItemCircle(pt, 40);
  item.svg.stroke = "red";
  item.svg.strokeWidth = "3px";
  item.svg.fill = "blue";

  const wrapper = mount(SvgCircleItem, {
    propsData: {
      item: item
    }
  })

  it('renders the markup', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('SvgPolygonItem', () => {
  const item = new ItemPolygon();
  item.addPoint(new Point(10, 20));
  item.addPoint(new Point(30, 5));
  item.addPoint(new Point(60, 50));
  item.svg.stroke = "red";
  item.svg.strokeWidth = "3px";
  item.svg.fill = "blue";

  const wrapper = mount(SvgPolygonItem, {
    propsData: {
      item: item
    }
  })

  it('renders the markup', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('SvgPolylineItem', () => {
  const item = new ItemPolyline();
  item.addPoint(new Point(10, 20));
  item.addPoint(new Point(30, 5));
  item.addPoint(new Point(60, 50));
  item.svg.stroke = "red";
  item.svg.strokeWidth = "3px";
  item.svg.fill = "blue";

  const wrapper = mount(SvgPolylineItem, {
    propsData: {
      item: item
    }
  })

  it('renders the markup', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
