"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comment = function Comment(props) {
      return _react2.default.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 16 16", classNameString: true },
            _react2.default.createElement("path", { "fill-rule": "evenodd", d: "M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z" })
      );
};
exports.default = Comment;