import Navbar from './components/Common/Navbar';
import {
    BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import './App.css'
import AdminLogin from './components/Admin/AdminLogin';
import UserLogin from './components/Users/UserLogin';
import DriverLogin from './components/Drivers/DriverLogin';
import Home from './components/Common/Home';
import AdminHome from './components/Admin/AdminHome';
import AddDriver from './components/Admin/AddDriver';
import AddBin from './components/Admin/AddBin';
import UserHome from './components/Users/UserHome';
import UserAddComplaint from './components/Users/UserAddComplaint';
import DriverHome from './components/Drivers/DriverHome';
import UserSignup from './components/Users/UserSignup';
import ProfilePage from './components/Common/ProfilePage';
import UpdateDriver from './components/Admin/UpdateDriver';
import { VerifyUserProvider } from './context/VerifyUserContext';
import UpdateBin from './components/Admin/UpdateBin';
import AddComplaint from './components/Users/AddComplaint';
import MyComplaints from './components/Users/MyComplaints';
import DriverWork from './components/Drivers/DriverWork';
import UpdateBinStatus from './components/Admin/UpdateBinStatus';
import AdminViewComplaints from './components/Admin/AdminViewComplaints';
import AdminViewUsers from './components/Admin/AdminViewUsers';
import UserUpdateDetails from './components/Users/UserUpdateDetails';
import UploadProofBin from './components/Drivers/UploadProofBin';
import UserAddImageComplaint from './components/Users/UserAddImageComplaint';
import { AssignDriver } from './components/Admin/AssignDriver';

function App() {
    return (
        <div className='main-body'>
            <Router>
                <VerifyUserProvider>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/profile/:id' element={<ProfilePage />} />
                        {/* Admin Routes Start*/}
                        <Route path='/admin_login' element={<AdminLogin />} />
                        <Route path='/admin_home' element={<AdminHome />} />
                        <Route path='/admin_add_bin' element={<AddBin />} />
                        <Route path='/admin_add_driver' element={<AddDriver />} />
                        <Route path='/admin_update_driver' element={<UpdateDriver />} />
                        <Route path='/admin_update_bin' element={<UpdateBin />} />
                        <Route path='/view_all_complaints' element={<AdminViewComplaints/>}/>
                        <Route path='/view_all_users' element={<AdminViewUsers/>}/>
                        <Route path='/admin_bin_status/:id' element={ <UpdateBinStatus/> }/>
                        <Route path='/assign_driver/:id' element={ <AssignDriver/> }/>
                        {/* Admin Routes End */}
                        {/* User Routes Start*/}
                        <Route path='/user_login' element={<UserLogin />} />
                        <Route path='/user_signup' element={<UserSignup />} />
                        <Route path='/user_home' element={<UserHome />} />
                        <Route path='/user_add_complaint' element={<UserAddComplaint />} />
                        <Route path='/user_image_complaint' element={<UserAddImageComplaint/>}/>
                        <Route path='/user_complaint' element={<AddComplaint />} />
                        <Route path='/user_view_complaint' element={<MyComplaints />} />
                        <Route path='/user_detail' element={<UserUpdateDetails/>}/>
                        {/* User Routes End */}
                        {/* Driver Routes Start */}
                        <Route path='/driver_login' element={<DriverLogin />} />
                        <Route path='/driver_home' element={<DriverHome />} />
                        <Route path='/driver_work' element={ <DriverWork /> }/>
                        <Route path='/driver_upload/:id' element={ <UploadProofBin/> }/>
                        {/* Driver Routes End */}
                    </Routes>
                </VerifyUserProvider>
            </Router>
        </div>
    )
}

export default App