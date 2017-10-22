"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TriangleUp = function TriangleUp(props) {
      return _react2.default.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "16", viewBox: "0 0 12 16", classNameString: true },
            _react2.default.createElement("path", { "fill-rule": "evenodd", d: "M12 11L6 5l-6 6z" })
      );
};
exports.default = TriangleUp;