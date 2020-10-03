/* eslint-disable no-undef */
const nock = require('nock');

const EnhancedSpotifyAPI = require('../src/index');
const {
  item_simple,
  items_repeats,
  items_three,
} = require('./fixtures');

console.log(items_three);

const {
  Container,
} = EnhancedSpotifyAPI;

// Test Class
function Item(value) {
  if (typeof (value) === 'string') {
    this.id = value;
    this.value = value;
  } else if (typeof (value) === 'object' && 'id' in value) {
    this.id = value.id;
    this.value = value.id;
  }
  this.type = 'item';
}

Item.prototype = {};

// Testing Container
function Items(items) {
  this.name = 'Items';
  this.type = 'Item';
  this.uri_type = 'item';
  Container.call(this, items);
}

Items.prototype = {
  ...Container.prototype,
};

EnhancedSpotifyAPI.Item = Item;
EnhancedSpotifyAPI.Items = Items;

describe('Container Static Methods', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /**
   * Verfies the ability to add methods to the Container prototype.
   */
  it('Container: Add Methods', () => {
    const method = jest.fn();

    Container.addMethods({
      test: method,
    });

    const container = new Container();
    container.test();

    expect(method).toHaveBeenCalled();
  });

  /**
   * Verfies the ability to override methods to the Container prototype.
   */
  it('Container: Override', () => {
    const method = jest.fn();
    const { push } = Container.prototype;
    Container.override('push', method);

    const container = new Container();
    container.push();

    expect(method).toHaveBeenCalled();

    Container.override('push', push);
  });
});

describe('Container Instantiation', () => {
  /**
   * Verifies that using Container constructor can be
   * instantiated empty.
   */
  it('Container: Instantiating Empty', () => {
    const items = new Items();

    expect(items.order.length).toBe(0);
    expect(Object.keys(items.items).length).toBe(0);
  });

  /**
   * Verifies that using Container constructor with a string
   * creates one item with that id.
   */
  it('Container: Instantiating with String', () => {
    const items = new Items(item_simple.id);

    expect(items.order.length).toBe(1);
    expect(Object.keys(items.items).length).toBe(1);

    expect(items.items[item_simple.id]).toBeDefined();
    expect(items.order[0]).toBe(item_simple.id);

    expect(items.items[item_simple.id].id).toBe(item_simple.id);
  });

  /**
   * Verifies that using Container constructor with an object
   * creates one item with that id.
   */
  it('Container: Instantiating with Object', () => {
    const items = new Items(item_simple);

    expect(items.order.length).toBe(1);
    expect(Object.keys(items.items).length).toBe(1);

    expect(items.items[item_simple.id]).toBeDefined();
    expect(items.order[0]).toBe(item_simple.id);

    expect(items.items[item_simple.id].id).toBe(item_simple.id);
  });

  /**
   * Verifies that using Container constructor with an Instance
   * of its contents creates one item with that id.
   */
  it('Container: Instantiating with Instance', () => {
    const item = new Item(item_simple.id);
    const items = new Items(item);

    expect(items.order.length).toBe(1);
    expect(Object.keys(items.items).length).toBe(1);

    expect(items.items[item_simple.id]).toBeDefined();
    expect(items.order[0]).toBe(item_simple.id);

    expect(items.items[item_simple.id].id).toBe(item_simple.id);
  });

  /**
   * Verifies that using Container constructor with an array
   * creates items instantiated with data..
   */
  it('Container: Instantiating with an Array', () => {
    const items = new Items(items_three);

    expect(items.order.length).toBe(items_three.length);
    expect(Object.keys(items.items).length).toBe(items_three.length);

    expect(items.items[items_three[0]]).toBeDefined();
    expect(items.order).toContain(items_three[0]);
    expect(items.items[items_three[0]].id).toBe(items_three[0]);

    expect(items.items[items_three[1]]).toBeDefined();
    expect(items.order).toContain(items_three[1]);
    expect(items.items[items_three[1]].id).toBe(items_three[1]);

    expect(items.items[items_three[2]]).toBeDefined();
    expect(items.order).toContain(items_three[2]);
    expect(items.items[items_three[2]].id).toBe(items_three[2]);
  });
});

describe('Container Instance Methods ', () => {
  /**
   * Verifies that size returns size of items inserted.
   */
  it('Container: Size', () => {
    const items = new Items(items_three);

    expect(items.size()).toBe(items_three.length);
    expect(Object.keys(items.items).length).toBe(items_three.length);

    const repeatingItems = new Items(items_repeats);

    expect(repeatingItems.size()).toBe(5);
    expect(Object.keys(repeatingItems.items).length).toBe(items_repeats.length - 1);
  });

  /**
   * Verifies that size returns size of items inserted.
   */
  it('Container: Includes', () => {
    const items = new Items(items_three);
    const item = new Item('3');

    expect(items.includes('1')).toBeTruthy();
    expect(items.includes({ id: '2' })).toBeTruthy();
    expect(items.includes(item)).toBeTruthy();
    expect(items.includes('4')).not.toBeTruthy();
  });

  /**
   * Verifies that indexOf returns index of desired item.
   */
  it('Container: Index Of', () => {
    const items = new Items(items_three);
    const item = new Item('3');

    expect(items.indexOf('1')).toBe(items.order.indexOf('1'));
    expect(items.indexOf({ id: '2' })).toBe(items.order.indexOf('2'));
    expect(items.indexOf(item)).toBe(items.order.indexOf('3'));
  });

  /**
   * Verifies that get returns item at index.
   */
  it('Container: Get', () => {
    const items = new Items(items_three);

    const item = items.get(0);
    expect(item).toBeDefined();
    expect(item).toBeInstanceOf(Item);
    expect(item.id).toBe(items.items[items.order[0]].id);
  });

  /**
   * Verifies that push adds an item to the end of the
   * container.
   */
  it('Container: Push with String', () => {
    const items = new Items(items_three);
    items.push('4');

    expect(items.order.length).toBe(items_three.length + 1);
    expect(Object.keys(items.items).length).toBe(items_three.length + 1);

    expect(items.items['4']).toBeDefined();
    expect(items.order).toContain('4');
    expect(items.items['4'].id).toBe('4');
    expect(items.order[items.order.length - 1]).toBe('4');
  });

  /**
   * Verifies that push adds an item to the end of the
   * container.
   */
  it('Container: Push with Object', () => {
    const items = new Items(items_three);
    items.push({
      id: '4',
    });

    expect(items.order.length).toBe(items_three.length + 1);
    expect(Object.keys(items.items).length).toBe(items_three.length + 1);

    expect(items.items['4']).toBeDefined();
    expect(items.order).toContain('4');
    expect(items.items['4'].id).toBe('4');
    expect(items.order[items.order.length - 1]).toBe('4');
  });

  /**
   * Verifies that push adds an item to the end of the
   * container.
   */
  it('Container: Push with Instance', () => {
    const items = new Items(items_three);
    const item = new Item('4');
    items.push(item);

    expect(items.order.length).toBe(items_three.length + 1);
    expect(Object.keys(items.items).length).toBe(items_three.length + 1);

    expect(items.items['4']).toBeDefined();
    expect(items.order).toContain('4');
    expect(items.items['4'].id).toBe('4');
    expect(items.order[items.order.length - 1]).toBe('4');
  });
});
