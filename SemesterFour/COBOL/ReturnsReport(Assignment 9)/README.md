# 📊 COBOL Returns Processing System

## 🏫 Context 
This COBOL program is part of an academic assignment at **Durham College**. The program demonstrates advanced COBOL concepts including **returns processing, tax calculations, store-specific tracking,** and **detailed report generation**. It showcases skills in **file handling, data validation,** and **formatted output generation**.

## 📚 Overview
The program processes return transaction records by:
- Processing **return (R)** transactions
- Calculating **13% tax** on returns
- Tracking **store-specific** return volumes
- Analyzing **payment methods** (CA/CR/DB)
- Generating **detailed return reports**

## 🛠 File Structure

### **(1)Environment&WorkingStorage.txt**
- Defines **file handling** configuration
- Establishes **record layouts**
- Sets up **working storage** variables
- Manages **page control** settings

### **(2)ReturnsProcessingRecords.txt**
- Implements **returns processing**
- Handles **tax calculations**
- Manages **store totals**
- Controls **report generation**

## 🧮 Processing Logic

### 📊 Data Processing Features
- **Return Types:** Returns (R) transactions only
- **Payment Methods:** Cash, Credit, Debit tracking
- **Store Analysis:** Individual store return metrics
- **Tax Handling:** 13% calculation and tracking

---

## 📁 Output Report (`REPORT.OUT`)
The program generates a 100-character width report including:
- Header with date and page number
- Return transactions listing with store numbers and tax
- Store totals showing return counts and amounts
- Grand totals: 15 returns totaling $609.87
- Total tax collected: $79.17
