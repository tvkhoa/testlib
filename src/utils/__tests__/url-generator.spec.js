import generateGetURL from '../url-generator';

describe('generateGetURL', () => {
  describe('no params', () => {
    it('should return href', () => {
      const url = generateGetURL('http://google.com');
      expect(url).toBe('http://google.com');
    });
  });

  describe('single params', () => {
    it('should return href and params without &', () => {
      const url = generateGetURL('http://google.com', { query: 'employment hero' });
      expect(url).toBe('http://google.com?query=employment%20hero');
    });
  });

  describe('multiple params', () => {
    it('should return href and concated params with &', () => {
      const url = generateGetURL('http://google.com', {
        query: 'employment hero',
        type: 'news',
      });
      expect(url).toBe('http://google.com?query=employment%20hero&type=news');
    });
  });

  describe('single param which is null', () => {
    it('should returns href', () => {
      const url = generateGetURL('http://google.com', {
        query: null,
      });
      expect(url).toBe('http://google.com');
    });
  });

  describe('single param which is undefined', () => {
    it('should returns href', () => {
      const url = generateGetURL('http://google.com', {
        query: undefined,
      });
      expect(url).toBe('http://google.com');
    });
  });

  describe('multiple params, some of them are null / undefined', () => {
    it('should ignore null/undefined', () => {
      const url = generateGetURL('http://google.com', {
        query: 'employment hero',
        date: null,
        type: 'news',
        createdBy: undefined,
        created: 'one',
      });
      expect(url).toBe('http://google.com?query=employment%20hero&type=news&created=one');
    });
  });
});
