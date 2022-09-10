import { DEFAULT_BUTTON, ICON_PLACE_SELF_CENTER_1 } from '../../assets/styles/input-types-styles'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

export default function BackNavigation({isSmall = true, hasText = true, backTo, pageTitle}) {
    return (
        <div className={`${isSmall ? ("inline-flex") : ("fixed top-0 inline-flex flex-wrap items-center w-full p-1 shadow-md backdrop-blur-xl bg-white/50 font-Montserrat")}`}>
            <div className="container flex flex-wrap items-center justify-between mx-auto h-14 max-w-7xl">
                <div className="flex items-center transition duration-300 ease-in-out delay-150 rounded-md hover:text-blue-900">
                    <button type={"button"} className={`text-left ${DEFAULT_BUTTON}`}>
                        <Link to={backTo}>
                            <h1 className={`${isSmall ? ("px-5 py-3") : ("px-3 py-3")}`}>
                                <i
                                className={`fas fa-arrow-left ${ICON_PLACE_SELF_CENTER_1}`}
                                />
                            </h1>
                        </Link>
                    </button>
                    { hasText ? <h1 className="px-3 py-3 text-gray-700 truncate cursor-default text-md">{pageTitle}</h1> : null }
                </div>
            </div>
        </div>
    )
}

BackNavigation.propTypes = {
    isSmall: PropTypes.bool,
    hasText: PropTypes.bool,
    backTo: PropTypes.string,
    pageTitle: PropTypes.string,
}
