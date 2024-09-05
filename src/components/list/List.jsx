import ChatList from "./chatList/ChatList"
import "./list.css"
import UserInfo from "./userInfo/UserInfo"

const List = ({change}) => {
  return (
    <div className='list'>
      <UserInfo/>
      <ChatList change={change} />
    </div>
  )
}

export default List