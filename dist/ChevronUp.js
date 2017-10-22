"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChevronUp = function ChevronUp(props) {
      return _react2.default.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "10", height: "16", viewBox: "0 0 10 16", classNameString: true },
            _react2.default.createElement("path", { "fill-rule": "evenodd", d: "M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5z" })
      );
};
exports.default = ChevronUp;