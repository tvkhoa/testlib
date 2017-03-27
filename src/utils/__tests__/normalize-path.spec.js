import {
  get,
  set,
} from 'lodash';
import {
  detectArrayOfObject,
  parsePathElement,
  normalizePath,
} from '../normalize-path';

describe('path handling', () => {
  describe('detectArrayOfObject', () => {
    it('should return true when path describes array of object a[{key:value}]', () => {
      const path = 'a[{key:value}]';
      const actual = detectArrayOfObject(path);
      expect(actual).toBe(true);
    });

    it('should return true when path describes array of object [{key:value}]', () => {
      const path = '[{key:value}]';
      const actual = detectArrayOfObject(path);
      expect(actual).toBe(true);
    });

    it('should return false when path doesnt describes array of object a[0]', () => {
      const path = 'a[0]';
      const actual = detectArrayOfObject(path);
      expect(actual).toBe(false);
    });

    it('should return false when path doesnt describes array of object (string)', () => {
      const path = 'a';
      const actual = detectArrayOfObject(path);
      expect(actual).toBe(false);
    });
  });

  describe('parsePathElement', () => {
    it('should parse path to object', () => {
      const path = 'a[{key:value}]';
      const actual = parsePathElement(path);
      const expected = {
        key: 'a',
        id: 'key',
        value: 'value',
      };
      expect(actual).toEqual(expected);
    });

    it('should parse path to object', () => {
      const path = '[{key:value}]';
      const actual = parsePathElement(path);
      const expected = {
        key: '',
        id: 'key',
        value: 'value',
      };
      expect(actual).toEqual(expected);
    });

    it('should return undefine if wrong shape', () => {
      const path = 'a[0]';
      const actual = parsePathElement(path);
      const expected = undefined;
      expect(actual).toEqual(expected);
    });
  });

  describe('normalizePath', () => {
    const object = {
      a: 1,
      b: {
        bkey: 'bvalue',
      },
      c: [
        {
          id: 1,
          cvalue: 'cvalue1',
        },
        {
          id: 2,
          cvalue: 'cvalue2',
        },
      ],
    };

    it('should normalizePath from string path of nested object', () => {
      const path = 'a';
      const actual = normalizePath(object, path);
      const expected = 'a';
      expect(actual).toEqual(expected);
    });

    it('should normalizePath from path of nested object', () => {
      const path = 'b.bkey';
      const actual = normalizePath(object, path);
      const expected = 'b.bkey';
      expect(actual).toEqual(expected);
    });

    it('should get value from path of nested object', () => {
      const path = 'c[1]';
      const actual = normalizePath(object, path);
      const expected = 'c[1]';
      expect(actual).toEqual(expected);
    });

    it('should get value from path of nested object', () => {
      const path = 'c[{id:1}]';
      const actual = normalizePath(object, path);
      const expected = 'c[0]';
      expect(actual).toEqual(expected);
    });

    it('should get value from path of array', () => {
      const path = '[{id:1}]';
      const actual = normalizePath(object.c, path);
      const expected = '[0]';
      expect(actual).toEqual(expected);
    });

    it('should return undefined from invalid path', () => {
      const actual1 = normalizePath(object, 'd[{id:1}]');
      const actual2 = normalizePath(object, 'b[1]');
      const actual3 = normalizePath(object, 'e');
      expect(actual1).toEqual('d[-1]');
      expect(actual2).toEqual('b[1]');
      expect(actual3).toEqual('e');
    });
  });

  describe('Integrate with lodash', () => {
    const object = {
      a: 1,
      b: {
        bkey: 'bvalue',
      },
      c: [
        {
          id: 1,
          cvalue: 'cvalue1',
        },
        {
          id: 2,
          cvalue: 'cvalue2',
        },
      ],
    };

    it('should use with get of lodash', () => {
      const path = 'c[{id:1}]';
      const actual = get(object, normalizePath(object, path));
      const expected = {
        id: 1,
        cvalue: 'cvalue1',
      };
      expect(actual).toEqual(expected);
    });

    it('should use with set of lodash', () => {
      const path = 'c[{id:1}]';
      const normalizedPath = normalizePath(object, path);
      set(object, normalizedPath, 'newValue');
      const actualGet = get(object, normalizedPath);
      expect(actualGet).toEqual('newValue');
    });
  });
});
