import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { Home } from "./routes/home"
import { About } from "./routes/about"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Book } from "./routes/book"
import { Singlebook } from "./routes/singlebook"
import CreateBook from "./routes/createBook";
import EditBook from "./routes/editBook"

function App() {
  return (
    <>
     <Router>
      <Header/>
      <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/books" element={<Book/>}/>
            <Route path="/books/:slug" element={<Singlebook/>}/>
            <Route path="/createbook" element={<CreateBook/>}/>
            <Route path="/editbook/:slug" element={<EditBook/>}/>
      </Routes>
      <Footer/>
     </Router>  
    </>
  )
}

export default App