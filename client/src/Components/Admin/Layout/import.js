import { lazy,Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import Sidebar from "../Navbar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";

import ShimmerList from "../Shimmer/ShimmerList";
import ErrorPage from "../../Error/Error";

export {ErrorPage,lazy,Suspense,Routes, Route,NavbarAdmin,Sidebar,Dashboard,ShimmerList}