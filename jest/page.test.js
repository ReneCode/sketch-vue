import Vue from 'vue';
import Vuex from 'vuex';
import { mount } from 'vue-test-utils'
import Page from '../src/components/Page/Page'
import ItemCircle from '../src/models/item-circle'
import Point from '../src/models/point'

Vue.use(Vuex);

const createStore = (loadedGraphics = []) => {
  return new Vuex.Store({
    state: {},
    getters: {
      loadedGraphics: () => {
        return loadedGraphics;
      }
    },
    mutations: {
      setInteractionMode: () => { }
    },
    actions: {
      loadGraphics: () => { },
      setCurrentPageId: () => { },
      setCurrentProjectId: () => { }
    }
  })
}

describe('Page', () => {
  let cmp
  let store

  it('renders empty page', () => {
    store = createStore();
    cmp = mount(Page, { store })
    expect(cmp.html()).toMatchSnapshot()
  })

  it('renders svg with allItems = circle', () => {
    const item = new ItemCircle(new Point(50, 20), 40);
    store = createStore([item]);
    cmp = mount(Page, { store })
    expect(cmp.html()).toMatchSnapshot()
  })
})
