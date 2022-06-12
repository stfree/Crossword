import React from "react";
import PropTypes from "prop-types";

function Welcome(props) {
  const { name, message } = props;
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center m-4">
      <div>
        <div className="text-xl font-medium text-black">Hello {name}</div>
        <p className="text-slate-500">{message}</p>
      </div>
    </div>
  );
}

Welcome.propTypes = {
  name: PropTypes.string,
  message: PropTypes.string,
};

Welcome.defaultProps = {
  name: "Stranger",
  message: "This is an example component!",
};

export default Welcome;
