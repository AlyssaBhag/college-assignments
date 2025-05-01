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

    ///// <summary>
    ///// The audio class.
    ///// </summary>
    [Serializable]
    public class AudioLogEntry : LogEntry
    {
        // Initilzed the audio count.
        public static int countAudioFile = 0;
        public static DateTime firstEntryTextAudio;
        public static DateTime newestEntryTextAudio;

        // This classes specific definition.
        protected internal FileInfo RecordingFile { get; set; }
        public string Notes { get; set; }

        // Static properties to access the total number of Audio LogEntry objects.
        public static int Count { get { return countAudioFile; } }
        public static DateTime FirstEntryDate { get { return firstEntry; } }
        public static DateTime NewestEntryDate { get { return newestEntry; } }

        /// <summary>
        /// Default constructor.
        /// </summary>
        public AudioLogEntry()
        {
            RecordingFile = null;
            Notes = "This file sucks lol";
            
        }

        /// <summary>
        /// Parameterized constructor.
        /// </summary>
        public AudioLogEntry(int wellness, int quality, string notes, FileInfo recordingFile)
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
            Notes = notes;
            firstEntry = DateTime.Now;
            Id = count;
            RecordingFile = recordingFile;
            count += 1;


        }
    }
}
