"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Grabber = function Grabber(props) {
      return _react2.default.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "8", height: "16", viewBox: "0 0 8 16", classNameString: true },
            _react2.default.createElement("path", { "fill-rule": "evenodd", d: "M8 4v1H0V4h8zM0 8h8V7H0v1zm0 3h8v-1H0v1z" })
      );
};
exports.default = Grabber;