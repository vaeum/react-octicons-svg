"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChevronRight = function ChevronRight(props) {
      return _react2.default.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "8", height: "16", viewBox: "0 0 8 16", classNameString: true },
            _react2.default.createElement("path", { "fill-rule": "evenodd", d: "M7.5 8l-5 5L1 11.5 4.75 8 1 4.5 2.5 3z" })
      );
};
exports.default = ChevronRight;