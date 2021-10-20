import { TestBed } from '@angular/core/testing';

import { RegexService } from './regex.service';

describe('RegexService', () => {
  let service: RegexService;
  // OK
  const test1 = 'b[.] iotreiout';
  const test2 = 'e[.]';
  const test3 = '[!] blablabla';
  const test4 = 'c-> iothrouthe';
  const test5 = ':-)';
  const test6 = '-> blablabla';
  const test7 = '() blablabla';
  const test8 = '(.) blablabla';
  const test9 = '(x) blablabla';
  const test10 = '[!] blablabla';
  // KO
  const test11 = 'uhiugioug c[.] blablabla';
  const test12 = 'a iejtroijtr';
  const test13 = '[%]';
  const test14 = '(I) blablabla';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should find "b[.]"', () => {
    const result = service.regMatchTest(test1);
    expect(result![0]).toEqual('b[.]');
    expect(result![1]).toEqual('b[.]');
    expect(result![2]).toEqual('b');
    expect(result![3]).toEqual('[.]');
  });
  it('should find "e[.]"', () => {
    const result = service.regExecTest(test2);
    expect(result![0]).toEqual('e[.]');
    expect(result![1]).toEqual('e[.]');
    expect(result![2]).toEqual('e');
    expect(result![3]).toEqual('[.]');
  });
  it('should find "[!]"', () => {
    const result = service.regMatchTest(test3);
    expect(result![0]).toEqual('[!]');
    expect(result![1]).toEqual('[!]');
    expect(result![2]).toEqual('');
    expect(result![3]).toEqual('[!]');
  });
  it('should find "c->"', () => {
    const result = service.extractMarkUp(test4);
    expect(result.color).toEqual('c');
    expect(result.icon).toEqual('->');
  });
  it('should find ":-)"', () => {
    const result = service.regMatchTest(test5);
    expect(result![0]).toEqual(':-)');
    expect(result![1]).toEqual(':-)');
    expect(result![2]).toEqual('');
    expect(result![3]).toEqual(':-)');
  });
  it('should find "->"', () => {
    const result = service.regExecTest(test6);
    expect(result![0]).toEqual('->');
    expect(result![1]).toEqual('->');
    expect(result![2]).toEqual('');
    expect(result![3]).toEqual('->');
  });
  it('should find "()"', () => {
    const result = service.extractMarkUp(test7);
    expect(result.color).toEqual('');
    expect(result.icon).toEqual('()');
  });
  it('should find "(.)"', () => {
    const result = service.extractMarkUp(test8);
    expect(result.color).toEqual('');
    expect(result.icon).toEqual('(.)');
  });
  it('should find "(x)"', () => {
    const result = service.regMatchTest(test9);
    expect(result![0]).toEqual('(x)');
  });
  it('should find "[!]"', () => {
    const result = service.regExecTest(test10);
    expect(result![0]).toEqual('[!]');
  });
  it('should find nothing 1', () => {
    const result = service.regMatchTest(test11);
    expect(result).toBeNull();
  });
  it('should find nothing 2', () => {
    const result = service.regExecTest(test12);
    expect(result).toBeNull();
  });
  it('should find nothing 3', () => {
    const result = service.regMatchTest(test13);
    expect(result).toBeNull();
  });
  it('should find nothing 4', () => {
    const result = service.extractMarkUp(test14);
    expect(result.color).toEqual('');
    expect(result.icon).toEqual('');
  });
});
