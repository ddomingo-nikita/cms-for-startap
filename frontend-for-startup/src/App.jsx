import './App.css'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import {Home} from "./Home.jsx";
import {SignUp} from "./SignUp.jsx";
import {SignIn} from "./SignIn.jsx";
import Header from "./Header.jsx";
import '../i18n';
import { Events } from './Events';

function App() {
    return (
        <>
            <Header/>
            <main style={{marginTop: "2em"}}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/events" element={<Events />} />
                </Routes>
            </main>
        </>
    )
}

export default App
