import SignupLogin from "./SignupLogin";
import Header from "./Header";
import Schedule from "./Schedule";
import NotesPage from "./NotesPage";
import StarrySky from "../Images/Starry-sky.jpg";

const DarkTheme = {
    ...SignupLogin,
    ...Header,
    ...Schedule,
    ...NotesPage,    
    
    backgroundImg: StarrySky,
    opaqueColour: "rgba(31, 61, 122, 0.5)",
    // Almost black colour
    colourOne: "#0a1429",
    // Dark blue colour
    colourTwo: "#142a52",
    hoverColourTwo: "#193467",
    // Darker blue colour - input colour
    colourThree: "#24478f",
    // Slightly darker blue colour
    colourFour: "#193366",
    // Darker blue colour
    colourFive: "#0f1e3e",
    // Light blue colour
    colourSix: "#2d5bb9",
    hoverColourSix: "#2851a4",
    // Medium blue colour
    colourSeven: "#1f3d7a", 
    hoverColourSeven: "#c4ff4d",
    // Error message colour
    colourEight: "#4d4dff",   
    // Text colours
    textColourOne: "#f2f2f2",
    hoverTextColourOne: "#d9d9d9",
    textColourTwo: "#0066ff",   
    // Note colours
    noteColourZero: "#24478f",
    noteHoverColourZero: "#1f3d7a",
    noteColourOne: "#2d5bb9",
    noteHoverColourOne: "#2851a4",
    noteColourTwo: "#6f94dc",
    noteHoverColourTwo: "#5b84d7",
    noteColourThree: "#0a1429",
    noteHoverColourThree: "#050a15",
}

export default DarkTheme;