/* eslint-disable @typescript-eslint/lines-between-class-members */
import invert from 'lodash/invert';

type Hashable = string | number | symbol;
type HashableRecord = Record<Hashable, Hashable>;
type ReverseKeysAndValues<T extends HashableRecord> = { [K in keyof T as T[K]]: K };

export class ImmutableTwoWayMap<T extends HashableRecord> {
  public readonly map: T;
  public readonly reverseMap: ReverseKeysAndValues<T>;

  constructor(obj: T) {
    this.map = obj;
    this.reverseMap = invert(obj) as ReverseKeysAndValues<T>;
    this.checkMapEquivalency();
  }

  protected checkMapEquivalency() {
    const mapKeys = Object.keys(this.map) as (keyof T)[];

    const unequivalentKeys = mapKeys.filter((key) => {
      const reverseKey = this.map[key];
      const originalKey = this.reverseMap[reverseKey];
      return originalKey !== key;
    });

    if (unequivalentKeys.length > 0) {
      const errorKeyStrings = unequivalentKeys.reduce((acc, key) => {
        const key1 = String(key);
        const key2 = String(this.reverseMap[this.map[key]]);
        const value = String(this.map[key]);
        return `${String(acc)}- { ${key1}: ${value}, ${key2}: ${value} }\n`;
      }, '') as string;

      // eslint-disable-next-line max-len
      throw new Error(`All keys must be unique AND all values must be unique.\n\nThe following keys do not have unique values:\n${errorKeyStrings}`);
    }
  }

  public get(key: keyof T | null | undefined) {
    if (!key) return null;
    return this.map[key];
  }

  public getReverse(key: keyof ReverseKeysAndValues<T> | null | undefined) {
    if (!key) return null;
    return this.reverseMap[key];
  }
}
