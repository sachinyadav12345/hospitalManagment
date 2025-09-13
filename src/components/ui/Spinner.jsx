import { clsx } from 'clsx'

const Spinner = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }
  
  const classes = clsx(
    'animate-spin rounded-full border-b-2 border-teal-600',
    sizes[size],
    className
  )
  
  return <div className={classes} />
}

export default Spinner
