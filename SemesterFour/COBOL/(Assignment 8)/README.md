# 📊 COBOL Data Split & Count Processing System

## 🏫 Context
This COBOL program is part of an academic assignment at **Durham College**. The program demonstrates advanced COBOL concepts including **transaction processing, tax calculations, store performance tracking,** and **detailed report generation**. It showcases skills in **file handling, data validation,** and **formatted output generation**.

## 📚 Overview
The program handles transaction records by:
- Processing **sales and layaway** transactions
- Calculating **13% tax** on transactions
- Tracking **store-specific** performance
- Analyzing **payment methods** (CA/CR/DB)
- Generating **detailed reports** with summaries

## 🛠 File Structure

### **(1)Environment&WorkingStorage.txt**
- Defines **file handling** configuration
- Establishes **record layouts**
- Sets up **working storage** variables
- Manages **page control** settings

### **(2)Filter&ProcessRecords.txt**
- Implements **transaction processing**
- Handles **tax calculations**
- Manages **store totals**
- Controls **report generation**

## 🧮 Processing Logic

### 📊 Data Processing
- **Transaction Types:** Sales (S) and Layaway (L)
- **Payment Methods:** Cash, Credit, Debit
- **Store Analysis:** Individual store performance
- **Tax Handling:** 13% calculation and tracking
- **Total Accumulation:** Running totals by category

### 📈 Report Generation
- **Store Summaries:** Individual store performance
- **Payment Analysis:** Method distribution
- **Tax Calculations:** By transaction type
- **Performance Metrics:** Store rankings
- **Transaction Totals:** Comprehensive analysis

---
## 📁 Output Report (`REPORT.OUT`)
The program generates a 100-character width report including:
- Transaction details and totals
- Store-by-store analysis
- Payment method distribution
- Tax calculations and summaries
- Performance rankings and statistics
