// Author: Alyssa Bhagwandin
// Created: November 28th, 2024
// Description: The subclass for echoJournal.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace EchoJournal
{
    [Serializable]
    public class DrawingLogEntry : LogEntry
    {
        public static int countDrawingFile = 0;

        public static int Count { get { return countDrawingFile; } }
        public static DateTime FirstEntryDate { get { return firstEntry; } }
        public static DateTime NewestEntryDate { get { return newestEntry; } }


        /// <summary>
        /// Default constructor.
        /// </summary>
        public DrawingLogEntry()
        {
            // Initialize properties with default values
            Wellness = 1;
            Quality = 1;
            EntryDate = DateTime.Now;
            Id = countDrawingFile++;
        }


        /// <summary>
        ///  Parameterized Constructor.
        /// </summary>
        public DrawingLogEntry(int wellness, int quality)
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
            Id = count;
            count += 1;
            

        }
    }
}
