
/**
 * e.g. originalData { firstName: 'izzy', email: 'izzy@mail'}
 * newData { firstName: 'izzy', email: 'test@mail'}
 * return { email: 'test@mail' }
 * @param newData object of data
 * @param originalData object of data
 * @returns different object of newData
 */
export const getDifferentObjectOfTwo = (originalData: any, newData: any) => {
  let result = {};
  Object.keys(originalData).forEach((key) => {
    if (
      newData[key as keyof Object] &&
      newData[key as keyof Object] !== originalData[key]
    ) {
      result = Object.assign(result, { [key]: newData[key as keyof Object] });
    }
  });
  return result;
}