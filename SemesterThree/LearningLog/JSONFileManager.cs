// Author: Alyssa Bhagwandin
// Created: November 28th, 2024
// Description: The subclass for echoJournal.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.IO;
using System.Text.Json.Serialization;



    namespace EchoJournal
    {
        /// <summary>
        /// This is the JSON file stuff.
        /// </summary>
        internal class JSONFileManager : DataPersistence
        {
            /// <summary>
            /// Save a list of LogEntry objects to a JSON file.
            /// </summary>
            public void SaveMultiMuse(List<LogEntry> fileSave, string filePath)
            {
                try
                {

                // Ensure the directory exists
                EnsureDirectoryExists(filePath);

                // Define the base file name and file extension
                string baseFileName = "LogEntries_";
                string fileExtension = ".json";

                // Generate the next available file name
                int fileCounter = 1;
                string nextFilePath;

                do
                {
                    nextFilePath = Path.Combine(filePath, $"{baseFileName}{fileCounter}{fileExtension}");
                    fileCounter++;
                } while (File.Exists(nextFilePath));

                // Serialize the list of LogEntry objects to JSON
                var options = new JsonSerializerOptions
                {
                    WriteIndented = true,
                    // For handling enums if needed
                    Converters = { new JsonStringEnumConverter() }
                };

                // Serialize the list of LogEntry objects to JSON.
                string jsonString = JsonSerializer.Serialize(fileSave, new JsonSerializerOptions { WriteIndented = true });
                    // Write the JSON string to a file.
                File.WriteAllText(filePath, jsonString);

                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Error saving to JSON file: {ex.Message}");
                }
            }

            /// <summary>
            /// Load a list of LogEntry objects from a JSON file.
            /// </summary>
        public List<LogEntry> ReadMultiMuse(string filePath)
        {
            if (!File.Exists(filePath))
                // Return an empty list if the file doesn't exist.
                return new List<LogEntry>();

            try
            {
                // Read the JSON string from the file.
                string jsonString = File.ReadAllText(filePath);
                // Deserialize the JSON string into a list of LogEntry objects.
                return JsonSerializer.Deserialize<List<LogEntry>>(jsonString) ?? new List<LogEntry>();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading from JSON file: {ex.Message}");
                return new List<LogEntry>();
            }
        }

        /// <summary>
        /// Ensure the directory exists before saving.
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





