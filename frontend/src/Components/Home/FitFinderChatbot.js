import React, { Component } from 'react'

export class FitFinderChatbot extends Component {
  componentDidMount() {
    (function (d, m) {
      var kommunicateSettings =
        { "appId": "3a6cdcaa06ca57c97f88c8617d995fc9c", "popupWidget": true, "automaticChatOpenOnNavigation": true };
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }

  render() {
    return (
      <div>
        {/* Chatbot widget will be rendered here */}
      </div>
    )
  }
}

export default FitFinderChatbot

