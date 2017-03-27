import {
  get,
  reduce,
  split,
  includes,
  endsWith,
  isEqual,
  toString,
  trim,
  findIndex,
  concat,
  join,
  curry,
  cloneDeep,
  set,
} from 'lodash';

export const detectArrayOfObject = pathElement => (
  includes(pathElement, '[{') && endsWith(pathElement, '}]')
);

export const parsePathElement = (pathElement) => {
  if (detectArrayOfObject(pathElement)) {
    const elements = split(pathElement, '[{');
    const objectString = trim(elements[1], '[{}]');
    const key = elements[0];
    const id = split(objectString, ':')[0];
    const value = split(objectString, ':')[1];
    return {
      key,
      id,
      value,
    };
  }
  return undefined;
};

const getFromPath = (origin, path) => {
  if (!path) {
    return origin;
  }
  return get(origin, path);
};

// Path shapes:
// a.b
// a[0].b
// a[{id:1}].b
// [0].b
export const normalizePath = (origin, path = '') => {
  const pathElements = split(path, '.');
  const newValue = reduce(pathElements, (result, pathElement) => {
    if (detectArrayOfObject(pathElement)) {
      const { key, id, value } = parsePathElement(pathElement);

      const newPathArray = key ? concat(result, key) : result;
      const newPath = join(newPathArray, '.');
      const valueFromKey = getFromPath(origin, newPath);
      const newIndex = findIndex(valueFromKey, objectInArray => (
        isEqual(toString(objectInArray[id]), value)
      ));

      return concat(result, `${key}[${newIndex}]`);
    }
    return concat(result, pathElement);
  }, []);
  return join(newValue, '.');
};

// NormalizeGet
export const normalizedGetFunction = (path, origin) => {
  const normalizedPath = normalizePath(origin, path);
  return get(origin, normalizedPath);
};
export const normalizedGet = curry(normalizedGetFunction);

// NormalizeSet
export const normalizedSetFunction = (path, data, origin) => {
  const normalizedPath = normalizePath(origin, path);
  const newOrigin = cloneDeep(origin);
  set(newOrigin, normalizedPath, data);
  return newOrigin;
};
export const normalizedSet = curry(normalizedSetFunction);


// NormalizeUpdate
export const normalizedUpdateFunction = (path, updateFunction, origin) => {
  const normalizedPath = normalizePath(origin, path);
  const newOrigin = cloneDeep(origin);
  const oldData = get(origin, normalizedPath);
  const newData = updateFunction(oldData);
  set(newOrigin, normalizedPath, newData);
  return newOrigin;
};
export const normalizedUpdate = curry(normalizedUpdateFunction);


export default normalizePath;
