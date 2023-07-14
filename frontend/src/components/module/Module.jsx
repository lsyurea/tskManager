import './Module.css'
// import { fetchModule, fetchTodo } from '../../services/apiService'
import { useState, useEffect } from 'react'
import SearchDetails from '../searchresultlist/SearchDetails'
import { useLocation } from 'react-router-dom'

function Module() {
    const [modules, setModules] = useState([]);
    const [todos, setTodos] = useState([]);
    const [events, setEvents] = useState([]);
    const [moduleDetails, setModuleDetails] = useState(null);
    const location = useLocation();
    
    useEffect(() => {
        setModules(JSON.parse(sessionStorage.getItem('modules')));
        setTodos(JSON.parse(sessionStorage.getItem('todos')));
        const eventsData = JSON.parse(sessionStorage.getItem('events'));
        if (eventsData) {
          const cur = eventsData.filter(e => new Date(e.start) <= new Date()
          && new Date(e.end) >= new Date()).map(x => x.title);
          setEvents(cur);
        }
    }, [location]);


    const user = () => {
        const token = JSON.parse(sessionStorage.getItem('token'));
        return token ? token.user : token;
    }

    if (user() == null) {
      return (
        <>
          <h1>Please login first</h1>
        </>
      )
    }

    const handleSubmit = (module) => () => {
        setModuleDetails({moduleCode: module.module_name});
    }


    return (
        <div className='profile'>
            <div><h1>Your summary, {user().user_metadata.username}</h1></div>
            <div className="profile-card">
                <div className="profile-card-body">
                    <div className="profile-card-body-item">
                        <h3>Current task</h3>
                    </div>

                    <div className="list">
                      <h3 style={{textAlign: 'left', marginLeft: '20px', textDecoration: 'underline'}}>
                        Miscellaneous task from Todo
                      </h3>
                      {todos && todos.map((todo) => (
                        <label key={todo.id}>
                            <input type="checkbox" name=""></input>
                            <i></i>
                            
                            <span>  
                              {todo.task}
                            </span>
                        </label>
                      ))}
                    </div>


                    <div className="list">
                      <h3 style={{textAlign: 'left', marginLeft: '20px', textDecoration: 'underline'}}>
                        Scheduled task from Calendar
                      </h3>
                      {events && events.map((event) => (
                        <label key={1} className="result">
                          <input type="checkbox" name=""></input>
                          <i></i>
                          <span>
                            {event}
                          </span>
                        </label>
                      ))}

                    </div>
                </div>
                <div className="profile-card-body">
                    <div className="profile-card-body-item">
                        <h3>Modules taking</h3>
                    </div>
                    {!moduleDetails && modules && modules.map((module) => (
                            <div key={module.id} className="result">
                                <div key={module.id} className="result-title" onClick={handleSubmit(module)}>
                                  {module.module_name}
                                </div>
                            </div>
                        ))}
                        {moduleDetails && <SearchDetails result = {moduleDetails} setModuleDetails={setModuleDetails} toAdd={false}/>}
                </div>
                {/* <div className="profile-card-body"></div> */}

            </div>
        </div>
    )
}

export default Module