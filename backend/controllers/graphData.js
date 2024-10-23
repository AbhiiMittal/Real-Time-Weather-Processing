const summaryModel = require('../models/summaryModel');
const sevenDay = async(req,res)=>{
    try {
        const currentDate = new Date();
        const startDate = new Date();
        startDate.setDate(currentDate.getDate() - 7);
    
        const city = req.params.city;
        // console.log(city);
        // Format dates to match the string format in the database (YYYY-MM-DD)
        const formattedCurrentDate = currentDate.toISOString().split('T')[0];
        const formattedStartDate = startDate.toISOString().split('T')[0];
    
        // console.log('Current Date:', formattedCurrentDate);
        // console.log('Start Date:', formattedStartDate);
        // console.log('City:', city);
    
        const data = await summaryModel.find({
            city: city,
            date: {
                $gte: formattedStartDate,
                $lte: formattedCurrentDate,
            },
        });
    
        // console.log('Data retrieved from database:', data);
    
        const sevenDayData = data.map((day) => {
            return {
                date: day.date,
                avgTemp: day.avg_temp,
                maxTemp : day.max_temp,
                minTemp : day.min_temp
            };
        });
    
        res.status(200).json({ message: '7 day data retrieved successfully', data: sevenDayData });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data', error });
    }
    
    
}

const today = async(req,res)=>{
    try {
        const currentDate = new Date();
    
        const city = req.params.city;
    
        // Format dates to match the string format in the database (YYYY-MM-DD)
        const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    
        // console.log('Current Date:', formattedCurrentDate);
    
        const data = await summaryModel.find({
            city: city,
            date: formattedCurrentDate
        });
    
        const sevenDayData = data.map((day) => {
            return {
                date: day.date,
                avgTemp: day.avg_temp,
                maxTemp : day.max_temp,
                minTemp : day.min_temp
            };
        });
    
        // console.log('Seven Day Data:', sevenDayData);
        res.status(200).json({ message: '7 day data retrieved successfully', data: sevenDayData });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data', error });
    }
    
    
}

module.exports = {sevenDay};