import React from "react";
import PropTypes from "prop-types";

export default function CardStats({
  statSubtitle,
  statTitle,
  statDescripiron,
  statIconName,
  statIconColor,
  statBgColor
}) {
  return (
    <>
      <div className={"relative flex flex-col min-w-0 break-words rounded mb-6 xl:mb-0 shadow-lg " + statBgColor}>
        <div className="flex-auto p-3">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-3 max-w-full flex-grow flex-1">
              <h5 className="text-white uppercase font-bold text-sm">
                {statSubtitle}
              </h5>
              <span className="font-semibold text-4xl text-white  mt-2 block">
                {statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-3 flex-initial">
              <div
                className={
                  "text-beige bg-no-repeat shadow-none p-3 text-center inline-flex items-center justify-center w-12 h-12  " +
                  statIconColor
                }
              >
                <i className={"text-5xl mt-3 "  + statIconName}></i>
              </div>
            </div>
          </div>
          <p className="text-sm text-white mt-4">
            <span className="whitespace-nowrap">{statDescripiron}</span>
          </p>
        </div>
      </div>
    </>
  );
}

CardStats.defaultProps = {
  statSubtitle: "Hotels",
  statTitle: "27",
  statDescripiron: "Total hotels available",
  statIconName: "fas fa-hotel",
  statIconColor: "bg-red-500",
};

CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.number,
  statArrow: PropTypes.oneOf(["up", "down"]),
  statPercent: PropTypes.string,
  // can be any of the text color utilities
  // from tailwindcss
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string,
  statIconName: PropTypes.string,
  // can be any of the background color utilities
  // from tailwindcss
  statIconColor: PropTypes.string,
  statBgColor: PropTypes.string,
};
