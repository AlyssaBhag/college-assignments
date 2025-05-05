> 📌 *Note: This repository contains only selected code sections to comply with academic integrity guidelines.*

# 📄 COBOL Inventory Processing Program (Partial View)

## 🏫 Context

This project is part of a **Durham College** COBOL programming assignment. In alignment with academic integrity policies, this repository includes **only non-executable code snippets** that demonstrate understanding of key COBOL structures such as **file control, data declarations, report formatting, arithmetic logic, and procedural flow**.

## 📚 Overview

The COBOL program is designed to **read product data** from a sequential file and **generate a structured report** in another file. The process includes:
- Parsing fields like **product number, class, description, quantity, and price**.
- Calculating **extended prices**.
- Applying **conditional discounts**.
- Determining **transportation charges** by class.
- Formatting report lines for clean output presentation.

These segments reflect classic procedural COBOL principles and emphasize **structured data processing**.

---

## 🛠 File Structure

### **EnvironmentAndFileControl.txt**
Sets up the **input and output file connections** in the ENVIRONMENT DIVISION:
- Assigns logical file names (`INFILE`, `OUTFILE`).
- Specifies that files are **sequential**.
- Declares **recording modes and fixed-length formats**.

### **WorkingStorageAndHeadings.txt**
Includes elements of the WORKING-STORAGE SECTION:
- Defines a **report heading** with name alignment and section ID.
- Stores **column headings** (e.g., `Item #`, `QTY`, `Unit Price`, etc.).
- Structures a **detail line layout** for formatted output, including pricing with commas and decimals.

### **ExtendedPriceAndDiscounts.txt**
Contains the **procedure logic** to:
- Compute **extended price** = quantity × unit price.
- Apply **discounts** based on business rules:
  - **Class A or F**: Discount applied if price threshold is exceeded.
  - **Class B**: Discount if quantity exceeds 100.
  - Other classes: No discount.

### **TransportationCharges.txt**
Handles the **transportation fee logic**, which varies by product class:
- **Class A**: Higher transport rate.
- **Class D**: Moderate rate.
- **Class F**: Different transport percentage.
- **Other classes**: Flat or reduced rate based on quantity.

Each logic block uses **nested `IF` statements** and conditional checks to implement business-specific rules.

---

## 🧮 Processing Logic

### 📦 Discount Rules
- **Class A or F**: Apply a discount if the extended price exceeds a threshold.
- **Class B**: Discount is applied if quantity > 100.
- **Other Classes**: No discount; a counter tracks non-discounted items.

### 🚚 Transportation Fee Calculation
- Based on **product class** and occasionally **quantity**.
- **Classes A, D, F** use **percentages of extended price**.
- **Others** use **lower percentages or flat fees** for large orders.

---

## 📁 Output File (`REPORT.OUT`)
The final report includes:
- Product number and description.
- Quantity, unit price, extended price.
- Discounted amounts (if applicable).
- Transportation fees.
- Properly formatted rows (fixed-width, aligned output).
