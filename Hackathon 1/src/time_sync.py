def calculate_time_differences(clock_times, grand_clock_time="15:00"):
    """
    Calculate the time differences in minutes between the given clock times and the Grand Clock Tower time.

    Parameters:
    clock_times (list of str): A list of clock times in 24-hour format (e.g., ["14:45", "15:05", "15:00", "14:40"]).
    grand_clock_time (str): The time of the Grand Clock Tower in 24-hour format (default is "15:00").

    Returns:
    list of int: An array of integers representing the time differences in minutes.
                  Positive values indicate the clock is ahead, and negative values indicate it's behind.
    """
    from datetime import datetime

    grand_clock_dt = datetime.strptime(grand_clock_time, "%H:%M")
    time_differences = []

    for clock_time in clock_times:
        clock_dt = datetime.strptime(clock_time, "%H:%M")
        difference = (clock_dt - grand_clock_dt).total_seconds() / 60
        time_differences.append(int(difference))

    return time_differences