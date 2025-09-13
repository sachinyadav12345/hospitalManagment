import { clsx } from 'clsx'

const Select = ({ 
  label, 
  error, 
  options = [], 
  placeholder = 'Select an option',
  className = '', 
  ...props 
}) => {
  const selectClasses = clsx(
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
      <select
        className={selectClasses}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
}

export default Select
