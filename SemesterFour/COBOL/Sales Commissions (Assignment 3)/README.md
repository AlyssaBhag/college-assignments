> 📌 *Note: This repository contains only selected code sections to comply with academic integrity guidelines.*


# 📄 COBOL Sales Commission Program (Partial View)

## 🏫 Context

This COBOL program is part of an academic assignment at **Durham College**. Due to academic integrity guidelines and copyright restrictions, **only selected sections** of the source code are provided. This project demonstrates COBOL fundamentals including **file handling, commission calculations, bonus processing, and report generation**.

---

## 📚 Overview

The program processes **sales data** from an input file and generates a **formatted commission report**. It handles each salesperson’s record by:

- Parsing fields (ID, name, sales amount, commission rates, thresholds)
- Calculating **commissions and bonuses**
- Applying **minimum and maximum thresholds**
- Tracking **performance metrics**
- Generating a **detailed report with summaries**

---

## 🛠 File Structure

### **Environment&WorkingStorage.txt**
- Defines **file assignments and access methods**
- Sets up **input/output file structures**
- Establishes **core variables and constants**
- Contains **program initialization settings**

### **WorkingStorage&DetailLine.txt**
- Defines **report formatting variables**
- Structures the **detail lines** for each salesperson
- Sets up **bonus tracking** variables
- Contains **report headers and column definitions**

### **PageProcessing.txt**
- Manages **page layout and formatting**
- Controls **report pagination**
- Handles **heading printing logic**
- Maintains **line and page counters**

### **Calculations.txt**
- Implements **commission calculation logic**
- Processes **bonus eligibility and amounts**
- Applies **minimum/maximum thresholds**
- Calculates **summary statistics and percentages**

---

## 🧮 Processing Logic

- **Sales Data Parsing:** Extracts fields (ID, name, sales amount, commission rates, thresholds) from input records.
- **Commission Calculation:** Applies rate-based formulas to determine earnings while enforcing minimum/maximum thresholds.
- **Bonus Eligibility & Processing:** Evaluates performance criteria and adjusts compensation accordingly.
- **Performance Metrics Tracking:** Records individual statistics for analysis and reporting.
- **Report Formatting & Generation:** Structures multi-page output with dynamic headers and detailed salesperson breakdowns.
- **Summary Computation:** Aggregates sales figures, percentages, and comparative statistics for final reporting.

---

## 📁 Output File (`REPORT.OUT`)
The final report provides a structured summary of sales commissions with properly formatted, aligned output.  

**Includes:**  
- **Salesperson Details:** ID and name  
- **Earnings Breakdown:** Sales amount, commission rate, calculated earnings  
- **Threshold Enforcement:** Minimum and maximum payout limits  
- **Bonus Status:** Qualification for performance-based bonuses  
- **Summary Metrics:** Total sales, commissions paid, and key percentages  
