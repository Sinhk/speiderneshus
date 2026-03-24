"use client";

import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, parseISO, isBefore, startOfDay } from "date-fns";
import { nb } from "date-fns/locale";

interface BookedPeriod {
  id: number;
  start_date: string;
  end_date: string;
}

interface CalendarProps {
  bookedPeriods: BookedPeriod[];
  onDateRangeSelect: (start: Date, end: Date) => void;
}

function isDateBooked(date: Date, periods: BookedPeriod[]): boolean {
  const d = startOfDay(date);
  return periods.some((p) => {
    const start = startOfDay(parseISO(p.start_date));
    const end = startOfDay(parseISO(p.end_date));
    return d >= start && d <= end;
  });
}

export default function BookingCalendar({ bookedPeriods, onDateRangeSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectStart, setSelectStart] = useState<Date | null>(null);
  const [selectEnd, setSelectEnd] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get weekday offset (Monday = 0)
  const startWeekday = (monthStart.getDay() + 6) % 7;

  const today = startOfDay(new Date());

  function handleDayClick(day: Date) {
    if (isBefore(day, today)) return;
    if (isDateBooked(day, bookedPeriods)) return;

    if (!selectStart || (selectStart && selectEnd)) {
      setSelectStart(day);
      setSelectEnd(null);
    } else {
      if (isBefore(day, selectStart)) {
        setSelectStart(day);
        setSelectEnd(null);
      } else {
        setSelectEnd(day);
        onDateRangeSelect(selectStart, day);
      }
    }
  }

  function isInRange(day: Date): boolean {
    if (!selectStart || !selectEnd) return false;
    return day > selectStart && day < selectEnd;
  }

  function isSelected(day: Date): boolean {
    if (selectStart && isSameDay(day, selectStart)) return true;
    if (selectEnd && isSameDay(day, selectEnd)) return true;
    return false;
  }

  const weekdays = ["Ma", "Ti", "On", "To", "Fr", "Lø", "Sø"];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          aria-label="Forrige måned"
        >
          ←
        </button>
        <h3 className="font-semibold text-gray-800 capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: nb })}
        </h3>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          aria-label="Neste måned"
        >
          →
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {weekdays.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-medium text-gray-500 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for offset */}
        {Array.from({ length: startWeekday }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map((day) => {
          const booked = isDateBooked(day, bookedPeriods);
          const past = isBefore(day, today);
          const selected = isSelected(day);
          const inRange = isInRange(day);
          const todayMark = isToday(day);
          const sameMonth = isSameMonth(day, currentMonth);

          let cellClass =
            "relative aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors ";

          if (!sameMonth) {
            cellClass += "text-gray-300 cursor-default";
          } else if (booked) {
            cellClass += "bg-red-100 text-red-400 cursor-not-allowed line-through";
          } else if (past) {
            cellClass += "text-gray-300 cursor-not-allowed";
          } else if (selected) {
            cellClass += "bg-green-700 text-white font-bold";
          } else if (inRange) {
            cellClass += "bg-green-100 text-green-800";
          } else if (todayMark) {
            cellClass += "border-2 border-green-500 text-green-700 hover:bg-green-50";
          } else {
            cellClass += "text-gray-700 hover:bg-green-50";
          }

          return (
            <div
              key={day.toISOString()}
              className={cellClass}
              onClick={() => !booked && !past && sameMonth && handleDayClick(day)}
              title={booked ? "Opptatt" : ""}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-green-700"></div>
          <span>Valgt</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-green-100"></div>
          <span>Ditt valg</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-red-100"></div>
          <span>Opptatt</span>
        </div>
      </div>

      {selectStart && !selectEnd && (
        <p className="mt-3 text-sm text-green-700 font-medium">
          Valgt startdato: {format(selectStart, "d. MMMM yyyy", { locale: nb })}. Klikk på sluttdato.
        </p>
      )}
      {selectStart && selectEnd && (
        <p className="mt-3 text-sm text-green-700 font-medium">
          {format(selectStart, "d. MMMM", { locale: nb })} – {format(selectEnd, "d. MMMM yyyy", { locale: nb })}
        </p>
      )}
    </div>
  );
}
