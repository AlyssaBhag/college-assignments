> 📌 *Note: This repository contains only selected code sections to comply with academic integrity guidelines.*

# 📄 COBOL Employee Salary Report Program (Partial View)

## 🏫 Context

This COBOL program is part of an academic assignment at **Durham College**. Due to academic integrity guidelines, **only selected sections** of the source code are provided. The program demonstrates COBOL fundamentals including **file handling, salary calculations, employee classification, and report generation**.

## 📚 Overview

The program processes **employee data** from an input file and generates a **formatted salary report**. It handles each employee record by:

- Parsing employee information (ID, name, education, years of service, current salary)
- Determining **position levels** based on education and experience
- Calculating **salary increases** using position-specific rates
- Generating **detailed reports with averages and subtotals**
- Maintaining **page formatting and headers**

## 🛠 File Structure

### **(1)Environment&WorkingStorage.txt**
- Contains **environment division** setup
- Defines **file-control** entries for input/output
- Establishes **data division** with file descriptors
- Begins **working-storage** section with basic variables and headers

### **(2)WorkingStorage&DetailLine.txt**
- Defines **report column headings**
- Sets up **detail line layout** for employee records
- Contains **formatting elements** and spacing definitions
- Specifies **data display formats** (salary, percentages, etc.)

### **(3)PageCounter.txt**
- Implements **main page processing routine**
- Handles **page header printing**
- Controls **record processing per page**
- Manages **line counting and page breaks**

### **(4)Calculations.txt**
- Contains **graduate employee calculations**
  - Position determination based on years of service
  - Salary increase calculations
  - Counter updates for each position level
- Implements **non-graduate calculations**
  - Different position criteria
  - Specific increase rates
  - Position-based counter management

## 🧮 Processing Logic

### 📚 Graduate Processing
- **15+ years:** Analyst position (13.8% increase)
- **7-15 years:** Senior Programmer (10.3% increase)
- **2-7 years:** Programmer (7.7% increase)
- **<2 years:** Unclassified

### 🎓 Non-Graduate Processing
- **10+ years:** Programmer (7.7% increase)
- **4-10 years:** Junior Programmer (4.2% increase)
- **<4 years:** Unclassified

---
## 📁 Output File (`REPORT.OUT`)
The program generates a formatted report that includes:
- Employee records with name, number, years of service, and position
- Current salaries and calculated increases based on classification
- Page-by-page totals showing count of employees in each position
- Subtotal sections displaying distribution of position types
- Final summary with average salary increases across all positions