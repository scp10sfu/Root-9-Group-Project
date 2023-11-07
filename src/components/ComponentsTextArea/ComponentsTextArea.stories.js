import { ComponentsTextArea } from ".";

export default {
  title: "Components/ComponentsTextArea",
  component: ComponentsTextArea,
  argTypes: {
    type: {
      options: ["text", "title"],
      control: { type: "select" },
    },
    stateProp: {
      options: [
        "text-filled",
        "finished-on-hover",
        "text-filled-w-o-cursor",
        "finished",
        "text-filled-w-cursor",
        "default",
        "cursor",
        "with-cursor-w-cursor",
        "empty",
        "with-cursor",
      ],
      control: { type: "select" },
    },
    darkMode: {
      options: ["off", "on"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    type: "text",
    stateProp: "text-filled",
    darkMode: "off",
    className: {},
    minHeightClassName: {},
    minHeight: "/img/min-height-constraint-1.png",
    minHeightClassNameOverride: {},
    imgClassName: {},
    typeBodyText: "abc",
  },
};
