import React from "react";
import ReactDOMClient from "react-dom/client";
import { ElementMoodboard } from "./screens/ElementMoodboard";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<ElementMoodboard />);
