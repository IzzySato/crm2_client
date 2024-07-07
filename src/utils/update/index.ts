/**
 * @param keys e.g. ['line1', 'line2', 'city']
 * @param originalData Object
 * @param newData Object
 * @returns newData value if different value from originalData
 */
export const getUpdatedObject = (keys: string[], originalData: any, newData: any) => {
  const result: any = {};
  keys.forEach((key) => {
    if (originalData[key as keyof Object] !== newData[key as keyof Object]) {
      result[key] = newData[key as keyof Object];
    }
  });
  return result;
}