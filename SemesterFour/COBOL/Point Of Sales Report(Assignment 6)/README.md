> 📌 *Note: This repository demonstrates COBOL validation techniques and error reporting for point-of-sale transactions.*

# 📄 COBOL Point of Sales Validation System

## 🏫 Context

This COBOL program is part of an academic assignment at **Durham College**. The program showcases advanced COBOL concepts including **input validation, error tracking, multi-level reporting,** and **structured file processing**.

## 📚 Overview

The program processes **point-of-sale transactions** from an input file and generates a **detailed error report**. It handles each transaction by:

- Validating multiple fields against business rules
- Tracking different types of validation errors
- Separating valid and invalid transactions
- Generating comprehensive error reports
- Maintaining statistical summaries

## 🛠 File Structure

### **(1)Environment&InputValidationStructure.txt**
- Defines **file control** entries
- Establishes **record layouts**
- Implements **validation rules**
- Sets up **core data structures**

### **(2)ErrorMessages.txt**
- Contains **error message definitions**
- Defines **error tracking variables**
- Manages **error counters**
- Implements **message formatting**

### **(3)ProcessingLoop.txt**
- Handles **main processing flow**
- Controls **record validation**
- Manages **file routing**
- Updates **statistical counters**

### **(4)ErrorMessageValidation.txt**
- Implements **validation logic**
- Processes **error detection**
- Maintains **error flags**
- Tracks **error occurrences**

### **(5)Output&Summary.txt**
- Generates **formatted reports**
- Produces **error summaries**
- Maintains **page control**
- Creates **statistical totals**

## 🧮 Validation Rules

### 📝 Transaction Details
- **Transaction Code:** Must be S, L, or R
- **Transaction Amount:** Must be numeric
- **Payment Type:** Must be CA, CR, or DB
- **Store Number:** Must be 01-05 or 12

### 🔢 Invoice Format
- **First Character:** Must be A-E
- **Second Character:** Must be A-E (different from first)
- **Separator:** Must include hyphen
- **Number Range:** 100000-900000
- **SKU Code:** Cannot be empty

## 📊 Error Tracking

The program tracks ten distinct error types:
1. Invalid Transaction Code
2. Non-numeric Amount
3. Invalid Payment Type
4. Invalid Store Number
5. Invalid Invoice Format
6. Incorrect Invoice Prefix
7. Duplicate Invoice Prefixes
8. Invalid Number Range
9. Missing Hyphen
10. Empty SKU Code

---

## 📁 Output Files
The program generates three output files:
- **REPORT.OUT:** Detailed error report with statistics
- **VALID.DAT:** Valid transaction records
- **INVALID.DAT:** Invalid transaction records

### 📊 Report Format
- Transaction details with error messages
- Page headers and formatting
- Running error counts
- Final statistical summary
- Individual error type totals
