import React from "react";

function Welcome(props) {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center m-4">
      <div>
        <div className="text-xl font-medium text-black">
          Hello, {props.name}
        </div>
        <p className="text-slate-500">This is an example Component</p>
      </div>
    </div>
  );
}

export default Welcome;
