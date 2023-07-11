import './Module.css'
import { fetchModule, fetchTodo } from '../../services/apiService'
import { useState, useEffect } from 'react'
import SearchDetails from '../searchresultlist/SearchDetails'
import { useLocation } from 'react-router-dom'

function Module() {
    const [modules, setModules] = useState([]);
    const [todos, setTodos] = useState([]);
    const [moduleDetails, setModuleDetails] = useState(null);
    const location = useLocation();
    
    useEffect(() => {
        setModules(JSON.parse(sessionStorage.getItem('modules')));
        setTodos(JSON.parse(sessionStorage.getItem('todos')));
    }, [location]);


    const user = () => {
        const token = JSON.parse(sessionStorage.getItem('token'));
        return token ? token.user : token;
    }
    if (!user()) return (
    <>
    <div>
        <h1>Please login first</h1>
    </div>
    </>);

    const handleSubmit = (module) => () => {
        setModuleDetails({moduleCode: module.module_name});
    }


    return (
        <div className='profile'>
            <h1>Your summary, {user().user_metadata.username}</h1>
            <div className="profile-card">
                <div className="profile-card-body">
                    <div className="profile-card-body-item">
                        <h3>Current task</h3>
                    </div>

                    <div>
                      <h3>Miscellaneous task from Todo</h3>
                      {todos && todos.map((todo) => (
                        <div key={todo.id} className="result">

                            <div className="result-title">  
                              {todo.task}
                            </div>
                        </div>
                      ))}
                    </div>


                    <div>
                      <h3>Scheduled task from Calendar</h3>
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