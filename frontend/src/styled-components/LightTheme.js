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
    body: "#f3fdd8",
    // Text colour
    textColourOne: "#313131",
    textColourTwo: "#000",
    textColourThree: "#25b344",
    textColourFour: "#000",
    // Border colour
    border: "none",
    borderColourOne: "#6fd845",
    // Background colours
    // Copy of body colour
    backgroundColourOne: "#f3fdd8",
    // Welcome container header
    backgroundColourTwo: "#fff",
    // Bright green logout button colour
    backgroundColourThree: "#dfff74",
    // Tab non-active link colour
    backgroundColourFour: "#e7f5c0",
    // Toggle colour
    backgroundColourFive: "#a5ed84",
    backgroundColourSix: "#c7f5b1",
    backgroundColourEight: "#bfe7b6",
    // Opaque colours
    backgroundColourNine: "rgba(255, 255, 255, 0.5)",
    // Hover colours
    hoverColourThree: "#d6fb5d",
    hoverColourSeven: "#b9fa9a",
    // Note colours
    noteColourZero: {
        background: "#c7f5b1"
    },
    noteHoverColourZero: {
        background: "#b2f394"
    },
    noteColourOne: {
        background: "#def69a"
    },
    noteHoverColourOne: {
        background: "#d7f87b"
    },
    noteColourTwo: {
        background: "#a5ed84"
    },
    noteHoverColourTwo: {
        background: "#99ec72"
    },
    noteColourThree: {
        background: "#dfff74"
    },
    noteHoverColourThree: {
        background: "#d6fa5f"
    },
}

export default LightTheme;