# 📄 COBOL Inventory Processing Program (Partial View)

## 🏫 Context

This COBOL program is part of an academic assignment at **Durham College**. Due to academic integrity guidelines and copyright restrictions, **only selected sections** of the source code are provided in this repository. This project demonstrates COBOL fundamentals, including **file handling, working-storage management, record formatting, conditional logic, and calculations**.

## 📚 Overview

The program processes **inventory data** from an input file and generates a **formatted report** in an output file (`REPORT.OUT`). It handles each item by:
- Parsing product fields (ID, class, description, quantity, unit price).
- Calculating **extended prices**.
- Applying **discounts** based on product class and price thresholds.
- Adding **transportation charges** based on specific rules for each product class.
- Formatting and writing a **detailed output line** for reporting.

This program is written in **COBOL**, utilizing **fixed-length sequential files** for input and output.

---

## 🛠 File Structure

### **ENVIRONMENT_WORKINGSTORAGE.txt**
Defines **file assignments** and access methods. Establishes how input and output files are linked to the program, ensuring smooth data processing.

### **WORKINGSTORAGE-DETAILLINE.txt**
Structures the **data format** for inventory records. Defines variables and storage areas used to format the output line, ensuring consistency across reports.

### **CALCULATE_EXTENDEDPRICES_AND_DISCOUNTS.txt**
Handles **price calculations and discounts**:
- Computes **extended prices** based on unit price and quantity.
- Applies **discounts** for specific product classes.
- Stores necessary computed values before generating the output.

### **TRANSPORTATIONCHARGES.txt**
Processes **transportation costs**:
- Calculates **shipping fees** based on product class and quantity.
- Applies different cost structures depending on business rules.
- Ensures accurate transport fee representation in the final report.

### **REPORT.OUT**
The final **formatted report** containing the processed inventory data:
- Displays detailed product information, including **price calculations, discounts, and transportation charges**.
- Uses structured output formatting for easy readability.
- Serves as the final data presentation for analysis.

---

## 🧮 Processing Logic

### 📦 Discount Calculation
Discounts are conditionally applied:
- **Class A and F**: Discount if the extended price exceeds a set threshold.
- **Class B**: Discount if quantity exceeds 100 units.
- **All Others**: No discount.

### 🚚 Transportation Charge
Transport costs vary by product class:
- **Class A, D, F**: Assigned a percentage of the extended price.
- **Other classes**: Receive either a lower percentage or a flat fee based on quantity.

These calculations are detailed through structured `IF` blocks with clear documentation.
