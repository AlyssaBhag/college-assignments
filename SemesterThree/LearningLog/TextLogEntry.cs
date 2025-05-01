// Author: Alyssa Bhagwandin
// Created: November 28th, 2024
// Description: The subclass for echoJournal.

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EchoJournal
{
    /// <summary>
    /// The child class from LogEntry called TextLogEntry.
    /// </summary>


    [Serializable]
    public class TextLogEntry : LogEntry
    {
        public static int countTextFile = 0;

        // Initilizing. 
        public string Text { get; set; }

        public static int Count { get { return countTextFile; } }
        public static DateTime FirstEntryDate { get { return firstEntry; } }
        public static DateTime NewestEntryDate { get { return newestEntry; } }
        

        /// <summary>
        /// Default Constructor.
        /// </summary>
        public TextLogEntry() 
        {
            Text = string.Empty;
        }
        /// <summary>
        /// Parameterized Constructor.
        /// </summary>
        public TextLogEntry(int wellness, int quality, string text)
        {
            // If it's the first entry, set the first entry date. 
            if (count == 0)
            {
                firstEntry = FirstEntryDate;
            }

            // Always update newestEntry to the lastest entry's date.
            newestEntry = DateTime.Now;
            Wellness = wellness;
            Quality = quality;
            firstEntry = DateTime.Now;
            Text = text;
            Id = count;
            count += 1;

        }
    }
}
