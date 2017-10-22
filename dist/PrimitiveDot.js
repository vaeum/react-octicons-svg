"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PrimitiveDot = function PrimitiveDot(props) {
      return _react2.default.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "8", height: "16", viewBox: "0 0 8 16", classNameString: true },
            _react2.default.createElement("path", { "fill-rule": "evenodd", d: "M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z" })
      );
};
exports.default = PrimitiveDot;