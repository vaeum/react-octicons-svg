"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TriangleLeft = function TriangleLeft(props) {
      return _react2.default.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "6", height: "16", viewBox: "0 0 6 16", classNameString: true },
            _react2.default.createElement("path", { "fill-rule": "evenodd", d: "M6 2L0 8l6 6z" })
      );
};
exports.default = TriangleLeft;