import express from "express";
import cors from "cors";
import { exec } from 'child_process';


const app=express();
app.use(cors());

app.get("/getPlan",(req,res)=>{
    const budget = req.query.budget;
    const days = req.query.days;
    const combinedImages = req.query.combinedImages;

    // const pythonExecutable = ''
    const command = `python3 itinerary_generation.py ${budget} ${days} ${combinedImages}`;

    // Execute the command
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (stderr) {
            console.error(`Python script error: ${stderr}`);
            res.status(500).json({ error: 'Python script error' });
            return;
        }

        // Handle the output from the Python script
        console.log(`Python output: ${stdout}`);
        const plan = { plan: stdout}; // Trim to remove leading/trailing whitespace
        res.json(plan);
    });
})
app.listen(5000,()=>console.log("app running!"));