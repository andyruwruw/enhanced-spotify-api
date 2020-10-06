/* eslint-disable no-undef */
const nock = require('nock');

const EnhancedSpotifyAPI = require('../src/index');
const {
  item_simple,
  items_repeats,
  items_ten,
  items_ten_unsorted,
  items_three,
  items_three_extended,
} = require('./fixtures');

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

/**
 * Converts ID to URI
 * 
 * @param {string} id 
 */
const convertToURI = (id) => {
  return `spotify:item:${id}`;
}

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

  /**
   * Verifies that push throws correct error with incorect
   * parameter type.
   */
  it('Container: Push with Invalid Parameter', () => {
    expect(() => {
      const items = new Items(items_three);
      items.push({});
    }).toThrow('Items.push: Invalid Parameter \"item\"');

    expect(() => {
      const items = new Items(items_three);
      items.push([]);
    }).toThrow('Items.push: Invalid Parameter \"item\"');
  });

  /**
   * Verifies that concat adds items from an array, creating
   * a new item for each.
   */
  it('Container: Concat Array', () => {
    const items = new Items(items_three);
    expect(items.order).toStrictEqual(items_three);

    items.concat(items_three_extended);
    expect(items.order).toStrictEqual(items_three.concat(items_three_extended));

    for (let id of items_three.concat(items_three_extended)) {
      expect(items.items).toHaveProperty(id);
    }
  });

  /**
   * Verifies that concat adds items from another container,
   * creating a new item for each.
   */
  it('Container: Concat Container', () => {
    const items = new Items(items_three);
    expect(items.order).toStrictEqual(items_three);

    const items_extended = new Items(items_three_extended);
    items.concat(items_extended);
    expect(items.order).toStrictEqual(items_three.concat(items_three_extended));

    for (let id of items_three.concat(items_three_extended)) {
      expect(items.items).toHaveProperty(id);
    }
  });

  /**
   * Verifies that concat throws correct error with incorect
   * parameter type.
   */
  it('Container: Concat with Incorrect Parameter', () => {
    expect(() => {
      const items = new Items(items_three);
      items.concat({});
    }).toThrow('Items.concat: Invalid Parameter "items"');
  });

  /**
   * Verifies that get IDs returns expected array of IDs.
   */
  it('Container: Get IDs', () => {
    const items = new Items(items_three);
    const ids = items.getIDs();
    
    expect(ids).toStrictEqual(items_three);
  });

  /**
   * Verifies that get IDs with no repeats returns
   * expected array of IDs with no repeats.
   */
  it('Container: Get IDs No Repeats', () => {
    const items = new Items(items_repeats);
    const ids = items.getIDs();
    const idsNoRepeats = items.getIDsNoRepeats();
    
    expect(ids).toStrictEqual(items_repeats);
    expect(idsNoRepeats).toStrictEqual(['1', '2', '3', '4']);
  });

  /**
   * Verifies that get URIs returns expected array
   * of URIs.
   */
  it('Container: Get URIs', () => {
    const items = new Items(items_three);

    const uris = items.getURIs();
    const actualURIs = items_three.map(convertToURI);

    expect(uris).toStrictEqual(actualURIs);
  });

  /**
   * Verifies that get URIs with no repeats returns
   * expected array of URIs with no repeats.
   */
  it('Container: Get URIs No Repeats', () => {
    const items = new Items(items_repeats);
    const uris = items.getURIs();
    const urisNoRepeats = items.getURIsNoRepeats();
    
    expect(uris).toStrictEqual(items_repeats.map(convertToURI));
    expect(urisNoRepeats).toStrictEqual(['1', '2', '3', '4'].map(convertToURI));
  });

  /**
   * Verifies that pop removes the last element of
   * the container and returns it.
   */
  it('Container: Pop', () => {
    const items = new Items(items_three);
    const item = items.pop();

    expect(items.size()).toBe(2);
    expect(items.order).toStrictEqual(['1', '2'])

    expect(item).toBeInstanceOf(Item);
    expect(item.id).toBe('3');
  });

  /**
   * Verifies that shift removes the first element of
   * the container and returns it.
   */
  it('Container: Shift', () => {
    const items = new Items(items_three);
    const item = items.shift();

    expect(items.size()).toBe(2);
    expect(items.order).toStrictEqual(['2', '3'])

    expect(item).toBeInstanceOf(Item);
    expect(item.id).toBe('1');
  });

  /**
   * Verifies that slice removes a given range of
   * items.
   */
  it('Container: Slice', () => {
    const items = new Items(items_ten);
    expect(items.size()).toBe(10);
    expect(items.order).toStrictEqual(items_ten);

    const slicedItems = items.slice(2, 4);

    expect(slicedItems).toBeInstanceOf(Items);
    expect(slicedItems.size()).toBe(2);
    expect(slicedItems.order).toStrictEqual(['3', '4'])

    expect(items.order).toStrictEqual(['1', '2', '5', '6', '7', '8', '9', '10']);
  });

  /**
   * Verifies that remove finds and removes item by
   * ID and returns its object.
   */
  it('Container: Remove by String', () => {
    const items = new Items(items_three);
    const item = items.remove('1');

    expect(items.size()).toBe(2);
    expect(items.order).not.toContain('1');
    expect(items.items['1']).not.toBeDefined();

    expect(item).toBeInstanceOf(Item);
    expect(item.id).toBe('1');
  });

  /**
   * Verifies that remove finds and removes item by
   * an object with ID and returns its object.
   */
  it('Container: Remove by Object', () => {
    const items = new Items(items_three);
    const item = items.remove({ id: '1' });

    expect(items.size()).toBe(2);
    expect(items.order).not.toContain('1');
    expect(items.items['1']).not.toBeDefined();

    expect(item).toBeInstanceOf(Item);
    expect(item.id).toBe('1');
  });

  /**
   * Verifies that remove finds and removes item by
   * an Item instance and returns its object.
   */ 
  it('Container: Remove by Item', () => {
    const items = new Items(items_three);
    const item = items.remove(new Item('1'));

    expect(items.size()).toBe(2);
    expect(items.order).not.toContain('1');
    expect(items.items['1']).not.toBeDefined();

    expect(item).toBeInstanceOf(Item);
    expect(item.id).toBe('1');
  });

  /**
   * Verifies that remove indexes method removes
   * and returns Items container of items at given
   * positions.
   */
  it('Container: Remove Indexes', () => {
    const items = new Items(items_ten);
    expect(items.size()).toBe(10);

    const removed = items.removeIndexes([0, 2, 4]);

    expect(items.size()).toBe(7);
    expect(items.order).toStrictEqual(['2', '4', '6', '7', '8', '9', '10'])

    expect(removed).toBeInstanceOf(Items);
    expect(removed.size()).toBe(3);
    expect(removed.order).toStrictEqual(['1', '3', '5']);
  });

  /**
   * Verifies that remove indexes throws the correct
   * error when an invalid property is given.
   */
  it('Container: Remove Indexes with Invalid Parameter', () => {
    const items = new Items(items_ten);
    expect(items.size()).toBe(10);

    expect(() => {
      items.removeIndexes([11]);
    }).toThrow('Items.removeIndexes: Invalid Parameter "indexes", out of range.');

    expect(() => {
      items.removeIndexes([-1]);
    }).toThrow('Items.removeIndexes: Invalid Parameter "indexes", out of range.');
  });

  /**
   * Verifies that for each runs the provided method
   * on each item.
   */
  it('Container: For Each', () => {
    const items = new Items(items_three);
    items.forEach(function (item) {
      expect(items_three).toContain(item.id);
    });
  });

  /**
   * Verifies that filter runs a filter on all items
   * in the container, returning removed items in a
   * Container instance.
   */
  it('Container: Filter', () => {
    const items = new Items(items_ten);
    expect(items.size()).toBe(10);

    const filteredItems = items.filter(function (item) {
      return item.id !== '4';
    });

    expect(filteredItems.size()).toBe(9);
    expect(filteredItems.order).not.toContain('4');
  });

  /**
   * Verifies that sort runs a sorting method on
   * the container.
   */
  it('Container: Sort', () => {
    const items = new Items(items_ten_unsorted);
    expect(items.size()).toBe(10);

    items.sort(function (a, b) {
      return parseInt(a.id, 10) - parseInt(b.id, 10);
    });

    expect(items.order).toStrictEqual(items_ten);
  });

  /**
   * Verifies that reverse, reverses the order of
   * items in the Container.
   */
  it('Container: Reverse', () => {
    const items = new Items(items_ten);

    items.reverse();

    expect(items.order).toStrictEqual(['10', '9', '8', '7', '6', '5', '4', '3', '2', '1']);
  });

  /**
   * Verifies that set property adds a new property
   * to the correct item.
   */
  it('Container: Set Property', () => {
    const items = new Items(items_three);
    items.setProperty('1', 'test', 'correct');

    expect(items.items['1'].test).toBeDefined();
    expect(items.items['1'].test).toBe('correct');
  });
});
