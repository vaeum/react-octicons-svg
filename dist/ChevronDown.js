"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChevronDown = function ChevronDown(props) {
      return _react2.default.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "10", height: "16", viewBox: "0 0 10 16", classNameString: true },
            _react2.default.createElement("path", { "fill-rule": "evenodd", d: "M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6z" })
      );
};
exports.default = ChevronDown;