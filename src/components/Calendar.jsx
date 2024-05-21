import { useState } from 'react';
import dayjs from 'dayjs';
import { useGenerateDate } from '../hooks/use-generate-date';
import { cn } from '../utils/utils';
import { GrNext, GrPrevious } from 'react-icons/gr';

const Calendar = () => {
  const { generateDates, arrayOfDays, arrayOfMonths } = useGenerateDate();
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  console.log(selectedDate);

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="font-semibold">
            {arrayOfMonths[today.month()]}, {today.year()}
          </div>
          <div className="flex items-center justify-center gap-4">
            <GrPrevious
              className="text-sm cursor-pointer"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <span
              className="cursor-pointer"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </span>
            <GrNext
              className="text-sm cursor-pointer"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="h-12 grid grid-cols-7 text-sm text-gray-500 font-semibold">
          {arrayOfDays.map((day, index) => (
            <div
              key={index}
              className="h-12 w-full flex items-center justify-center"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {generateDates(today.month(), today.year()).map((dateObj, index) => {
            const { date, currentMonth, today } = dateObj;

            return (
              <div
                key={index}
                className="h-12 w-full flex items-center justify-center border-t"
              >
                <span
                  className={cn(
                    currentMonth ? '' : 'text-gray-400',
                    today
                      ? 'bg-red-500 text-white hover:bg-red-600 hover:text-white'
                      : '',
                    selectedDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                      ? 'bg-slate-800 text-white/90'
                      : '',
                    'w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-900 hover:text-white transition-all cursor-pointer'
                  )}
                  onClick={() => {
                    setSelectedDate(date);
                  }}
                >
                  {date.date()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4">{selectedDate.toDate().toDateString()}</div>
    </>
  );
};

export default Calendar;
