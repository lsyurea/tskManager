import './Dashboard.css'
import TodoList from '../todo/TodoList'

function Dashboard({token}) {
  return (
    <div className="wrap">
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <TodoList token={token}/>

    </div>
  );
}

export default Dashboard;