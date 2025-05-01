// Author: Alyssa Bhagwandin
// Created: November 28th, 2024
// Description: The subclass for echoJournal.

using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Windows;
using System.Xml.Serialization;


namespace EchoJournal
{
    /// <summary>
    /// This is the class for the XML stuff.
    /// </summary>
    internal class XMLFileManager : DataPersistence
    {

        /// <summary>
        /// Save a list of LogEntry objects to an XML file.
        /// </summary>
        public void SaveMultiMuse(List<LogEntry> fileSave, string filePath)
        {
            try
            {
                // Ensure the directory exists
                EnsureDirectoryExists(filePath);

                // Define the base file name and file extension
                string baseFileName = "LogEntries_";
                string fileExtension = ".xml";

                // Generate the next available file name
                int fileCounter = 1;
                string nextFilePath;

                do
                {
                    nextFilePath = Path.Combine(filePath, $"{baseFileName}{fileCounter}{fileExtension}");
                    fileCounter++;
                } while (File.Exists(nextFilePath));

                // Create an XmlSerializer for List<LogEntry> and its derived types
                var writer = new XmlSerializer(typeof(List<LogEntry>), new[] { typeof(TextLogEntry), typeof(AudioLogEntry), typeof(DrawingLogEntry) });

                // Create or overwrite the file
                using (FileStream fileStream = File.Create(filePath))
                {
                    // Serialize the List<LogEntry> to the file stream
                    writer.Serialize(fileStream, fileSave);
                }

                MessageBox.Show("Data saved successfully to XML!");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error saving to XML file: {ex.Message}");
            }
        }


        /// <summary>
        /// Load a list of LogEntry objects from an XML file.
        /// </summary>
        public List<LogEntry> ReadMultiMuse(string filePath)
        {
            if (!File.Exists(filePath))
                return new List<LogEntry>(); // Return an empty list if the file doesn't exist.

            try
            {
                // Create an XmlSerializer for List<LogEntry> and its derived types
                var read = new XmlSerializer(typeof(List<LogEntry>), new[] { typeof(TextLogEntry), typeof(AudioLogEntry), typeof(DrawingLogEntry) });

                // Read the file and deserialize it
                using (StreamReader reader = new StreamReader(filePath))
                {
                    return (List<LogEntry>)read.Deserialize(reader);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading from XML file: {ex.Message}");
                return new List<LogEntry>();
            }
        }

        /// <summary>
        /// Ensure the directory exists before saving
        /// </summary>
        private void EnsureDirectoryExists(string filePath)
        {
            // Get the directory portion of the filePath
            string directoryPath = Path.GetDirectoryName(filePath);

            // Ensure the directory exists
            if (!string.IsNullOrEmpty(directoryPath) && !Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }
        }


    }
}

