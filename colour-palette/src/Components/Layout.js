// Layout.js
import React from "react";
import "./Layout.css";
// import "./Layout-test.css";
import './GridStyles.css'

// Always wrap your entire page with a container (unless you have a background image that you want to bleed to the edges of the page at all times)
// Wrap each set of elements in a row
// Don't change the width, padding-left, padding-right, margin-left or margin-right of the items that have a [size]-col-[x] class on them.

export default function Layout({ children }) {
  return (
    <div>
        {children}
    </div>
  );
}