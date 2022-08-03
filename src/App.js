import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Films from "./page/Films/Films";
import Login from "./page/Login/Login";
import ShowTime from "./page/ShowTime/ShowTime";
import Header from "./component/Header/Header";
import PageNotFound from "./page/PageNotFound/PageNotFound";
import AddFilm from "./page/Films/AddFilm/AddFilm";
import {createBrowserHistory} from 'history'
import EditFilm from "./page/Films/EditFilm/EditFilm";
import Profile from "./page/Profile/Profile";
import 'antd/dist/antd.min.css'
import ListUsers from "./page/Users/ListUsers";
import AddUsers from "./page/Users/AddUsers/AddUsers";
import EditUser from "./page/Users/EditUser/EditUser";
import CinemaManagement from "./page/ShowTime/CinemaManagement/CinemaManagement";

export const history = createBrowserHistory();

function App() {

  return (
    
    <>
      <Header />
      <Routes history={history}>
      <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Films />} />
        <Route path="/admin/films" element={<Films />} />
        <Route path="/admin/films/add-film" element={<AddFilm />} />
        <Route path="/admin/films/cinema-management" element={<CinemaManagement />} />
        <Route path="/admin/films/edit/:id" element={<EditFilm />} />
        <Route path="/admin/films/show-time/:id/:tenPhim" element={<ShowTime />} />
        <Route path="/admin/films/show-time" element={<ShowTime />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/users" element={<ListUsers />} />
        <Route path = "/admin/users/list-users" element={<ListUsers />} />
        <Route path = "/admin/users/edit/:taiKhoan" element={<EditUser />} />
        <Route path="/admin/user/add-user" element={<AddUsers />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
     
    </>

 
  );
}

export default App;
