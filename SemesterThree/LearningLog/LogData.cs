// Author: Alyssa Bhagwandin
// Created: November 28th, 2024
// Description: The subclass for echoJournal.

using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace EchoJournal
{
    internal class LogData 
    {
        // Managers for XML and JSON file handling
        private readonly XMLFileManager xmlFileManager;
        private readonly JSONFileManager jsonFileManager;

        // Directories for saving XML and JSON files
        private const string XmlDirectory = @"DataFiles\XML";
        private const string JsonDirectory = @"DataFiles\JSON";

        // Stores the file path of the currently loaded file
        private string loadedFilePath = string.Empty;

        /// <summary>
        /// Constructor initializes file managers for XML and JSON handling.
        /// </summary>
        public LogData()
        {
            xmlFileManager = new XMLFileManager();
            jsonFileManager = new JSONFileManager();
        }

        /// <summary>
        /// Saves entries to both XML and JSON files. Creates new files if directories or files don't already exist.
        /// </summary>
        public void SaveEntries(List<LogEntry> entries)
        {
            // Check if there are entries to save.
            if (!entries.Any() || entries.Count == 0)
            {
                MessageBox.Show("No entries left to save. File will not be created.", "Info", MessageBoxButton.OK);
                return;
            }

            try
            {
                // Ensure the XML directory exists, then generate a unique file name and save entries.
                EnsureDirectoryExists(XmlDirectory);
                string xmlFilePath = GetNextFileName(XmlDirectory, "LogEntries_", ".xml");
                xmlFileManager.SaveMultiMuse(entries, xmlFilePath);

                // Ensure the JSON directory exists, then generate a unique file name and save entries.
                EnsureDirectoryExists(JsonDirectory);
                string jsonFilePath = GetNextFileName(JsonDirectory, "LogEntries_", ".json");
                jsonFileManager.SaveMultiMuse(entries, jsonFilePath);
                

            }
            catch (IOException ioEx)
            {
                MessageBox.Show($"File in use or inaccessible: {ioEx.Message}", "File Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error saving entries: {ex.Message}", "Save Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }


        /// <summary>
        /// Loads log entries from an XML or JSON file, removing duplicates, if any.
        /// </summary>
        /// <returns>A list of loaded log entries.</returns>
        public List<LogEntry> LoadEntries()
        {
            var entries = new List<LogEntry>();

            OpenFileDialog openFileDialog = new OpenFileDialog
            {
                Filter = "XML Files (*.xml)|*.xml|JSON Files (*.json)|*.json|All Files (*.*)|*.*",
                Title = "Select a File to Load"
            };

            if (openFileDialog.ShowDialog() == true)
            {
                loadedFilePath = openFileDialog.FileName; // Save the file path

                try
                {
                    if (loadedFilePath.EndsWith(".xml", StringComparison.OrdinalIgnoreCase))
                    {
                        entries.AddRange(xmlFileManager.ReadMultiMuse(loadedFilePath));
                    }
                    else if (loadedFilePath.EndsWith(".json", StringComparison.OrdinalIgnoreCase))
                    {
                        entries.AddRange(jsonFileManager.ReadMultiMuse(loadedFilePath));
                    }
                    else
                    {
                        MessageBox.Show("Unsupported file type. Please select an XML or JSON file.", "File Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Error loading file: {ex.Message}", "Load Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                }
            }
            else
            {
                MessageBox.Show("No file selected.", "Load Cancelled", MessageBoxButton.OK, MessageBoxImage.Information);
            }

            return entries;
        }

        /// <summary>
        /// Deletes a specific log entry from the list and updates the saved files.
        /// </summary>
        public void DeleteEntry(LogEntry entryToDelete, List<LogEntry> entries)
        {
            if (entries.Remove(entryToDelete))
            {
                MessageBox.Show($"Entry with ID {entryToDelete.Id} deleted.", "Delete Successful", MessageBoxButton.OK);


                // Save the updated list
                SaveEntries(entries);
            }
            else
            {
                MessageBox.Show("Entry not found.", "Delete Error", MessageBoxButton.OK);
            }
        }

        /// <summary>
        /// Ensures that the specified directory exists, creating it if necessary.
        /// </summary>
        private void EnsureDirectoryExists(string directoryPath)
        {
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }
        }

        /// <summary>
        /// Generates file name in the directory with incrementing numbers.
        /// </summary>
        private string GetNextFileName(string directoryPath, string baseFileName, string fileExtension)
        {
            int fileCounter = 1;
            string filePath;
            do
            {
                filePath = Path.Combine(directoryPath, $"{baseFileName}{fileCounter}{fileExtension}");
                fileCounter++;
            } while (File.Exists(filePath));

            return filePath;
        }

        /// <summary>
        ///  Checks for the file (or at least should but im unsure if its working as intended). Retrieves the latest file in the directory based on creation time and file extension.
        /// </summary>
        private string GetLatestFile(string directoryPath, string extension)
        {
            if (!Directory.Exists(directoryPath))
                return null;

            return Directory.EnumerateFiles(directoryPath, $"*{extension}")
                            .OrderByDescending(File.GetCreationTime)
                            .FirstOrDefault();
        }
    }

}


