import { clsx } from 'clsx'

const Input = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  const inputClasses = clsx(
    'input-field',
    error && 'border-red-300 focus:ring-red-500 focus:border-red-500',
    className
  )
  
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
}

export default Input
