import {Routes, Route} from "react-router-dom";
import Signup from "./Components/pages/Signup";
import Signin from "./Components/pages/Signin";
import Avater from "./Components/pages/avater";
import Content from "./Components/content";
import Error from "./Components/Error";
import Choice from "./Components/pages/choicePage";
import Footer from "./Components/header/Footer";
import Verification from "./Components/pages/Verification";
import Header from "./Components/header/Header";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/avater" element={<Avater />} />
        <Route path="/content" element={<Content />} />
        <Route path="/choice" element={<Choice />} />
        <Route path="/header" element={<Header />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
