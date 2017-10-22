"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChevronLeft = function ChevronLeft(props) {
      return _react2.default.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "8", height: "16", viewBox: "0 0 8 16", classNameString: true },
            _react2.default.createElement("path", { "fill-rule": "evenodd", d: "M5.5 3L7 4.5 3.25 8 7 11.5 5.5 13l-5-5z" })
      );
};
exports.default = ChevronLeft;