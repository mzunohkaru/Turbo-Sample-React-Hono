'use client'

import { useUser } from '@/hook/useUser'
import { usePost } from '@/hook/usePost'

function App() {
  const { userData, fetchUser, isMutating, error, createUserData, createUser } =
    useUser()
  const handleFetchUser = () => {
    fetchUser()
    console.log('userData', userData)
  }

  const handleCreateUser = () => {
    createUser()
    console.log('createUserData', createUserData)
  }

  const { postData } = usePost()
  console.log('postData', postData)

  return (
    <div>
      <main>
        <button onClick={() => handleFetchUser()}>Fetch User</button>
        <button onClick={() => handleCreateUser()}>Create User</button>
        <div>
          <p>userData: {JSON.stringify(userData)}</p>
          <p>isMutating: {JSON.stringify(isMutating)}</p>
          <p>error: {JSON.stringify(error)}</p>
        </div>
      </main>
      <footer>
        <div>
          <p>postData: {JSON.stringify(postData)}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
