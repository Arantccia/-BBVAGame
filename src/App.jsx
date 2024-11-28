import { Suspense } from "react";
import './App.css'
import {AppRouter} from "./AppRouter";


function App() {

  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <AppRouter />
    </Suspense>
     
    </>
  )
}

export default App
