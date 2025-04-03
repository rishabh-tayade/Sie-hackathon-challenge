# File: /tempora/tempora/src/app.py

from time_sync import calculate_time_differences

def main():
    grand_clock_time = "15:00"
    clock_times = ["14:45", "15:05", "15:00", "14:40"]
    
    time_differences = calculate_time_differences(clock_times, grand_clock_time)
    
    print("Time differences (in minutes):", time_differences)

if __name__ == "__main__":
    main()