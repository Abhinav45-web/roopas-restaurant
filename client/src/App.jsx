import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import Orders from "./pages/Orders";

import Admin from "./pages/Admin";
import AddFood from "./pages/AddFood";
import AdminFoods from "./pages/AdminFoods";
import AdminOrders from "./pages/AdminOrders";

function App() {
    return (
        <>
            <Navbar />

            <Routes>

                {/* =====================================
                    CUSTOMER ROUTES
                ====================================== */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/menu"
                    element={<Menu />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/orders"
                    element={<Orders />}
                />


                {/* =====================================
                    ADMIN ROUTES
                ====================================== */}

                <Route
                    path="/admin"
                    element={<Admin />}
                />

                <Route
                    path="/admin/add-food"
                    element={<AddFood />}
                />

                <Route
                    path="/admin/foods"
                    element={<AdminFoods />}
                />

                <Route
                    path="/admin/orders"
                    element={<AdminOrders />}
                />


                {/* =====================================
                    FALLBACK
                ====================================== */}

                <Route
                    path="*"
                    element={<Home />}
                />

            </Routes>
        </>
    );
}

export default App;