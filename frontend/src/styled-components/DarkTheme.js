import SignupLogin from "./SignupLogin";
import Header from "./Header";
import Schedule from "./Schedule";
import NotesPage from "./NotesPage";
import Concrete from "../Images/Concrete.jpg";

const LightTheme = {
    ...SignupLogin,
    ...Header,
    ...Schedule,
    ...NotesPage,    
    
    backgroundImg: Concrete,
    body: "#e6e6e6",
    // Text colour
    textColourOne: "#313131",
    textColourTwo: "#000",
    textColourThree: "#003cb3",
    textColourFour: "#fff",
    // Border colour
    border: "none",
    borderColourOne: "#8080ff",
    // Background colours
    // Copy of body colour
    backgroundColourOne: "#e6e6e6",
    // Welcome container header
    backgroundColourTwo: "#fff",
    // Bright green logout button colour
    backgroundColourThree: "#bfbfbf",
    // Tab non-active link colour
    backgroundColourFour: "#d9d9d9",
    // Toggle colour
    backgroundColourFive: "#8cb3d9",
    backgroundColourSix: "#b3ccff",
    backgroundColourEight: "#8cb3d9",
    // Opaque colours
    backgroundColourNine: "rgba(51, 51, 51, 0.5)",
    // Hover colours
    hoverColourThree: "#b3b3b3",
    hoverColourSeven: "#99bbff",
    // Note colours
    noteColourZero: {
        background: "#8cb3d9"
    },
    noteHoverColourZero: {
        background: "#79a6d2"
    },
    noteColourOne: {
        background: "#fff"
    },
    noteHoverColourOne: {
        background: "#f2f2f2"
    },
    noteColourTwo: {
        background: "#cccccc"
    },
    noteHoverColourTwo: {
        background: "#bfbfbf"
    },
    noteColourThree: {
        background: "#808080"
    },
    noteHoverColourThree: {
        background: "#737373"
    },
}

export default LightTheme;