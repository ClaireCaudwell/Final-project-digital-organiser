import SignupLogin from "./SignupLogin";
import Header from "./Header";
import Schedule from "./Schedule";
import NotesPage from "./NotesPage";
import FlowerImage from "../Images/Flowers.jpg";

const LightTheme = {
    ...SignupLogin,
    ...Header,
    ...Schedule,
    ...NotesPage,        

    backgroundImg: FlowerImage,
    opaqueColour: "rgba(255, 255, 255, 0.5)",
    colourOne: "#fff",
    // Darker mint green colour
    colourTwo: "#ccffcc",
    hoverColourTwo: "#b3ffb3",
    // Light grey colour
    colourThree: "#f2f2f2",
    // Slightly darker grey colour
    colourFour: "#e6e6e6",
    // Light mint green colour
    colourFive: "#e6ffe6",
    // Light green colour
    colourSix: "#ccff66",
    hoverColourSix: "#d5ff80",
    // Even darker mint green colour
    colourSeven: "#b3ffcc", 
    hoverColourSeven: "#c4ff4d",
    // Error message colour
    colourEight: "#ffcccc",   
    // Text colours
    textColourOne: "#313131",
    hoverTextColourOne: "#262626",
    textColourTwo: "#00e6ac",   
    // Note colours
    noteColourZero: "#ccff99",
    noteHoverColourZero: " #bfff80",
    noteColourOne: "#00e6ac",
    noteHoverColourOne: "#00cc99",
    noteColourTwo: "#fff",
    noteHoverColourTwo: "#f2f2f2",
    noteColourThree: "#b3ffb3",
    noteHoverColourThree: "#99ff99",
}

export default LightTheme;