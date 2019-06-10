export default {
  colors: {
    text: '#000',
    background: '#fff',
    primary: 'palevioletred',
    secondary: 'rebeccapurple',
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
  },
  styles: {
    root: {
      fontFamily: 'body',
      color: 'text',
      bg: 'background',
    },
    a: {
      color: 'primary',
      textDecoration: 'none',
      ':hover': {
        color: 'secondary',
        textDecoration: 'underline',
      },
    },
  },
}
