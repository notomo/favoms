import { expect, it, describe } from "vitest";
import { PageRange } from "./pageRange";

describe("load", () => {
  it("extends max if page is upper", () => {
    const pageRange = {
      min: 1,
      max: 1,
    };
    expect(PageRange.load(pageRange, 2)).toStrictEqual({
      min: 1,
      max: 2,
    });
  });

  it("extends min if page is lower", () => {
    const pageRange = {
      min: 2,
      max: 2,
    };
    expect(PageRange.load(pageRange, 1)).toStrictEqual({
      min: 1,
      max: 2,
    });
  });
});

describe("contains", () => {
  it("returns true if page is contained in range", () => {
    const pageRange = {
      min: 1,
      max: 2,
    };
    expect(PageRange.contains(pageRange, 1)).toBe(true);
  });

  it("returns false if page is not contained in range", () => {
    const pageRange = {
      min: 1,
      max: 2,
    };
    expect(PageRange.contains(pageRange, 3)).toBe(false);
  });
});
