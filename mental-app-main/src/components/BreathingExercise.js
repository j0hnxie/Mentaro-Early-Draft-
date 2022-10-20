import {
    Button
} from "@material-ui/core";
import breathing from './assets/breathing.GIF'
import React from "react";

const BreathingExercise = () => {

    return (
        <div>
            <Button variant="contained" color="primary" href="/UserHomePage">Back</Button>
            <img src={breathing} alt="Breathe" />
        </div>
    );
};

export default BreathingExercise;