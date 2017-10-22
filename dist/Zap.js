"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Zap = function Zap(props) {
      return _react2.default.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "10", height: "16", viewBox: "0 0 10 16", classNameString: true },
            _react2.default.createElement("path", { "fill-rule": "evenodd", d: "M10 7H6l3-7-9 9h4l-3 7z" })
      );
};
exports.default = Zap;