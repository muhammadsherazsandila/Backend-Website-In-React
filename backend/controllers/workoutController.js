const workoutModel = require('../models/workoutModel');
const getAllWorkouts = async (req, res) => {
    let workouts = await workoutModel.find();
    if (!workouts) {
        res.send("No Found Workouts!")
    } else {
        const formattedWorkouts = workouts.reverse().map((workout) => ({
            _id: workout._id,
            productName: workout.productName,
            productPrice: workout.productPrice,
            panelColor: workout.panelColor,
            textColor: workout.textColor,
            productPic: `data:${workout.productPic.contentType};base64,${workout.productPic.toString('base64')}`
        }));
        res.send(formattedWorkouts)
    }
}
const getSingleWorkout = async (req, res) => {
    let id = req.params.id;
    let workout = await workoutModel.findOne({ _id: id });
    const formatedProduct = {
        _id: workout._id,
        productName: workout.productName,
        productPrice: workout.productPrice,
        panelColor: workout.panelColor,
        textColor: workout.textColor,
        productPic: `data:${workout.productPic.contentType};base64,${workout.productPic.toString('base64')}`
    }
    res.send(formatedProduct)
}
const createWorkout = async (req, res) => {
    try {
        let { productName, productPrice, panelColor, textColor } = req.body;
        let workout = await workoutModel.findOne({ productName: productName });
        if (!workout) {
            let workout = await workoutModel.create({
                productName,
                productPrice,
                panelColor,
                textColor,
                productPic : req.file.buffer
            })
            await workout.save();
            res.send("Created successfully!" );

        } else {
            res.send("Use Different Name!");
        }
    } catch (error) {
        console.log(error)
    }

}
const deleteWorkout = async (req, res) => {
    let id = req.params.id;
    await workoutModel.deleteOne({ _id: id });
    res.status(200).json("Deleted Successfully!")
}
const updateWorkout = async (req, res) => {
    let id = req.params.id;
    let {productName , productPrice , panelColor , textColor} = req.body;
    let workout = await workoutModel.findOne({_id : id})
    workout.productName = productName
    workout.productPrice = productPrice
    workout.panelColor = panelColor
    workout.textColor = textColor
    try {
        if (req.file) {
            workout.productPic = req.file.buffer
        }
    } catch (error) {
        console.log(error)
    }
    await workout.save();        
    const formatedProduct = {
        _id: workout._id,
        productName: workout.productName,
        productPrice: workout.productPrice,
        panelColor: workout.panelColor,
        textColor: workout.textColor,
        productPic: `data:${workout.productPic.contentType};base64,${workout.productPic.toString('base64')}`
    }
    res.send(formatedProduct)

}

module.exports = { getAllWorkouts, getSingleWorkout, createWorkout, deleteWorkout, updateWorkout }