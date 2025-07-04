import Icons from './Icons';

export default function Icon({ name, ...restProps }) {
  return Icons[name](restProps);
}
