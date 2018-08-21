export interface CommonProps {
  id?: string;
  cls?: string[];
  style?: { [key: string]: string };
  children?: any;
  onClick?: React.MouseEventHandler<any>;
  onDoubleClick?: React.MouseEventHandler<any>;
  onMouseMove?: React.MouseEventHandler<any>;
  onMouseDown?: React.MouseEventHandler<any>;
  onMouseUp?: React.MouseEventHandler<any>;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  onMouseOver?: React.MouseEventHandler<any>;
  onMouseOut?: React.MouseEventHandler<any>;
  onWheel?: React.WheelEventHandler<any>;
  onKeyDown?: React.KeyboardEventHandler<any>;
  onKeyUp?: React.KeyboardEventHandler<any>;
  onKeyPress?: React.KeyboardEventHandler<any>;
  onFocus?: React.FocusEventHandler<any>;
  onBlur?: React.FocusEventHandler<any>;
}

type ClassNamesArgument = string | string[] | { [key: string]: boolean } | undefined;
type ToggleArrayElementResult = [any[], boolean];

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

export function toggleArrayElement<T>(array: T[], element: T): ToggleArrayElementResult {
  return array.includes(element)
    ? [array.filter(ele => ele !== element), false]
    : [[...array, element], true];
}

export function walkTree<T>(
  root: T,
  rootPosision: number[],
  children: (node: T, position: number[]) => T[],
  action: (node: T, position: number[]) => void,
  proceed?: (node: T, position: number[]) => boolean) {
  action(root, rootPosision);
  if (proceed && proceed(root, rootPosision)) {
    (children(root, rootPosision) || []).forEach((node, i) => walkTree(node, [...rootPosision, i], children, action, proceed));
  }
}

const ENV_DICT_KEY = '__react_data_controls_env_dict__';

export function getEnvDict(): { [id: string]: any } {
  if (!window.hasOwnProperty(ENV_DICT_KEY)) {
    (window as any)[ENV_DICT_KEY] = {};
  }
  return (window as any)[ENV_DICT_KEY];
}
