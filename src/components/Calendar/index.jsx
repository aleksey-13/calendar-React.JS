import React, { useState } from 'react'
import classnames from 'classnames'

import { getMonthData, areEqual } from './calendar'

import './index.css'

function Calendar(props) {
    const { 
        years,
        monthNames,
        weekDayNames,
        onChange,
    } = props

    let monthSelect;
    let yearSelect;

    const [ date, setDate ] = useState(props.date)
    const [ currDate, setCurrDate ] = useState(new Date())
    const [ selectedDate, setSelectedDate ] = useState(null)

    const { year, month, day } = {
        get year() {
            return date.getFullYear()
        },
        get month() {
            return date.getMonth()
        },
        get day() {
            return date.getDate()
        }
    }
    
    const monthData = getMonthData(year, month)

    const handlePrevMonthBtnClick = () => {
        const data = new Date(year, month - 1) 
        setDate(data)
    }

    const handleNextMonthBtnClick = () => {
        const data = new Date(year, month + 1) 
        setDate(data)
    }

    const handleSelectChande = () => {
        const year = yearSelect.value
        const month = monthSelect.value
        const data = new Date(year, month)

        setDate(data)
    }

    const handleDayClick = data => {
        setSelectedDate(data)
        onChange(data)
    }

    return (
        <div className="calendar">
            <header>
                <button onClick={handlePrevMonthBtnClick}>{'<'}</button>
                <select 
                    ref={element => monthSelect = element }
                    onChange={handleSelectChande}
                    value={month}
                >
                    {monthNames.map((month, id) => <option key={month} value={id}>{month}</option>)}
                </select>
                <select 
                    ref={element => yearSelect = element }
                    onChange={handleSelectChande}
                    value={year}
                >
                    {years.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
                <button onClick={handleNextMonthBtnClick}>{'>'}</button>
            </header>
            <table>
                <thead>
                    <tr>
                        {weekDayNames.map(day => <th key={day}>{day}</th>)}
                    </tr>
                </thead>

                <tbody>
                    {monthData.map((week, index) => 
                        <tr key={index} className="week">
                            {week.map((d, idx) => d ?
                                <td 
                                    key={idx} 
                                    className={classnames('day', {
                                        'today': areEqual(d, currDate),
                                        'selected': areEqual(d, selectedDate)
                                    })} 
                                    onClick={() => handleDayClick(d)}>{d.getDate()}</td> 
                                :
                                <td key={idx} />
                            )}
                        </tr>    
                    )}
                </tbody>
            </table>
        </div>
    )
}

Calendar.defaultProps = {
    date: new Date(),
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт' , 'Пт', 'Сб', 'Вс'],
    onChange: Function.prototype
}

export default Calendar