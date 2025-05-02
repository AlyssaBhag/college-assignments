
# 📄 COBOL Inventory Processing Program (Partial View)

## 🏫 Context

This COBOL program is part of an academic assignment at **Durham College**. Due to academic integrity guidelines and copyright restrictions, **only selected sections** of the source code are provided in this repository. This project is meant to demonstrate knowledge of COBOL fundamentals, including file handling, working-storage management, record formatting, conditional logic, and basic calculations.

## 📚 Overview

The program reads **inventory data** from an input file and generates a **formatted report** to an output file. It processes each item by:

- Parsing product fields (ID, class, description, quantity, unit price)
- Calculating extended prices
- Applying **discounts** based on product class and price thresholds
- Adding **transportation charges** based on specific rules for each product class
- Formatting a detailed output line for each product

This program is written in **COBOL**, using `fixed-length sequential files` for both input and output.

---

## 🛠 File Structure

- **ENVIRONMENT DIVISION**  
  Defines file assignments and access methods.

- **DATA DIVISION**  
  Structures the input and output record formats. The `input-line` is 27 characters; the `output-line` is 120 characters.

- **WORKING-STORAGE SECTION**  
  Stores constants, headings, formatting helpers, and temporary variables such as flags and calculated fields (e.g., extended price, transport cost).

- **PROCEDURE DIVISION**  
  Contains the core logic of the program, including:
  - Reading and processing input records.
  - Applying business rules such as **discount calculations** and **transportation charges**.
  - Formatting and writing output records for reporting.
  - Implementing control flow with structured conditional statements (`IF`, `PERFORM`, etc.).
---

## 🧮 Processing Logic

### 📦 Discount Calculation

Discounts are applied conditionally:
- **Class A and F**: Discount if the extended price exceeds a set threshold.
- **Class B**: Discount if quantity exceeds 100 units.
- **All Others**: No discount.

### 🚚 Transportation Charge

Transport costs are calculated based on product class:
- **Class A, D, F**: Assigned a specific percentage of the extended price.
- **Other classes**: Receive either a lower percentage or a flat fee depending on quantity.

These calculations are partially shown in the code through structured `IF` blocks with clear comments explaining intent, while the actual mathematical expressions are withheld.

