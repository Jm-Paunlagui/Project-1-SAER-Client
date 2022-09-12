import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { NavLink, useResolvedPath } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import { DELAY_1, DELAY_3 } from "../../assets/styles/input-types-styles";
import { FaSignInAlt } from "react-icons/fa";
import { GiRank3 } from "react-icons/gi";
import { MdLeaderboard } from "react-icons/md";
import React from "react";
import logo from "../../assets/img/android-chrome-192x192.png";

/**
 * @description NavigationBar component with useful links
 */
export default function NavigationBar(to) {

    const router = useResolvedPath(to);

    function isActive (link) {
        return router.pathname === link;
    }

  /**
   * @description Navigation bar array of objects for the navigation bar links
   */
  const NavigationBarlinks = [
    {
      name: "Home",
      icon: <AiFillHome size={16}/>,
      link: "/",
        current: isActive("/"),
    },
    {
      name: "Leaderboard",
      icon: <MdLeaderboard size={16}/>,
      link: "/leaderboard",
        current: isActive("/leaderboard"),
    },
    {
      name: "Ranking",
      icon: <GiRank3 size={16}/>,
      link: "/ranking",
      current: isActive("/ranking"),
    },
    {
      name: "Sign In",
      icon: <FaSignInAlt size={16}/>,
      link: "/auth",
        current: isActive("/auth"),
    },
  ];

  return (
    <Menu
      as={"nav"}
      className="fixed top-0 flex flex-wrap items-center justify-between w-full p-1 shadow-md backdrop-blur-xl bg-white/50 font-Montserrat"
    >
      {({ open }) => (
        <div className="container flex flex-wrap items-center justify-between mx-auto max-w-7xl">
          <div className="flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <NavLink to="/">
              <div className="flex items-center px-3 py-2 text-gray-900 transition duration-300 ease-in-out delay-150 rounded-md hover:text-blue-900">
                <img src={logo} alt="logo" className="w-10 h-10" />
                <h1 className={`ml-2 text-xl font-bold tracking-widest ${DELAY_1} md:text-3xl lg:flex`}>
                  MATRIX LAB
                </h1>
              </div>
            </NavLink>
            <Menu.Button className={`block px-3 py-1 text-base leading-none ${DELAY_1} bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none`}>
              <span className="sr-only">Open main menu</span>
              {open ? (
                <XMarkIcon className="block w-6 h-6 " aria-hidden="true" />
              ) : (
                <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
              )}
            </Menu.Button>
          </div>
          <Menu
            as={"div"}
            className={`lg:flex flex-grow items-center lg:bg-opacity-0 lg:shadow-none ${
              open ? " block" : " hidden"
            }`}
          >
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <ul className="flex flex-col ml-auto space-y-1">
                {NavigationBarlinks.map((link) => (
                  <NavLink to={link.link} key={link.name}>
                    <li className={`${link.current ? "text-blue-900 border-y-2 border-blue-900" : ""} ${DELAY_3} flex items-center justify-center px-4 py-4 text-gray-700 hover:text-blue-900`}>
                      <span>{link.icon}</span>
                      <h1 className="block ml-1 text-lg font-medium tracking-tight">
                        {link.name}
                      </h1>
                    </li>
                  </NavLink>
                ))}
              </ul>
            </Transition>
            <ul className="flex-col justify-start hidden list-none lg:flex lg:flex-row lg:ml-auto">
              {NavigationBarlinks.map((link) => (
                <NavLink to={link.link} key={link.name}>
                  <li className={`${link.current ? "text-blue-900 border-b-2 border-blue-900" : ""} ${DELAY_3} flex items-center px-4 py-4 text-gray-700 hover:text-blue-900`}>
                    <span>{link.icon}</span>
                    <h1 className="block ml-1 text-lg font-medium tracking-tight">
                      {link.name}
                    </h1>
                  </li>
                </NavLink>
              ))}
            </ul>
          </Menu>
        </div>
      )}
    </Menu>
  );
}
