import SignupLogin from "./SignupLogin";
import Header from "./Header";
import Schedule from "./Schedule";
import NotesPage from "./NotesPage";

const LightTheme = {
    ...SignupLogin,
    ...Header,
    ...Schedule,
    ...NotesPage,    
    
    body: "#f3fdd8",
    backgroundColourOne: {
        background: "#fff",
    },
    backgroundColourTwo: {
        background: "#f3fdd8",  
    },
    backgroundColourThree: {
        background: "#dfff74"
    },
    hoverColourThree: {
        background: "#d6fb5d"
    },
    backgroundColourFour: {
        background: "#e7f5c0"
    },
    backgroundColourSix: {
        background: "#a5ed84"
    },
    backgroundColourSeven: {
        background: "#c7f5b1"
    },
    hoverColourSeven: {
        background: "#b9fa9a"
    },
    backgroundColourEight: {
        background: "#bfe7b6"
    },
    textColourOne: {
        color: "#25b344"
    },
    borderColourOne: {
        color: "#6fd845"
    },
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