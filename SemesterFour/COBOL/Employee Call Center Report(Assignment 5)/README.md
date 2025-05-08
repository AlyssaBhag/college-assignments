> 📌 *Note: This repository demonstrates COBOL array handling and report generation techniques for call center data analysis.*

# 📄 COBOL Call Center Volume Report Generator

## 🏫 Context

This COBOL program is part of an academic assignment at **Durham College**. The program showcases advanced COBOL concepts including **array handling, data accumulation, performance metrics calculation,** and **formatted report generation**.

## 📚 Overview

The program processes **call center data** from an input file and generates a **comprehensive performance report**. It handles each operator record by:

- Processing **12 months** of call volume data per operator
- Calculating **monthly and individual averages**
- Identifying **high and low performing operators**
- Tracking **zero-call months and operators**
- Maintaining **precise formatting and alignment**

## 🛠 File Structure

### **(1)Environment&WorkingStorage.txt**
- Contains **environment division** configuration
- Defines **sequential file handling** setup
- Establishes **input/output record layouts**
- Begins **working-storage** with core variables

### **(2)WorkingStorage&DetailLine.txt**
- Defines **report column structures**
- Sets up **detail line layouts** for monthly data
- Implements **array-based data formatting**
- Manages **spacing and alignment controls**

### **(3)ArrayStructure.txt**
- Implements **core array definitions**
- Contains **table processing logic**
- Handles **data accumulation routines**
- Manages **calculation arrays**

## 🧮 Processing Logic

### 📊 Array Processing
- **Input Array:** 12 months of call data per operator
- **Working Storage:** Monthly totals and operator counts
- **Output Arrays:** Formatted display tables
- **Calculation Arrays:** Running totals and averages

### 📈 Performance Metrics
- **Monthly Averages:** Per operator performance tracking
- **Zero-Call Detection:** Identifies inactive periods
- **High/Low Analysis:** Tracks performance extremes
- **Overall Totals:** Comprehensive volume analysis

---
## 📁 Output File (`REPORT.OUT`)
The program generates a detailed report including:
- Operator records with ID and name
- Monthly call volumes (Jul-Jun)
- Individual operator totals and averages
- Performance statistics and rankings
- Zero-call operator identification
- Monthly volume distribution analysis
- Comprehensive call center metrics
