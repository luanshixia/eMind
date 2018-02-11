export interface CommonProps {
  id?: string;
  cls?: string[];
  style?: { [key: string]: string };
}

type ClassNamesArgument = string | string[] | { [key: string]: boolean } | undefined;

export function classNames(...args: ClassNamesArgument[]) {
  let resultArr: string[] = [];
  args.forEach(arg => {
    if (typeof arg !== 'undefined') {
      if (typeof arg === 'string') {
        resultArr = [...resultArr, arg];
      } else { // typeof arg === 'object'
        if (arg instanceof Array) {
          resultArr = [...resultArr, ...arg];
        } else {
          resultArr = [...resultArr, ...Object.keys(arg).filter(key => arg[key])];
        }
      }
    }
  });
  return resultArr.filter(key => key !== '').join(' ');
}
