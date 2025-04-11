// import React, { useEffect } from 'react';
// import Home from './pages/Home';
// import Navbar from './components/Navbar/navbar';
// import Footer from './components/Footer/Footer';
// import {  Routes, Route } from 'react-router-dom';
// import AllBooks from './pages/AllBooks';
// import LogIn from './pages/LogIn';
// import SignUp from './pages/SignUp';
// import Profile from './pages/Profile';
// import Kart from './pages/Kart';
// import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
// import { useDispatch, useSelector } from 'react-redux';
// import { authActions } from './store/auth';
// import Favourites from './components/Profile/Favourites';
// import UserOrderHistory from './components/Profile/UserOrderhistory';
// import Settings from './components/Profile/Settings';
// import Allorders from './pages/Allorders';
// import AddBook from './pages/AddBook';
// import UpdateBook from './pages/UpdateBook';
// const App = () => {
//   const dispatch=useDispatch();
//   const role=useSelector((state)=>state.auth.role)
//   useEffect(()=>{
//     if(
//       localStorage.getItem("id") &&
//       localStorage.getItem("token")&&
//       localStorage.getItem("role")
//     )
//     {
//       dispatch(authActions.login());
//       dispatch(authActions.changedRole(localStorage.getItem("role")));
//     }
//   },[])
  
//   return (
//     <div>
//       <Navbar/>
//       <Routes>
//         <Route  path="/" element={<Home />} />
//         <Route path="/all-books" element={<AllBooks />} />
//         <Route path="/LogIn" element={<LogIn />} />
//         <Route path="/SignUp" element={<SignUp />} />
//         <Route path="/kart" element={<Kart />} />
//         <Route path="/profile" element={<Profile />}>
//           {/* Nested routes for user */}
//           {role === 'user' && (
//             <>
//               <Route index element={<Favourites />} />
//               <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
//               <Route path="/profile/settings" element={<Settings />} />
//             </>
//           )}
//           {/* Nested routes for admin */}
//           {role === 'admin' && (
//             <>
//               <Route index element={<Allorders />} />
//               <Route path="/profile/add-book" element={<AddBook />} />
//             </>
//           )}
//         </Route>
//         <Route path="/updateBook/:id" element={<UpdateBook/>}/>
//         <Route path='/view-book-details/:id' element={<ViewBookDetails/>}></Route>
//       </Routes>
//       <Footer />
//     </div>
//   );
// };

// export default App;


//chat
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import Home from './pages/Home';
import Navbar from './components/Navbar/navbar';
import Footer from './components/Footer/Footer';
import AllBooks from './pages/AllBooks';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Kart from './pages/Kart';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import Favourites from './components/Profile/Favourites';
import UserOrderHistory from './components/Profile/UserOrderhistory';
import Settings from './components/Profile/Settings';
import Allorders from './pages/Allorders';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changedRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/kart" element={<Kart />} />
        
        {/* Profile Page with Nested Routes */}
        <Route path="/profile" element={<Profile />}>
          <Route index element={role === 'user' ? <Favourites /> : <Allorders />} />
          {role === 'user' && (
            <>
              <Route path="orderHistory" element={<UserOrderHistory />} />
              <Route path="settings" element={<Settings />} />
            </>
          )}
          {role === 'admin' && (
            <>
              <Route path="add-book" element={<AddBook />} />
            </>
          )}
        </Route>

        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
