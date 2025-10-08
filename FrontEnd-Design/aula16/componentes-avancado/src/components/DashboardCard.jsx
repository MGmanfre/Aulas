import Card from './Card'
import Avatar from './Avatar'
import Badge from './Badge'
import Button from './Button'

const DashboardCard = ({ user, stats, actions }) => {
  return (
    <Card 
      variant="elevated" 
      hover
      header={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar 
              src={user.avatar} 
              initials={user.initials}
              status={user.status}
              size="lg"
            />
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
          </div>
          <Badge variant={user.active ? 'success' : 'danger'}>
            {user.active ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>
      }
      footer={
        <div className="flex gap-2">
          {actions.map((action, index) => (
            <Button 
              key={index}
              variant={action.variant}
              size="sm"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-4 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default DashboardCard