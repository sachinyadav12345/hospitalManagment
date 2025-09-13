import { clsx } from 'clsx'

const Card = ({ 
  children, 
  className = '', 
  padding = 'default',
  hover = false,
  ...props 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  }
  
  const classes = clsx(
    'card',
    paddingClasses[padding],
    hover && 'hover:shadow-md transition-shadow duration-200',
    className
  )
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card
