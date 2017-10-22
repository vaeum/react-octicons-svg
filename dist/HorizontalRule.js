"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HorizontalRule = function HorizontalRule(props) {
      return _react2.default.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "10", height: "16", viewBox: "0 0 10 16", classNameString: true },
            _react2.default.createElement("path", { "fill-rule": "evenodd", d: "M1 7h2v2h1V3H3v3H1V3H0v6h1V7zm9 2V7H9v2h1zm0-3V4H9v2h1zM7 6V4h2V3H6v6h1V7h2V6H7zm-7 7h10v-2H0v2z" })
      );
};
exports.default = HorizontalRule;