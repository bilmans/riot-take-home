import { canonicalize } from './canonicalize';

describe('canonicalize', () => {
  it('is independent of top-level property order', () => {
    expect(canonicalize({ a: 1, b: 2 })).toBe(canonicalize({ b: 2, a: 1 }));
  });

  it('is independent of nested property order', () => {
    const x = { outer: { a: 1, b: 2 }, z: 3 };
    const y = { z: 3, outer: { b: 2, a: 1 } };
    expect(canonicalize(x)).toBe(canonicalize(y));
  });

  it('preserves array order (order is semantic in arrays)', () => {
    expect(canonicalize([1, 2])).not.toBe(canonicalize([2, 1]));
  });

  it('sorts keys of objects nested inside arrays', () => {
    expect(canonicalize([{ a: 1, b: 2 }])).toBe(canonicalize([{ b: 2, a: 1 }]));
  });
});
