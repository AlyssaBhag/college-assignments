// Author: Alyssa Bhagwandin
// Created: October 21st, 2024
// Updated: November 30th, 2024
// Description: The getter and setter class for my learning journal.

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EchoJournal
{
    /// <summary>
    /// This is the base class for the LogEntries.
    /// </summary>
    [Serializable]
    public class LogEntry
    {
        // Initilize the count to start at 0
        public static int count = 0;
        public static DateTime firstEntry;
        public static DateTime newestEntry;


        // Definitions for the class.
        public int Id { get; set; }
        public DateTime EntryDate { get; set; }
        public int Wellness { get; set; }
        public int Quality { get; set; }
        public string Name { get; set; }

       
        /// <summary>
        /// Default constructor.
        /// </summary>
        public LogEntry()
        {

            Wellness = 1;
            Quality = 3;
            EntryDate = DateTime.Now;
            Name = "Maxon";
        }
    }
}
