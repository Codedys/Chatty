import "./addUser.css"

const AddUser = () => {
  return (
    <div className='addUser'>
        <form >
            <input type="text" name="username" placeholder="Username" />
            <button>Search</button>

        </form>
        <div className="user">
            <div className="detail">
                <img src="./avatar.png" alt="" />
                <span>Jane Doe</span>

            </div>
            <button>Add user</button>
        </div>
    </div>
  )
}

export default AddUser