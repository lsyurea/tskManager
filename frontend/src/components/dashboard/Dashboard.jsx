import './Dashboard.css'
import TodoList from '../todo/TodoList'

function Dashboard() {
  if (!sessionStorage.getItem('token')) {
    return (
      <div className="wrap">
        <h1>Please login first</h1>
      </div>
    )
  }
  return (
    <div className="wrap">
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <TodoList/>

    </div>
  );
}

export default Dashboard;