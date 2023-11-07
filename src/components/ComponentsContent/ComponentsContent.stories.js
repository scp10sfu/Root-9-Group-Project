import { ComponentsContent } from ".";

export default {
  title: "Components/ComponentsContent",
  component: ComponentsContent,
  argTypes: {
    darkMode: {
      options: ["off", "on"],
      control: { type: "select" },
    },
    TOOL: {
      options: ["moodboard-generator", "palette-generator", "colour-picker"],
      control: { type: "select" },
    },
    image: {
      options: ["off", "on"],
      control: { type: "select" },
    },
    alignment: {
      options: ["top-left", "centered"],
      control: { type: "select" },
    },
    type: {
      options: [
        "example-with-text-6",
        "example-with-text-1",
        "example-with-text-5",
        "example-with-text-3",
        "default",
        "example",
        "example-with-text-2",
        "example-with-text-4",
      ],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    darkMode: "off",
    TOOL: "moodboard-generator",
    enabled: true,
    image: "off",
    alignment: "top-left",
    type: "example-with-text-6",
    className: {},
    COMPONENTSTextAreaMinHeight: "/img/min-height-constraint-1.png",
    COMPONENTSTextAreaMinHeightClassName: {},
    hasComponentsContent: true,
    darkModeNoVariantWrapper: "abc",
    darkModeNoVariantWrapper1: "abc",
  },
};
