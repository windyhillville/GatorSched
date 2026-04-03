from datetime import date, datetime, time, timedelta


def format_time_label(t: time) -> str:
    if t.minute == 0:
        return t.strftime("%I %p").lstrip("0")
    return t.strftime("%I:%M %p").lstrip("0")


def format_time_range(start: time, end: time) -> str:
    return f"{format_time_label(start)} - {format_time_label(end)}"


def get_week_bounds(start_date: date) -> tuple[date, date]:
    start_of_week = start_date - timedelta(days=start_date.weekday())
    end_of_week = start_of_week + timedelta(days=6)

    return start_of_week, end_of_week


def get_shift_duration_hours(start_time: time, end_time: time) -> float:
    start_date = datetime.combine(date.min, start_time)
    end_date = datetime.combine(date.min, end_time)

    if end_date < start_date:
        end_date += timedelta(days=1)

    return (end_date - start_date).total_seconds() / 3600
