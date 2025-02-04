import React, {useContext, useEffect} from 'react';
import {WeatherContext} from './Context'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaThermometerEmpty} from 'react-icons/fa'
import {FaRegEye} from 'react-icons/fa'
import {MdOutlineSpeed} from 'react-icons/md'
import {WiHumidity} from 'react-icons/wi'
import './Weather.css'

const Weather = () => {
  const {searchValue, setSearchValue, weather, weatherConditions, todaysForecast, getWeather, indexLevel, weeklyForecast, getDay, getDate} = useContext(WeatherContext)
  
  useEffect(() => {
    getWeather({search: 'Lagos'})
  }, [])
  
  return (
    <div className='weather box-border w-full p-[20px] flex flex-col gap-[10px] '>

        {/*header*/}
      <div className='input-div w-full relative'>
       <input 
         type='text' 
         placeholder='Search'
         className='w-full p-[5px] h-[30px] rounded-[10px] border-0 outline-0'
         value={searchValue}
         onChange={(e) => {setSearchValue(e.target.value)}}
         />
       <button className='absolute right-[5%] top-[25%]' onClick={() => {getWeather({search: searchValue})
         setSearchValue('')}}><AiOutlineSearch /></button>
     </div>
     
     <div className='header-info flex md:flex-row-reverse md:justify-around justify-center flex-col items-center mt-[10px] mb-[10px] mr-[0] ml-[0]'>
       <div>
         <img src={`./Images/${weatherConditions.icon}.png`} className='size-[80px]'/>
       </div>
       <div className='text-center'>
         <h3 className='text-3xl font-bold'>{weather.address}</h3>
         <p className='text-xl'>{weatherConditions.conditions}</p>
         <h1 className='text-6xl font-bold'>{weatherConditions.temp}°</h1>
         <p className='text-xm'>{getDate()}</p>
       </div>
     </div>
    
     <div className=''>
       <h4 className='text-xm m-[5px]'>Todays Forecast</h4>
       <div className='todays flex overflow-x-auto gap-[10px]'>
         {todaysForecast.map((today, index) => {
          return(
          <div key={index} className='today flex flex-col justify-between text-center text-xm p-[10px] rounded-[0.5em] sm:w-[70px] sm:h-[150px]'>
            <h3>{today.datetime.slice(0, 5)}</h3>
            <div className='flex justify-center items-center'>
             <img src={`./Images/${today.icon}.png`} className='size-[30px]'/>
            </div>
            <p>{today.temp}°</p>
          </div>
          ) 
         })}
       </div>
     </div>
     
     {/*uv index*/}
     <div className='uv w-full'>
       <div className='divone w-full h-[110px] p-[10px] rounded-[10px]'>
         <h5>UV Index</h5>
         <h2 className='font-bold text-2xl'>{weatherConditions.uvindex}</h2>
         <h3>{indexLevel}</h3>
         <div className='bar-container w-full overflow-hidden h-[5px] rounded-[10px] mt-[5px] mb-[5px] mr-[0] ml-[0]'>
           <div className='bar h-full' style={{width: `${weatherConditions.uvindex * 10}%`}}></div>
         </div>
       </div>
     </div>
    
       <div className='w-full'>   
       <div className='para grid w-full justify-between pt-[0] pb-[0] pr-[5px] pl-[5px] '>
         <div className='paraone rounded-[10px] mt-[5px] mb-[5px] mr-[0] ml-[0] w-[150px] h-[100px] md:w-[200px] md:h-[100px]'>
           <div className='each flex items-center justify-start gap-[1px] '>
            <span><FaThermometerEmpty /></span>
            <h3 className='uppercase'>Feelslike</h3>
           </div>
          <h1 className='text-center text-3xl'>{weatherConditions.feelslike}°</h1>
         </div>
         
          <div className='paraone rounded-[10px] mt-[5px] mb-[5px] mr-[0] ml-[0] w-[150px] h-[100px] md:w-[200px] md:h-[100px]'>
           <div className='each flex items-center justify-start gap-[1px]'>
            <span><WiHumidity /></span>
            <h3 className='uppercase'>Humidity</h3>
           </div>
           <h1 className='text-center text-3xl'>{weatherConditions.humidity}%</h1>
          </div>
          
          <div className='paraone rounded-[10px] mt-[5px] mb-[5px] mr-[0] ml-[0] w-[150px] h-[100px] md:w-[200px] md:h-[100px]'>
           <div className='each flex items-center justify-start gap-[1px]'>
            <span><FaRegEye /></span>
            <h3 className='uppercase'>Visibility</h3>
           </div>
           <h1 className='text-center text-3xl'>{weatherConditions.visibility} mi</h1>
          </div>
          
          <div className='paraone rounded-[10px] mt-[5px] mb-[5px] mr-[0] ml-[0] w-[150px] h-[100px] md:w-[200px] md:h-[100px]'>
           <div className='each flex items-center justify-start gap-[1px]'>
            <span><MdOutlineSpeed /></span>
            <h3 className='uppercase'>Wind Speed</h3>
           </div>
           <h1 className='text-center text-3xl'>{weatherConditions.windspeed}km/h</h1>
          </div>
          
       </div>
      </div>
      
      <div className=''>
        <h4 className='text-xm m-[5px]'>7-Day Forecast</h4>
        <div className='flex flex-col w-full g-[15px]'>
          {weeklyForecast.slice(0, 6).map((week) => (
          <div className='wkd flex items-center justify-between w-full h-[60px] pl-[10px] pr-[10px] rounded-[15px]'>
            <div>{getDay(week.datetime)}</div>
            <div className='wkdimg flex items-center'>
              <img src={`./Images/${week.icon}.png`} className='size-[30px]'/>
              <p>{week.conditions}</p>
            </div>
            <div>{week.temp}°</div>
          </div>
          ))}
        </div>
      </div>
      

    </div>
  );
}

export default Weather;