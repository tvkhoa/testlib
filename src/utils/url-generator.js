import { isNil, isEmpty, map, omitBy } from 'lodash';

const esc = encodeURIComponent;

export const generateGetURL = (href, params) => {
  const omitedParams = omitBy(params, isNil);
  const encodedParams = map(omitedParams, (value, key) => `${esc(key)}=${esc(value)}`);
  if (isEmpty(encodedParams)) {
    return href;
  }
  return `${href}?${encodedParams.join('&')}`;
};

export default generateGetURL;
