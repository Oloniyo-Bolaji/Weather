import React,
{createContext, 
useState, 
useEffect} from 'react'
import axios from 'axios'


const WeatherContext = createContext();

const WeatherProvider = ({children}) => {
  const [searchValue, setSearchValue] = useState('')
  const [weather, setWeather] = useState({})
  const [weatherConditions, setWeatherConditions] = useState({})
  const [todaysForecast, setTodaysForecast] = useState([])
  const [indexLevel, setIndexLevel] = useState('')
  const [weeklyForecast, setWeeklyForecast] = useState([])
  
  
  const getWeather = async ({search}) => {
    try{
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?unitGroup=metric&key=BC7KNBN5JX4B78LLTYB7Z4NZJ&contentType=json`)
      const data = await response.json();
      const info = data
      setWeather(info)
      setWeatherConditions(info.currentConditions)
      const daysfc = info.days[0].hours
      const currentTime = new Date().toTimeString().slice(0, 8);
      const upcomingEvents = daysfc.filter(dayFc => dayFc.datetime > currentTime);
      setTodaysForecast(daysfc)
      setWeeklyForecast(data.days)
    }catch(err){
      alert(`No weather data on ${search}`)
      console.log(err)
    }
  }
  
  //function to get the Day from the date time provided by the API
  const daysOfWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const getDay = (date) => {
  const eachDate = new Date(date)
  const thatDay = daysOfWeek[eachDate.getDay()]
      return thatDay;
}

   const getDate = () => {
    const monthsOfYear = ['Jan', ' Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const today = new Date()
    const  day = today.getDay()
    const  date = today.getDate()
    const  month = today.getMonth()
    const  year = today.getFullYear()
    return `${daysOfWeek[day]}, ${date} ${monthsOfYear[month]} ${year}`
   }

   useEffect(() =>{
     const intervalId = setInterval(() => {
        getDate()
      }, 1000);
     return () => clearInterval(intervalId)  
    }, [])

  useEffect(() => {
    const uvIndex = weatherConditions.uvindex
      if(uvIndex < 3){
        setIndexLevel('Low')
      }else if(uvIndex <= 5){
        setIndexLevel('Moderate')
      }else if(uvIndex <= 7){
        setIndexLevel('High')
      }else{
        setIndexLevel('Very High')
      }
  }, [weather])

  
  
  return(
    <WeatherContext.Provider value = {{searchValue, setSearchValue, weather, weatherConditions, todaysForecast, getWeather, indexLevel, weeklyForecast, getDay, getDate}}>
      {children}
    </WeatherContext.Provider>
    )
}


export {WeatherContext, WeatherProvider} 