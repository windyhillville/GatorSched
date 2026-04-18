from datetime import date, time

from gatorsched_api.services.datetime_formatting import (
    format_short_date,
    format_time_label,
    format_time_range,
    format_week_label,
    get_shift_duration_hours,
    get_sunday_week_bounds,
)


def test_format_timelabel_on_the_hour():
    assert format_time_label(time(9, 0)) == "9 AM"
    assert format_time_label(time(14, 0)) == "2 PM"
    assert format_time_label(time(12, 0)) == "12 PM"


def test_format_time_label_with_minutes():
    assert format_time_label(time(9, 15)) == "9:15 AM"
    assert format_time_label(time(14, 30)) == "2:30 PM"


def test_format_time_range():
    assert format_time_range(time(9, 0), time(17, 0)) == "9 AM - 5 PM"
    assert format_time_range(time(6, 0), time(14, 0)) == "6 AM - 2 PM"


def test_get_shift_duration_hours_standard():
    assert get_shift_duration_hours(time(9, 0), time(17, 0)) == 8.0
    assert get_shift_duration_hours(time(6, 0), time(13, 0)) == 7.0


def test_get_duration_hours_overnight():
    assert get_shift_duration_hours(time(22, 0), time(6, 0)) == 8.0


def test_get_sunday_week_bounds_from_sunday():
    start, end = get_sunday_week_bounds(date(2026, 4, 12))  # Sunday, April 12th
    assert start == date(2026, 4, 12)
    assert end == date(2026, 4, 18)


def test_get_sunday_week_bounds_from_wednesday():
    start, end = get_sunday_week_bounds(date(2026, 4, 15))  # Wednesday, April 15th
    assert start == date(2026, 4, 12)
    assert end == date(2026, 4, 18)


def test_format_short_date():
    assert format_short_date(date(2026, 4, 12)) == "04/12/26"
    assert format_short_date(date(2026, 12, 25)) == "12/25/26"


def test_format_week_label():
    assert format_week_label(date(2026, 4, 12), date(2026, 4, 18)) == "04/12/26 - 04/18/26"
