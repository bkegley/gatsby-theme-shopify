import {base} from '@theme-ui/presets'

const buttonStyles = {
  p: 3,
  textTransform: 'uppercase',
  cursor: 'pointer',
}
export default {
  ...base,
  buttons: {
    primary: {
      ...buttonStyles,
      border: 'none',
      bg: 'primary',
      color: 'white',
    },
    secondary: {
      ...buttonStyles,
      border: '1px',
      borderColor: 'primary',
      borderStyle: 'solid',
      color: 'primary',
      bg: 'white',
    },
  },
}
