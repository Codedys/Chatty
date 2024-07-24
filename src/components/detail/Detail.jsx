import { auth } from "../../lib/firebase"
import "./detail.css"

const Detail = () => {
  return (
    <div className='detail'>

      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Jane Doe</h2>
        <p>Lorem ipsum dolor sit amet  .</p>
      </div>

      <div className="info">

        <div className="options">
          <div className="title">
            <span>Chat settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="options">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="options">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>

        <div className="photo">
          <div className="photoitem">
            <div className="photodetail">
            <img src="./avatar.png" alt="" />
            <span>Photo_2024_.png</span>
            </div>
            <img src="./download.png" alt="" className="icon"/>
          </div>
          <div className="photoitem">
            <div className="photodetail">
            <img src="./avatar.png" alt="" />
            <span>Photo_2024_.png</span>
            </div>
            <img src="./download.png" alt="" className="icon" />
          </div>
          <div className="photoitem">
            <div className="photodetail">
            <img src="./avatar.png" alt="" />
            <span>Photo_2024_.png</span>
            </div>
            <img src="./download.png" alt="" className="icon" />
          </div>
          <div className="photoitem">
            <div className="photodetail">
            <img src="./avatar.png" alt="" />
            <span>Photo_2024_.png</span>
            </div>
            <img src="./download.png" alt="" className="icon"/>
          </div>
        </div>
        </div>


        <div className="options">
          <div className="title">
            <span>shared files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <button>Block user</button>
        <button  onClick={()=>auth.signOut()} className="logout">logout</button>

      </div>


    </div>
  )
}

export default Detail