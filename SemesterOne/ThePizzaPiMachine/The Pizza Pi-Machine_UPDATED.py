# The pizza pi-machine.py
# Author: Alyssa Bhagwandin
# Created: November 27th, 2023
# Modified: December 1st, 2023

# Description: The expected output for this program is to present the user with a GUI display window that will calculate and determine the appropriate number
# of pizza slices to cut for the specific pizza size, and calculate the area of the individual pizza slices.

# Import tkinter, hovertip tool, pi, and window.
from tkinter import *
from idlelib.tooltip import Hovertip
import math
window = Tk()


# Declarations:
 
# Pizza size range.
MINIMUM_RANGE = 6
SECOND_RANGE = 8
THIRD_RANGE = 12
FORTH_RANGE = 14
FIFTH_RANGE = 16
SIXTH_RANGE = 20
MAXIMUM_RANGE = 36
# Pizza slices.
MINIMUM_RANGE_AMOUNT = 4
SECOND_RANGE_AMOUNT = 6
THIRD_SLICE_AMOUNT = 8
FORTH_RANGE_AMOUNT = 10
FIFTH_RANGE_AMOUNT = 12
SIXTH_SLICE_AMOUNT = 16
# Window size.
WINDOW_WIDTH = 735
WINDOW_HEIGHT = 180
WINDOW_MINIMUM_WIDTH = 665
WINDOW_MINIMUM_HEIGHT = 180

# Window configuration:

# Window style.
window.geometry(f"{WINDOW_WIDTH}x{WINDOW_HEIGHT}")
window.minsize(width = WINDOW_MINIMUM_WIDTH, height = WINDOW_MINIMUM_HEIGHT)
window.title("SliceMaster3000: The Pizza Pi-Machine")
# Window scaling.
window.rowconfigure(0, weight = 1)
window.rowconfigure(1, weight = 1)
window.rowconfigure(2, weight = 1)
window.rowconfigure(3, weight = 1)
window.rowconfigure(4, weight = 1)
window.columnconfigure(0, weight = 1)
window.columnconfigure(1, weight = 1)
window.columnconfigure(2, weight = 1)

# Calculations:

# A function that reads the users input (vaildates it) and decides what to do from there. Also a call function for the slices and the area.
def calculate(_event = None):
    try:
        diameter = float(entry_radius.get())
        if MINIMUM_RANGE <= diameter and MAXIMUM_RANGE >= diameter:
           slices = calculate_slices(diameter)
           area = calculate_area(diameter, slices)
           label_slices.configure(text = f" A pizza that is {diameter}\"  is cut into {slices} slices.")
           label_area.configure(text =f" Each slice has an area of {area:.2f}\" squared.")
           label_error_message.configure(text = "")
        else:
            label_error_message.configure(text = "ERROR: Diameter must be between " + str(SECOND_RANGE_AMOUNT) + " and " + str(MAXIMUM_RANGE)  + " inches.")
    except ValueError:
        label_error_message.configure(text = "ERROR: Please enter a numeric diameter.")

# Determine the amount slices dependent on the users input.
def calculate_slices(diameter):
    if MINIMUM_RANGE <= diameter < SECOND_RANGE:
        return MINIMUM_RANGE_AMOUNT
    elif SECOND_RANGE <= diameter < THIRD_RANGE:
        return SECOND_RANGE_AMOUNT
    elif THIRD_RANGE <= diameter < FORTH_RANGE:
        return THIRD_SLICE_AMOUNT
    elif FORTH_RANGE <= FIFTH_RANGE:
        return FORTH_RANGE_AMOUNT
    elif FIFTH_RANGE <= diameter < SIXTH_RANGE:
        return FIFTH_RANGE_AMOUNT
    else:
        return MAXIMUM_RANGE

# Area calculation (using the area formula).
def calculate_area(diameter, slice_amount):
    slice_area = (math.pi * (diameter / 2) ** 2) / slice_amount
    return slice_area
    
# Reset function:

def reset(_event = None):
    entry_radius.delete(0, END)
    label_slices.configure(text = "Number of slices: ")
    label_area.configure(text = "Area of the pizza: ")
    label_error_message.configure(text = "")
    entry_radius.focus()

# Grid layout/Create widgets:

# Row 0 widgets.
label_radius = Label(window, text = "Enter pizza size (" + str(SECOND_RANGE_AMOUNT) + " to " + str(MAXIMUM_RANGE)  + " inches):")
label_radius.grid(row = 0, column = 0, padx = 5, pady = 5, sticky = W)
entry_radius = Entry(window, width = 50)
entry_radius.grid(row = 0, column = 1, columnspan = 3, padx = 5, pady = 5, sticky = N)

# Row 1 widgets.
label_slices = Label(window, text = "Number of slices: ")
label_slices.grid(row = 1, column = 0, padx =12, pady = 5, sticky = W)
label_area = Label(window, text = "Area of the pizza: ")
label_area.grid(row = 1, column = 1, padx = 5, pady = 5, sticky = E)

# Row 2 widgets.
label_error_message = Label(window, text =())
label_error_message.grid(row = 2, column = 0, padx = 12, pady = 5, sticky = S)

# Row 3 widgets.
button_calculate = Button(text = "Calculate", underline = 0, height = 2, width = 16, command = calculate)
button_calculate.grid(row = 3, column = 0, padx = 50, pady = 2, sticky = W)
button_reset = Button(text = "Clear", underline = 0, height = 2, width = 16, command = reset)
button_reset.grid(row = 3, column = 2, padx = 50, pady = 2, sticky = W)

# Row 4 widgets.
button_exit = Button(text = "Exit", underline = 0, height = 2, width = 10, command = window.destroy)
button_exit.grid(row = 4, column = 1, padx = 40, pady = 5, sticky = S)

# Hover tips:

button_calculate.tip = Hovertip(button_calculate, text = "Click to calculate GUI")
button_exit.tip = Hovertip(button_exit, text = "Click to close the program")
button_reset.tip = Hovertip(button_reset, text = "Click to clear GUI")
label_slices.tip = Hovertip(label_slices, text = "Displays the amount of pizza slices")
label_area.tip = Hovertip(label_area, text = "Displays the area of a single slice of pizza")
entry_radius.tip = Hovertip(entry_radius, text = "Enter a pizza size from " + str(SECOND_RANGE_AMOUNT) + " - " + str(MAXIMUM_RANGE)  + " inches")

# Hotkeys:

window.bind("<Alt-c>", calculate)
window.bind("<Alt-q>", exit)
window.bind("<Escape>", reset)

# Start the program:

window.mainloop()
