'use client'

import { useUser } from '@/hook/useUser'
import { usePost } from '@/hook/usePost'

export function App() {
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
        <h1 className="text-2xl font-bold text-center">Client</h1>
        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => handleFetchUser()}>Fetch User</button>
        <button className="bg-green-500 text-white p-2 rounded-md" onClick={() => handleCreateUser()}>Create User</button>
        <div>
          <p>userData: {JSON.stringify(userData)}</p>
          <p>isMutating: {JSON.stringify(isMutating)}</p>
          <p>error: {JSON.stringify(error)}</p>
        </div>
      </main>
      <footer>
        <div className="bg-red-500 text-white p-2 rounded-md">
          <p>postData: {JSON.stringify(postData)}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
