import { BACK_BUTTON, ICON_PLACE_SELF_CENTER, PRIMARY_BUTTON, TEXT_FIELD }  from "../../assets/styles/input-types-styles";

import {Link} from "react-router-dom";
import React from "react";
import logo from "../../assets/img/android-chrome-192x192.png";

/**
 * @description Handles the forgot password request page
 */
export default function ForgotPasswordReq() {
  return (
    <div className="container h-full mx-auto font-Montserrat">
      <div className="flex items-center content-center justify-center h-full">
        <div className="w-5/6 md:w-6/12 lg:w-4/12 xl:w-3/12">
          <div className="relative flex flex-col w-full min-w-0 p-6 break-words bg-white border-0 rounded-lg shadow-lg">
            <Link to={"/auth"}
                  className={`${BACK_BUTTON}`}
            >
              <i className={`fas fa-arrow-left ${ICON_PLACE_SELF_CENTER}`}/>Back
            </Link>

            <div className="flex items-center py-2 text-gray-800">
              <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
              <h1 className="ml-3 font-extrabold tracking-widest text-md">
                MATRIX LAB
              </h1>
            </div>

            <div className="flex-auto">
              <div className="mb-3 text-start">
                <h6 className="text-lg font-bold text-gray-500">
                  Forgot Password?
                </h6>
              </div>
              <div className="mb-3 text-start">
                <p className="text-gray-700">
                  Enter your email address below and we&apos;ll send you a new
                  password.
                </p>
              </div>
              <form className="relative mx-auto mt-6 max-w-screen">
                <input
                  className={`${TEXT_FIELD}`}
                  type="email"
                  placeholder="Email"
                />
                <button
                    className={`${PRIMARY_BUTTON}`}
                    type={"button"}
                >
                  <i className={`fas fa-rotate-right ${ICON_PLACE_SELF_CENTER}`} />Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
