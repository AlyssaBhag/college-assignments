// Author: Alyssa Bhagwandin
// Original Creator: Kyle Chapman (This code was provided in our assignment folder... I made a minor change).
// Created: October 21st, 2024
// Updated: November 1st, 2024
// Description: Records audio using the default recording device, into a file in a default directory (relative to
// where this file is stored). Just two functions: StartRecording() and EndRecording(). This class adapts and utilizes
// code from Darin Dimitrov @ https://stackoverflow.com/a/3694293 .


using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace EchoJournal
{
    internal static class RecordWav
    {
        // This part is entirely from Darin Dimitrov @ https://stackoverflow.com/a/3694293 .
        [DllImport("winmm.dll", EntryPoint = "mciSendStringA", CharSet = CharSet.Ansi, SetLastError = true, ExactSpelling = true)]
        private static extern int mciSendString(string lpstrCommand, string lpstrReturnString, int uReturnLength, int hwndCallback);

        /// <summary>
        /// Begins a .wav file recording using winmm.dll .
        /// </summary>
        internal static void StartRecording()
        {
            mciSendString("open new Type waveaudio Alias recsound", "", 0, 0);
            mciSendString("record recsound", "", 0, 0);
        }

        /// <summary>
        /// Ends a started .wav file recording using winmm.dll .
        /// </summary>
        /// <returns>A FileInfo object pointing to the resulting .wav file.</returns>
        /// 
        /// I, Alyssa, changed this part with the help of the source...
        /// https://www.tutorialspoint.com/chash-program-to-get-the-name-of-the-file-from-the-absolute-path#:~:text=file%20as%20output.-,The%20absolute%20path%20which%20is%20being%20used%20as%20an%20input,method%20of%20the%20path%20class.

        internal static FileInfo EndRecording()
        {
            string directoryPath = @"C:\Users\admin\source\repos\EchoJournal\Audio\PlayBacks\";

            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            // I changed this part too! 
            // https://stackoverflow.com/questions/1078003/how-would-you-make-a-unique-filename-by-adding-a-number
            
            // This will deal with the file name so it doesnt keep overwriting the files.
            string fileName = directoryPath + "\\Recording" + "" + DateTime.Now.ToString("yyyyMMdd") + ".wav";

            int fileCounter = 0;
            while (File.Exists(fileName))
            {
                fileName = directoryPath + "\\Recording" + DateTime.Now.ToString("yyyyMMdd") + "_" + fileCounter.ToString("D2") + ".wav";
                fileCounter++;
            }

            mciSendString("save recsound " + fileName, "", 0, 0);
            mciSendString("close recsound ", "", 0, 0);

            FileInfo returnFile = new FileInfo(fileName);
            return returnFile;
        }
    }
}

// Notes....
// After completeing this directory thingy I realized its supposed to overwrite.... oops.


// This is for me in the future please ignore :)
// https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings