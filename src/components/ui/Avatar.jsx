import { clsx } from 'clsx'
import { User } from 'lucide-react'

const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  className = '',
  fallback = null 
}) => {
  const sizes = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
    '2xl': 'h-20 w-20'
  }
  
  const classes = clsx(
    'rounded-full bg-gray-200 flex items-center justify-center overflow-hidden',
    sizes[size],
    className
  )
  
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={clsx(classes, 'object-cover')}
        onError={(e) => {
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'flex'
        }}
      />
    )
  }
  
  return (
    <div className={classes}>
      {fallback || <User className="h-1/2 w-1/2 text-gray-400" />}
    </div>
  )
}

export default Avatar
