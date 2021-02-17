import Header from "./Header";
import Schedule from "./Schedule";
import NotesPage from "./NotesPage";

const DarkTheme = {
    ...Header,
    ...Schedule,
    ...NotesPage,    
    
    body: "#ffe6cc",
    backgroundColourOne: {
        background: "#fff",
    },
    backgroundColourTwo: {
        background: "#ffe6cc",  
    }, 
    backgroundColourThree: {
        background: "#ff884d"
    },
    hoverColourThree: {
        background: "#ff7733"
    },
    backgroundColourFour: {
        background: "#ffd9b3"
    },
    backgroundColourSix: {
        background: "#ffcc99"
    },
    backgroundColourSeven: {
        background: "#ffb380"
    },
    hoverColourSeven: {
        background: "#ffa366"
    },
    backgroundColourEight: {
        background: "#ffb366"
    },
    textColourOne: {
        color: "#313131"
    },
    borderColourOne: {
        color: "#ff7733"
    },
    noteColourZero: {
        background: "#ffcc99"
    },
    noteHoverColourZero: {
        background: "#ffbf80"
    },
    noteColourOne: {
        background: "#ffdb4d"
    },
    noteHoverColourOne: {
        background: "#ffd633"
    },
    noteColourTwo: {
        background: "#ffff80"
    },
    noteHoverColourTwo: {
        background: "#ffff66"
    },
    noteColourThree: {
        background: "#ff944d"
    },
    noteHoverColourThree: {
        background: "#ff8533"
    },
}

export default DarkTheme;