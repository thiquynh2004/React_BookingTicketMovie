import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Films from "./page/Films/Films";
import Login from "./page/Login/Login";
import ShowTime from "./page/ShowTime/ShowTime";
import Users from "./page/Users/Users";

import Header from "./component/Header/Header";
import PageNotFound from "./page/PageNotFound/PageNotFound";
import AddFilm from "./page/Films/AddFilm/AddFilm";
import {createBrowserHistory} from 'history'
import EditFilm from "./page/Films/EditFilm/EditFilm";
import Profile from "./page/Profile/Profile";
import 'antd/dist/antd.min.css'

export const history = createBrowserHistory();

function App() {
  // const history = useNavigate();


  return (
    
    // <BrowserRouter>
    <>
      <Header />
      <Routes history={history}>
      <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Films />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/films" element={<Films />} />
        {/* <Route path="/admin/show_time" element={<ShowTime />} /> */}
        <Route path="/admin/films/add-film" element={<AddFilm />} />
        <Route path="/admin/films/edit/:id" element={<EditFilm />} />
        <Route path="/admin/films/show-time/:id/:tenPhim" element={<ShowTime />} />
        <Route path="/admin/films/show-time" element={<ShowTime />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
     
    </>

    // </BrowserRouter>
  );
}

export default App;
