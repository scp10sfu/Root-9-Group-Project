import { DarkModeNoVariantWrapper } from ".";

export default {
  title: "Components/DarkModeNoVariantWrapper",
  component: DarkModeNoVariantWrapper,
  argTypes: {
    variant: {
      options: ["headline", "directional-l", "directional-m"],
      control: { type: "select" },
    },
    alignment: {
      options: ["top-left", "default"],
      control: { type: "select" },
    },
    typeOfContext: {
      options: ["nostalgic-memories", "ballroom-of-dreams", "no", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    darkMode: true,
    variant: "headline",
    alignment: "top-left",
    typeOfContext: "nostalgic-memories",
    COMPONENTSTextAreaDarkMode: "off",
    COMPONENTSTextAreaDarkMode1: "off",
    className: {},
  },
};
