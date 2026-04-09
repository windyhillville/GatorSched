from datetime import date, datetime, time, timedelta


def format_time_label(t: time) -> str:
    if t.minute == 0:
        return t.strftime("%I %p").lstrip("0")
    return t.strftime("%I:%M %p").lstrip("0")


def format_time_range(start: time, end: time) -> str:
    return f"{format_time_label(start)} - {format_time_label(end)}"


# NOTE: keeping just in case we revert back to Monday as the start of a week
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


def day_index(d: date) -> int:
    # Converts Python weekday to Sunday first index
    return (d.weekday() + 1) % 7


def get_day_key(d: date) -> str:
    return d.strftime("%a")


def get_short_day_label(d: date) -> str:
    # NOTE: If we'd prefer 3-letter names (Mon, Tue, Wed, etc.), then we can use -> return d.strftime("%a")

    di = day_index(d)
    short_labels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    return short_labels[di]


def get_long_day_label(d: date) -> str:
    return d.strftime("%A")


def get_sunday_week_bounds(d: date) -> tuple[date, date]:
    days_since_sunday = day_index(d)
    start_of_week = d - timedelta(days=days_since_sunday)
    end_of_week = start_of_week + timedelta(days=6)
    return start_of_week, end_of_week


def format_short_date(d: date) -> str:
    return d.strftime("%m/%d/%y")


def format_week_label(start: date, end: date) -> str:
    return f"{format_short_date(start)} - {format_short_date(end)}"
