import { lazy, useContext,Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import Sidebar from "../Navbar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import { AppContext } from "../../../import";
import ShimmerList from "../Shimmer/ShimmerList";
import ErrorPage from "../../Error/Error";

export {ErrorPage,lazy, useContext,Suspense,Routes, Route,NavbarAdmin,Sidebar,Dashboard,AppContext,ShimmerList}