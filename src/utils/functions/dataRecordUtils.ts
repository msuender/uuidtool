import type {IDataRecord} from '../definitions/type_definitions';

export const findMaxId = (arrayToCheck: IDataRecord[]) => {
  let idsOnly = [];
  arrayToCheck.forEach((element) => idsOnly.push(element.id));
  return Math.max.apply(null, idsOnly);
};

export const checkAllIsJson = (arrayToCheck: IDataRecord[]): boolean => {
  let result: boolean = arrayToCheck.reduce(
    (accumulator: boolean, current: IDataRecord): boolean => {
      !current.inputIsJson && accumulator ? (accumulator = false) : accumulator;
      return accumulator;
    },
    true
  );
  return result;
};