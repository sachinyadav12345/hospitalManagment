import { clsx } from 'clsx'

const KPICard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  className = '' 
}) => {
  const changeColors = {
    positive: 'text-green-600 bg-green-100',
    negative: 'text-red-600 bg-red-100',
    neutral: 'text-gray-600 bg-gray-100'
  }

  const changeIcons = {
    positive: '↗',
    negative: '↘',
    neutral: '→'
  }

  return (
    <div className={clsx('card hover', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span className={clsx(
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                changeColors[changeType]
              )}>
                <span className="mr-1">{changeIcons[changeType]}</span>
                {change}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="flex-shrink-0">
            <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Icon className="h-6 w-6 text-teal-600" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default KPICard
