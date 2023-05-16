import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useStore } from "../stores/store";

export default function RequireAuth() {
    // const { userStore: { isLoggedIn } } = useStore()
    const location = useLocation()
    const test = true;

    // if (!isLoggedIn) {
    if (test) {
        return <Navigate to='/' state={{ from: location }} />
    }

    return <Outlet />
}