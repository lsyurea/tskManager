import './Module.css'

const apiUrl = 'https://api.nusmods.com/v2/modules.json';

// Function to fetch all modules
async function fetchAllModules() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const modules = await response.json();
    return modules;
  } catch (error) {
    console.error('Error fetching modules:', error);
    return null;
  }
}

function Module() {
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

    console.log(fetchAllModules())

    return (
        <div className='module'>
            <h1>Modules</h1>
        </div>
    )
}

export default Module