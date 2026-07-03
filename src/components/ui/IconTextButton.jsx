import { Button } from './Button.jsx'

export function IconTextButton({ children, icon = 'calendar', variant = 'glass', ...props }) {
  return (
    <Button icon={icon} variant={variant} {...props}>
      {children}
    </Button>
  )
}
