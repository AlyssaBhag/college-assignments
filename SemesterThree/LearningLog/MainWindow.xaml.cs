// Author: Alyssa Bhagwandin
// Created: October 21st, 2024
// Updated: November 30th, 2024
// Description: The main code for my Echo Journal (learning log) that has all of the main functionality for the program.

using EchoJournal;
using Microsoft.Win32;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Media;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
// DataScore
// refesh

namespace EchoJournal 
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        // Tracks if a recording is in progress.
        private bool isRecording = false;
        // Tracks if the recording is currently playing.
        private bool isPlaying = false;
        // Links the file info to a variable called currentRecording.
        private FileInfo currentRecording;

        // Decalring stuff for the drawing application mostly given by Kyle Chapman.
        private bool isDrawing;
        private bool isErasing;
        private Point previousPoint;
        private Brush colour = Brushes.Black;
        private int thickness = 2;
        // Declaring the file number.
        private int numberAudio;
        private int numberDraw;
        private int numberText;
        // The logs.
        private AudioLogEntry audioLogEntry;
        private TextLogEntry TextLogEntry;
        private DrawingLogEntry DrawingLogEntry;

        // For the store stuff.
        static string filePath = "Details.txt";
        // List thats stores the LogEntry objects.
        private List<LogEntry> entryInfoList;

        // Added for the data persistence stuff.
        private XMLFileManager xmlPersistence;
        private JSONFileManager jsonPersistence;

        // XML and JSON file paths
        private const string XmlFilePath = "LogEntries.xml";
        private const string JsonFilePath = "LogEntries.json";

        //private IDataPersistence dataPersistence;

        private LogData logData;


        public MainWindow()
        {
            InitializeComponent();
            // Load entries at startup 

            // Ititalized the list.
            entryInfoList = new List<LogEntry>();
            //// Clears the list after each time.
            //entryInfoList.Clear();
            // Disable the buttons when the program starts.
            buttonPlay.IsEnabled = false;
            buttonDeleteAudio.IsEnabled = false;
            buttonSaveAudio.IsEnabled = false;

            numberAudio = 0;
            numberDraw = 0;
            numberText = 0;

            // Added for the data persistence.
            xmlPersistence = new XMLFileManager();
            jsonPersistence = new JSONFileManager();

            logData = new LogData();
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /// <summary>
        /// Logic for the record button.
        /// </summary>
        private void ButtonRecord_Click(object sender, RoutedEventArgs e)
        {
            // MessageBox.Show($"Button clicked! Current recording state: {isRecording}"); // Debug line

            if (!isRecording)
            {
                // Start using the class for recording (RecordWav.cs).
                RecordWav.StartRecording();
                // Recording in progress.
                isRecording = true;
                // Means the recording in in progress and to stop it you press again.
                labelRecordText.Content = "Stop";
                // Update the status bar.
                statusState.Content = "Recording in progress...";
                // Keep buttons disabled untill the recording stops.
                buttonPlay.IsEnabled = false;
                buttonDeleteAudio.IsEnabled = false;
                buttonSaveAudio.IsEnabled = false;
            }
            else
            {
                // Stops the recording and saves the file using the RecordWav.cs.
                currentRecording = RecordWav.EndRecording();
                // Sets it to stop recording.
                isRecording = !isRecording;
                // Then the button still says record because nothing in process.
                labelRecordText.Content = "Record";
                // Status to say something is in progress.
                statusState.Content = "Recording stopped.";
                // Enable the buttons once the recoding was stopped.
                buttonPlay.IsEnabled = true;
                buttonDeleteAudio.IsEnabled = true;
                buttonSaveAudio.IsEnabled = true;
            }
        }
        /// <summary>
        /// Logic for the play button.
        /// </summary>
        private void ButtonPlay_Click(object sender, RoutedEventArgs e)
        {
            SoundPlayer audio = new SoundPlayer(currentRecording.FullName);
            if (!isPlaying)
            {
                // If something is not being played once you click the play button it plays it then updates the statuses.
                audio.Play();
                // Update Status.
                statusState.Content = "Playing back recording...";
                labelPlayText.Content = "Stop";
            }
            else
            {
                audio.Stop();
                // Update Status for the stop.
                statusState.Content = "Playback stopped.";
                labelPlayText.Content = "Play";
            }
            // Switches the variable to display nothing is playing anymore.
            isPlaying = !isPlaying;
        }
        /// <summary>
        /// Logic for the delete button.
        /// </summary>
        private void ButtonDeleteAudio_Click(object sender, RoutedEventArgs e)
        {
            // If something is there, it deletes and then clears everything again.
            if (currentRecording.Exists == true)
            {
                currentRecording.Delete();
                currentRecording = null;
                buttonPlay.IsEnabled = false;
                buttonDeleteAudio.IsEnabled = false;
                buttonSaveAudio.IsEnabled = false;
                // Status.
                statusState.Content = "Recording deleted.";
            }
            else
            {
                statusState.Content = "No recording found to delete.";
            }
        }

        /// <summary>
        /// Logic for the save button.
        /// </summary>
        private void ButtonSaveAudio_Click(object sender, RoutedEventArgs e)
        {
            if (currentRecording != null)
            {

                // Added this so I can define the folder it goes to
                string directoryPath = @"../../Audio\";

                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                // Retreives the selected rating from the combo boxes.
                int wellness = comboWellnessSliderAudio.SelectedIndex + 1;
                int quality = comboQualitySliderAudio.SelectedIndex + 1;
                // Gets the text from the notes TextBox. 
                string notes = textNotes.Text;
                //Inititalzes the "ID" variable.
                int Id = 0;

                // Creates and fileinfo objects for the current recording.
                FileInfo recordingFile = new FileInfo(currentRecording.FullName);

                // Check if an audio entry is selected for editing
                if (LogListView.SelectedItem is AudioLogEntry audioEntryToEdit)
                {
                    // Update the existing AudioLogEntry with the new values
                    audioEntryToEdit.Wellness = wellness;
                    audioEntryToEdit.Quality = quality;
                    audioEntryToEdit.Notes = notes;
                    audioEntryToEdit.RecordingFile = recordingFile;

                    // Refresh the LogListView to show the updated entry
                    UpdateLogListView();
                    MessageBox.Show("Audio entry updated successfully!", "Update Complete", MessageBoxButton.OK);
                }
                else
                {
                    // Makes a new entry and displays what is in the .txt file.
                    AudioLogEntry newEntry = new AudioLogEntry(wellness, quality, notes, recordingFile);

                    //MessageBox.Show($"{entryInfo[0].EntryDate}" + $"{entryInfo[0].Id}"); // Debug line

                    // This gives the information to the list.
                    entryInfoList.Add(newEntry);
                    // The items get added to the logListView(newEntry)
                    LogListView.Items.Add(newEntry);

                    // Displays the values the users enter. Its set to true to append.
                    using (StreamWriter writer = new StreamWriter(directoryPath + "Recording_Details.txt", true))
                    {
                        writer.WriteLine($"{"\n Today's Date: " + newEntry.EntryDate}," +
                            $"{"\n Wellness Level: " + newEntry.Wellness}," +
                            $"{"\n Quality Level: " + newEntry.Quality}," +
                            $"{"\n Notes: " + newEntry.Notes}," +
                            $"{"\n Location: " + newEntry.RecordingFile}");
                    }

                    audioLogEntry = newEntry;

                    // Initialize file name and counter
                    ++numberAudio;

                    // Clear the form for a new entry.
                    comboWellnessSliderAudio.SelectedIndex = -1;
                    comboQualitySliderAudio.SelectedIndex = -1;
                    textNotes.Clear();
                    buttonRecord.IsEnabled = true;
                    buttonPlay.IsEnabled = false;
                    buttonDeleteAudio.IsEnabled = false;
                    buttonSaveAudio.IsEnabled = false;

                    statusState.Content = "Entry successful saved!";
                }
            }
            else
            {
                statusState.Content = "No recording found to save.";
            }
            
        }

        /// <summary>
        /// This was made for the updating function. Its supports the save button in the list view to update the file once it has been edited.
        /// I made it two diffrent functions cuz it was confusing and it was easier to split it into two.
        /// </summary>
        private void SaveEntriesToFile()
        {
            // Define the folder path for saving audio entries
            string directoryPath = @"../../Audio\";

            // Ensure the directory exists
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            // Save the entries from entryInfoList to a text file
            using (StreamWriter writer = new StreamWriter(directoryPath + "Recording_Details.txt", false)) // false means overwrite
            {
                foreach (var entry in entryInfoList)
                {
                    if (entry is AudioLogEntry audioEntry)
                    {
                        writer.WriteLine($"{"\n Today's Date: " + audioEntry.EntryDate}," +
                                         $"{"\n Wellness Level: " + audioEntry.Wellness}," +
                                         $"{"\n Quality Level: " + audioEntry.Quality}," +
                                         $"{"\n Notes: " + audioEntry.Notes}," +
                                         $"{"\n Location: " + audioEntry.RecordingFile}");
                    }
                   
                }
            }
        }

        // End of the recording stuff.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /// <summary>
        /// Logic for the text entry area.
        /// </summary>

        // Functions for the save button (text tab).
        private void ButtonSaveText_Click(object sender, RoutedEventArgs e)
        {
            if (textEntry != null)
            {

                // Added this so I can define the folder it goes to
                string directoryPath = @"../../Texts\";

                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                // Retrieve the selected ratings and text content
                int wellness = comboWellnessSliderText.SelectedIndex + 1;
                int quality = comboQualitySliderText.SelectedIndex + 1;
                string text = textEntry.Text;

                // Check if the user is editing an existing entry
                if (LogListView.SelectedItem is TextLogEntry textEntryToEdit)
                {
                    // Overwrite the existing entry's properties
                    textEntryToEdit.Wellness = wellness;
                    textEntryToEdit.Quality = quality;
                    textEntryToEdit.Text = text;

                    // Refresh the LogListView to reflect the changes
                    UpdateLogListView();
                    MessageBox.Show("Text entry updated successfully!", "Update Complete", MessageBoxButton.OK);
                }
                else
                {

                    // Initialize file name and counter
                    int textCounter = 0;


                    string fileName = directoryPath + "\\Text" + textCounter.ToString("D2") + ".txt";

                    // Check if the file exists and increment the counter if necessary
                    while (File.Exists(fileName))
                    {
                        fileName = directoryPath + "\\Text" + textCounter.ToString("D2") + ".txt";
                        ++textCounter;
                    }

                    // Retreives the selected rating from the combo boxes.
                    wellness = comboWellnessSliderText.SelectedIndex + 1;
                    quality = comboQualitySliderText.SelectedIndex + 1;
                    // Gets the text from the notes TextBox. 
                    text = textEntry.Text;
                    //Inititalzes the "ID" variable.
                    int Id = 0;

                    // Makes a new entry and displays what is in the .txt file.
                    TextLogEntry newEntry = new TextLogEntry(wellness, quality, text);

                    // This gives the information to the list.
                    entryInfoList.Add(newEntry);
                    // The items get added to the logListView(newEntry)
                    LogListView.Items.Add(newEntry);

                    // Displays the values the users enter. Its set to true to append.
                    using (StreamWriter writer = new StreamWriter(directoryPath + "Text_Details.txt", true))
                    {
                        writer.WriteLine($"{"\n Today's Date: " + newEntry.EntryDate}," +
                        $"{"\n Wellness Level: " + newEntry.Wellness}," +
                        $"{"\n Quality Level: " + newEntry.Quality}," +
                        $"{"\n Text: " + newEntry.Text}," +
                        $"{"\n Id Number: " + newEntry.Id},");
                    }

                    TextLogEntry = newEntry;

                    // Initialize file name and counter
                    ++numberText;

                    // Reset the area.
                    textEntry.Clear();
                    comboWellnessSliderText.SelectedIndex = -1;
                    comboQualitySliderText.SelectedIndex = -1;


                }
                statusState.Content = "Text saved successfully!";
            }
        }

        /// <summary>
        ///  This button deals with the deletion of the text stuff.
        /// </summary>
        private void ButtonDeleteText_Click(object sender, RoutedEventArgs e)
        {
            textEntry.Clear();
            comboWellnessSliderText.SelectedIndex = -1;
            comboQualitySliderText.SelectedIndex = -1;
            statusState.Content = "Text deleted!";
        }

        //End of the text stuff.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /// <summary>
        /// Logic for the drawing entry area.
        /// </summary>

        // This is Kyle Chapman's Code from github but I change small formats.
        // https://github.com/KyleChapman/CoscPaint/blob/master/MainWindow.xaml.cs
        private void ButtonSaveDraw_Click(object sender, RoutedEventArgs e)
        {

            try
            {

                if (canvasDraw != null)
                {

                    // Added this so I can define the folder it goes to
                    string directoryPath = @"../../Drawings\";

                    if (!Directory.Exists(directoryPath))
                    {
                        Directory.CreateDirectory(directoryPath);
                    }

                    // Retrieve the selected ratings
                    int wellness = comboWellnessSliderDraw.SelectedIndex + 1;
                    int quality = comboQualitySliderDraw.SelectedIndex + 1;

                    if (LogListView.SelectedItem is DrawingLogEntry drawingEntryToEdit)
                    {
                        // Overwrite the existing entry's properties
                        drawingEntryToEdit.Wellness = wellness;
                        drawingEntryToEdit.Quality = quality;

                        // Refresh the LogListView
                        UpdateLogListView();
                        MessageBox.Show("Drawing entry updated successfully!", "Update Complete", MessageBoxButton.OK);
                    }
                    else
                    {


                        // Initialize file name and counter
                        int drawingCounter = 0;
                        ++drawingCounter;
                        string fileName = directoryPath + "\\Drawing" + drawingCounter.ToString("D2") + ".png";


                        // Retreives the selected rating from the combo boxes.
                        wellness = comboWellnessSliderDraw.SelectedIndex + 1;
                        quality = comboQualitySliderDraw.SelectedIndex + 1;
                        //Inititalzes the "ID" variable.
                        int Id = 0;

                        // Makes a new entry and displays what is in the .txt file.
                        DrawingLogEntry newEntry = new DrawingLogEntry(wellness, quality);

                        // This gives the information to the list.
                        entryInfoList.Add(newEntry);
                        // The items get added to the logListView(newEntry)
                        LogListView.Items.Add(newEntry);

                        // Displays the values the users enter. Its set to true to append.
                        using (StreamWriter writer = new StreamWriter(directoryPath + "Drawing_Details.txt", true))
                        {
                            writer.WriteLine($"{"\n Today's Date: " + newEntry.EntryDate}," +
                                $"{"\n Wellness Level: " + newEntry.Wellness}," +
                                $"{"\n Quality Level: " + newEntry.Quality}," +
                                $"{"\n ID Number: " + newEntry.Id}," +
                                $"{"\n Location: " + fileName}");
                        }

                        //
                        DrawingLogEntry = newEntry;


                        // Clear the form for a new entry.
                        comboWellnessSliderAudio.SelectedIndex = -1;
                        comboQualitySliderAudio.SelectedIndex = -1;
                        canvasDraw.Children.Clear();


                        // Check if the file exists and increment the counter if necessary
                        while (File.Exists(fileName))
                        {
                            // Initialize file name and counter
                            drawingCounter++;
                            fileName = directoryPath + "\\Drawing" + drawingCounter.ToString("D2") + ".png";
                        }
                        numberDraw++;

                        RenderTargetBitmap renderBitmap = new RenderTargetBitmap(
                            (int)canvasDraw.ActualWidth,
                            (int)canvasDraw.ActualHeight,
                            96d,
                            96d,
                            PixelFormats.Pbgra32);

                        renderBitmap.Render(canvasDraw);

                        PngBitmapEncoder encoder = new PngBitmapEncoder();
                        encoder.Frames.Add(BitmapFrame.Create(renderBitmap));

                        using (var fileStream = new System.IO.FileStream(fileName, System.IO.FileMode.Create))
                        {
                            encoder.Save(fileStream);
                        }

                        statusState.Content = "Drawing saved successfully!";
                    }
                }
            }
            catch (Exception ex)
            {
                statusState.Content = $"Error saving drawing: {ex.Message}";
            }
            
        }
        /// <summary>
        /// Functions for the delete button (delete tab).
        /// </summary>
        private void ButtonDeleteDraw_Click(object sender, RoutedEventArgs e)
        {
            canvasDraw.Children.Clear();
            statusState.Content = "Drawing deleted successfully!";
            buttonSaveDraw.IsEnabled = false;
        }

        /// <summary>
        ///  Function for how to start the drawing and what happens.
        /// </summary>
        private void StartDrawing_Click(object sender, RoutedEventArgs e)
        {
            isDrawing = true;
            isErasing = false;
            statusState.Content = "Lets Draw!";
            buttonSaveDraw.IsEnabled = true;
        }

        /// <summary>
        /// Handle the "Erase" button click.
        /// </summary>
        private void StartEraseDrawing_Click(object sender, RoutedEventArgs e)
        {
            // Disable drawing mode.
            isDrawing = false;
            // Set the mode to erasing.
            isErasing = true;
            statusState.Content = "Oops you made a mistake :(";
        }

        /// <summary>
        /// Start drawing when the mouse button is pressed.
        /// </summary>
        private void BeginDrawing(object sender, MouseButtonEventArgs e)
        {
            if (isDrawing && e.LeftButton == MouseButtonState.Pressed)
            {
                previousPoint = e.GetPosition(canvasDraw);
            }
        }

        /// <summary>
        /// When the mouse moves on the canvas, if the left mouse button is depressed, draw based on current settings.
        /// Handle mouse movement on the canvas.
        /// </summary>
        private void MouseOnCanvas(object sender, MouseEventArgs e)
        {
            if (e.LeftButton == MouseButtonState.Pressed)
            {

                if (isDrawing)
                {

                    Point currentPoint = e.GetPosition(canvasDraw);
                    Line line = new Line
                    {
                        Stroke = colour,
                        StrokeThickness = thickness,
                        X1 = previousPoint.X,
                        Y1 = previousPoint.Y,
                        X2 = currentPoint.X,
                        Y2 = currentPoint.Y
                    };

                    canvasDraw.Children.Add(line);
                    previousPoint = currentPoint;

                }
                    
            }
            else if (isErasing)
            {
                Point erasePoint = e.GetPosition(canvasDraw);
                EraseAtPoint(erasePoint);
            }
        }

        /// <summary>
        ///  Part of how it knows how to erase and where, bare with me it is alot.
        /// </summary>
        private void EraseAtPoint(Point erasePoint)
        {
            // This involved alot of googling
            // https://www.codeproject.com/Articles/811495/Simple-Paint-Application-in-Csharp

            // Iterate through all elements on the canvas, starting from the last.
            for (int i = canvasDraw.Children.Count - 1; i >= 0; i--)
            {
                // Remove the line if the erasePoint matches any endpoint of the line.
                if (canvasDraw.Children[i] is Line line)
                {
                    // Check if the erase point is near either endpoint of the line.
                    if (IsPointNearLine(erasePoint, line))
                    {
                        // Remove the line from the canvas if the erasePoint is close to it.
                        canvasDraw.Children.RemoveAt(i);
                    }
                }
            }
        }

        /// <summary>
        /// This is where I get a headache. LOTS OF MATH for a DRAWING APP. Regardless we push forward....
        /// Checks if a point is near a line.
        /// </summary>
        private bool IsPointNearLine(Point point, Line line)
        {
            // How close the point must be to the line to erase it.
            // Define the tolerance value (which is the maximum distance allowed).
            const double tolerance = 5.0; 
            // Calculate the distance between the point and line segemnt.
            double distance = PointToLineDistance(point, new Point(line.X1, line.Y1), new Point(line.X2, line.Y2));
            // Return true if the distance is within tolerance.
            return distance <= tolerance;
        }

        // Calculate the distance from a point to a line segment.
        private double PointToLineDistance(Point point, Point lineStart, Point lineEnd)
        {
            // Compute the vector from the line's start point to the given point.
            // This displays the math that took me a bit to understand : https://paulbourke.net/geometry/pointlineplane/Helpers.cs Another example: https://www.geeksforgeeks.org/minimum-distance-from-a-point-to-the-line-segment-using-vectors/
            double a = point.X - lineStart.X;
            double b = point.Y - lineStart.Y;
            double c = lineEnd.X - lineStart.X;
            double d = lineEnd.Y - lineStart.Y;

            double dot = a * c + b * d;
            double lenSq = c * c + d * d;
            double param = (lenSq != 0) ? dot / lenSq : -1;

            double xx, yy;

            if (param < 0)
            {
                xx = lineStart.X;
                yy = lineStart.Y;
            }
            else if (param > 1)
            {
                xx = lineEnd.X;
                yy = lineEnd.Y;
            }
            else
            {
                xx = lineStart.X + param * c;
                yy = lineStart.Y + param * d;
            }

            double dx = point.X - xx;
            double dy = point.Y - yy;
            return System.Math.Sqrt(dx * dx + dy * dy);
        }

        //End of the drawing stuff.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /// <summary>
        /// Logic for when the tab changes.
        /// This is for the tab changing (summary tab for now). This also does the list stuff.
        /// </summary>
        private void SummaryTabChange(object sender, RoutedEventArgs e)
        {
            numberOfEntryAudioTextBox.Text = numberAudio.ToString();
            if (numberAudio > 0)
            {
                firstEntryAudioTextBox.Text = AudioLogEntry.FirstEntryDate.ToString("MM/dd/yyyy");
                newestEntryAudioTextBox.Text = AudioLogEntry.NewestEntryDate.ToString("MM/dd/yyyy");
            }
            else
            {
                firstEntryAudioTextBox.Text = "N/A";
                newestEntryAudioTextBox.Text = "N/A";
            }

            numberOfEntryDrawingTextBox.Text = numberDraw.ToString();
            if (numberDraw > 0)
            {
                firstEntryDrawingTextBox.Text = DrawingLogEntry.FirstEntryDate.ToString("MM/dd/yyyy");
                newestEntryDrawingTextBox.Text = DrawingLogEntry.NewestEntryDate.ToString("MM/dd/yyyy");
            }
            else
            {
                firstEntryDrawingTextBox.Text = "N/A";
                newestEntryDrawingTextBox.Text = "N/A";
            }

            numberOfEntryTextTextBox.Text = numberText.ToString();
            if (numberText > 0)
            {
                firstEntryTextTextBox.Text = TextLogEntry.FirstEntryDate.ToString("MM/dd/yyyy");
                newestEntryTextTextBox.Text = TextLogEntry.NewestEntryDate.ToString("MM/dd/yyyy");
            }
            else
            {
                firstEntryTextTextBox.Text = "N/A";
                newestEntryTextTextBox.Text = "N/A";
            }
        }


        // End of the summary/list stuff?
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /// <summary>
        /// This is all the menu tab stuff.
        /// </summary>


        /// <summary>
        /// This is for the new tab.
        /// </summary>
        private void NewFile_Click(object sender, EventArgs e)
        {
            MessageBox.Show("This doesnt work but i was tried to and it didnt work </3 ");
            statusState.Content = "New File created! (Not really but if it was it would say this if it did.)";
        }

        /// <summary>
        /// This is for the open tab.
        /// </summary>
        private void OpenFile_Click(object sender, EventArgs e)
        {
            MessageBox.Show("This doesnt work but i was tried to and it didnt work </3 ");
            statusState.Content = "Opened File! (Not really but if it was it would say this if it did.)";
        }

        /// <summary>
        /// This is for the save tab.
        /// </summary>
        private void SaveFile_Click(object sender, EventArgs e)
        {
            MessageBox.Show("This doesnt work but i was tried to and it didnt work </3 ");
            statusState.Content = "New file saved! (Not really but if it was it would say this if it did.)";
        }

        /// <summary>
        /// This is for the exut tab.
        /// </summary>
        private void ExitFile_Click(object sender, EventArgs e)
        {
            // Allow the user to cancel the operation by picking "no".
            if (MessageBox.Show("Are you sure you want to close the program?", "You sure?", MessageBoxButton.YesNo) == MessageBoxResult.No)
            {
                
            }
            else
            {
                Close();
            }
        }

        /// <summary>
        /// This is for the cut tab.
        /// </summary>
        private void CutEdit_Click(object sender, EventArgs e)
        {
            if (tabAudio.IsSelected)
            {
                textNotes.Cut();
                statusState.Content = "Audio text cut!";
            }
            if (textTab.IsSelected)
            {
                textEntry.Cut();
                statusState.Content = "Text's text cut!";
            }
            if (drawTab.IsSelected)
            {
                canvasDraw.Children.Clear();
                statusState.Content = "Drawing cut!(Not really...)";
            }
        }

        /// <summary>
        /// This is for the copy tab.
        /// </summary>
        private void CopyEdit_Click(object sender, EventArgs e)
        {


            if (tabAudio.IsSelected)
            {
                textNotes.Copy();
                statusState.Content = "Audio text copied!";
            }
            if (textTab.IsSelected)
            {
                textEntry.Copy();
                statusState.Content = "Text's text copied!";
            }
            if (drawTab.IsSelected)
            {
                if (canvasDraw.Children.Count > 0)
                {
                    // Render the canvas as an image
                    RenderTargetBitmap renderBitmap = new RenderTargetBitmap(
                        (int)canvasDraw.ActualWidth,
                        (int)canvasDraw.ActualHeight,
                        96d, 96d, PixelFormats.Pbgra32);

                    renderBitmap.Render(canvasDraw);

                    // Copy the image to the clipboard
                    Clipboard.SetImage(renderBitmap);
                    statusState.Content = "Copied!";
                }
                else
                {
                    statusState.Content = "You have nothing to copy.";

                }
            }
        }

        /// <summary>
        /// This is for the paste tab.
        /// </summary>
        private void PasteEdit_Click(object sender, EventArgs e)
        {

            if (tabAudio.IsSelected)
            {
                textNotes.Paste();
                statusState.Content = "Audio text pasted!";
            }
            if (textTab.IsSelected)
            {
                textEntry.Paste();
                statusState.Content = "Text's text pasted!";
            }
            if (drawTab.IsSelected)
            {
                MessageBox.Show("This doesnt work but i was tried to and it didnt work </3 ");
            }
        
        }


        /// <summary>
        /// This is for the select tab.
        /// </summary>
        private void SelectEdit_Click(object sender, EventArgs e)
        {
            if (tabAudio.IsSelected)
            {
                textNotes.SelectAll();
                statusState.Content = "Audio text all selected!";
            }
            if (textTab.IsSelected)
            {
                textEntry.SelectAll();
                statusState.Content = "Text's text all selected!";
            }
            if (drawTab.IsSelected)
            {
                MessageBox.Show("This doesnt work but i was tried to and it didnt work </3 ");
            }
        }

        /// <summary>
        /// This is for the delete tab.
        /// </summary>
        private void DeleteEdit_Click(object sender, EventArgs e)
        {
            if (tabAudio.IsSelected)
            {
                textNotes.Clear();
                statusState.Content = "Audio text all deleted!";
            }
            if (textTab.IsSelected)
            {
                textEntry.Clear();
                statusState.Content = "Text's text all deleted!";
            }
            if (drawTab.IsSelected)
            {
                canvasDraw.Children.Clear();
                statusState.Content = "Drawing all deleted!";
            }
        }

        /// <summary>
        /// Help tab stuff.
        /// </summary>

        // About help.
        private void AboutHelp_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Hello! Welcome to Multi Muse! This is an application for expressing your (daily) creativity and logging the progression over time. You can record audio, practice your writing, and even draw!" , "About Multi Muse");
            statusState.Content = "Someone clicked the about tab. Hopefully you know more now.";
        }
        // How help.
        private void HowHelp_Click(object sender, EventArgs e)
        {
            MessageBox.Show("To Use the Record Function:\n\nStart by either entering the mood/quality and notes or begin your audio recording! After You can review it, delete or even save your masterpiece.\n\nTo use the text function: Here you can start with either your quality/mood traker or begin writing away. You can also save and delete!\n\nTo use the drawing function: You can enter in your quality/mood tracker and proceed. Once you click the 'Draw' button it allows you to mark up the canvas, there is also an erase button in case of mistakes!\n\n\n I hope you have fun in Multi Muse!", "How to use Multi Muse");
            statusState.Content = "I hope that helped!";
        }



        // End of the menu tab.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /// <summary>
        /// This is the open function for the XML and Json files.
        /// </summary>

        // Open file dialog to let the user choose a file to load
        private void OpenFile_Click(object sender, RoutedEventArgs e)
        {
            // Step 1: Ask the user if they want to open a specific file
            MessageBoxResult result = MessageBox.Show(
                "Would you like to load a specific file? If not, default files will be loaded.",
                "Load Options",
                MessageBoxButton.YesNo,
                MessageBoxImage.Question);

            if (result == MessageBoxResult.Yes)
            {
                // OpenFileDialog to select a specific file
                OpenFileDialog openFileDialog = new OpenFileDialog
                {
                    Filter = "XML Files (*.xml)|*.xml|JSON Files (*.json)|*.json|All Files (*.*)|*.*"
                };

                if (openFileDialog.ShowDialog() == true)
                {
                    string selectedFilePath = openFileDialog.FileName;

                    try
                    {
                        if (selectedFilePath.EndsWith(".xml", StringComparison.OrdinalIgnoreCase))
                        {
                            entryInfoList = xmlPersistence.ReadMultiMuse(selectedFilePath); // Load XML
                        }
                        else if (selectedFilePath.EndsWith(".json", StringComparison.OrdinalIgnoreCase))
                        {
                            entryInfoList = jsonPersistence.ReadMultiMuse(selectedFilePath); // Load JSON
                        }
                        else
                        {
                            MessageBox.Show("Unsupported file type. Please select an XML or JSON file.");
                            return;
                        }

                        UpdateLogListView();
                        MessageBox.Show("Data loaded successfully!");
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show($"Error loading file: {ex.Message}");
                    }
                }
            }
            else
            {
                
                try
                {
                    entryInfoList = logData.LoadEntries(); // Load predefined paths
                    UpdateLogListView();
                    MessageBox.Show("Default files loaded successfully!");
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Error loading default files: {ex.Message}", "Load Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }

        /// <summary>
        /// This is the save function for the XML and Json files.
        /// </summary>
        private void SaveAs_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                logData.SaveEntries(entryInfoList);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error during save operation: {ex.Message}", "Save Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// This is the load function for the XML and Json files. It loads the file you click into the list view.
        /// </summary>
        private void LoadButton_Click(object sender, RoutedEventArgs e)
        {
            // Load entries from the file into entryInfoList.
            entryInfoList = logData.LoadEntries();

            // If entries exist, populate the LogListView.
            if (entryInfoList.Count > 0)
            {
                UpdateLogListView();
                MessageBox.Show("Entries loaded successfully!", "Load Complete", MessageBoxButton.OK);
                statusState.Content = "Loaded a entry!";
            }
            else
            {
                MessageBox.Show("No entries found in the file.", "Load Error", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }

        /// <summary>
        /// This is the edit function for the XML and Json files. It allows you to edit the file you load then click.
        /// </summary>
        private void EditButton_Click(object sender, RoutedEventArgs e)
        {
            // Ensure an entry is selected
            if (LogListView.SelectedItem is LogEntry selectedEntry)
            {
                // Check the type of the selected entry and populate the UI.
                if (selectedEntry is TextLogEntry textEntry)
                {
                    if (textTab.IsSelected)
                    {
                        // Populate the Text tab fields
                        //tabControl.SelectedItem = textTab; // Ensure the Text tab is visible
                        comboWellnessSliderText.SelectedIndex = textEntry.Wellness - 1;
                        comboQualitySliderText.SelectedIndex = textEntry.Quality - 1;
                        textEntry.Text = textEntry.Text; 
                    }
                }
                else if (selectedEntry is DrawingLogEntry drawingEntry)
                {
                    if (drawTab.IsSelected)
                    {
                        // Populate the Drawing tab fields
                        //tabControl.SelectedItem = textTab; // Ensure the Drawing tab is visible
                        comboWellnessSliderDraw.SelectedIndex = drawingEntry.Wellness - 1;
                        comboQualitySliderDraw.SelectedIndex = drawingEntry.Quality - 1;
                    }

                }
                else if (selectedEntry is AudioLogEntry audioEntry)
                {
                    if (tabAudio.IsSelected)
                    {
                        // Populate the Audio tab fields
                        //tabControl.SelectedItem = tabAudio; // Ensure the Audio tab is visible
                        comboWellnessSliderAudio.SelectedIndex = audioEntry.Wellness - 1;
                        comboQualitySliderAudio.SelectedIndex = audioEntry.Quality - 1;
                        textNotes.Text = audioEntry.Notes;

                        // Store the currentRecording.
                        currentRecording = audioEntry.RecordingFile;
                    }

                }

                // Notify the user.
                MessageBox.Show("Modify the fields and click Save to update the entry.", "Edit Mode", MessageBoxButton.OK);
                statusState.Content = "User is ready to edit. Click the entry and change it in the correct tab.";
            }
            else
            {
                MessageBox.Show("Please select an entry to edit.", "No Entry Selected", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }

        /// <summary>
        /// This is the delete function for the XML and Json files. It deals with the deletion of the loaded/currently saved files entries.
        /// </summary>
        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            {
                // Ensure an entry is selected
                if (LogListView.SelectedItem is LogEntry selectedEntry)
                {
                    // Confirm with the user before deletion
                    MessageBoxResult result = MessageBox.Show("Are you sure you want to delete this entry?", "Confirm Delete", MessageBoxButton.YesNo, MessageBoxImage.Warning);

                    // If the user clicks "Yes", proceed with deletion
                    if (result == MessageBoxResult.Yes)
                    {
                        // Remove the selected entry from the data source
                        entryInfoList.Remove(selectedEntry);

                        // Remove the selected entry from the LogListView
                        LogListView.Items.Remove(selectedEntry);

                        statusState.Content = "Entry deleted successfully.";
                    }
                }
                else
                {
                    MessageBox.Show("Please select an entry to delete.", "No Entry Selected", MessageBoxButton.OK, MessageBoxImage.Warning);
                }
            }
        }

        /// <summary>
        /// This is the save function for the XML and Json files.This is diffrent, this is the actual button and not the menu tab drop down thingy.
        /// </summary>
        private void SaveButtonList_Click(object sender, RoutedEventArgs e)
        {
            SaveEntriesToFile();

            // Notify the user that the save was successful
            MessageBox.Show("All changes have been saved successfully.", "Save Complete", MessageBoxButton.OK);
            statusState.Content = "List saved!! WOWWWWWWWWW";
        }


        /// <summary>
        /// This is the update function for the XML and Json files.It update the view.
        /// </summary>
        private void UpdateLogListView()
        {
            LogListView.Items.Clear();
            foreach (var entry in entryInfoList)
            {
                LogListView.Items.Add(entry);
            }
        }



        // End of the XML and JSON stuff.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        /// <summary>
        /// The list of status's.
        /// Unsure about all of this... I think I need a function for all of these to be in but idk how to do that but I probably wont.
        /// </summary>
        private void StatusBar(object sender, RoutedEventArgs e)
        {
            statusState.Content = $"{DateTime.Now}: ";
        }

        private void ComboWellnessSlider_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            statusState.Content = "User entered in how they feel currently!";
        }

        private void ComboQualitySlider_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            statusState.Content = "User entered in the quality of their preformance.";
        }

        private void TextNotes_TextChanged(object sender, TextChangedEventArgs e)
        {
            statusState.Content = "User entered in their notes regarding the audio.";
        }

        private void EraseDrawing_Click(object sender, RoutedEventArgs e)
        {
            // Toggle eraser mode.
            isErasing = !isErasing; 
            if (isErasing)
            {
                statusState.Content = "Eraser activated! Drag on the canvas to erase.";
            }
            else
            {
                statusState.Content = "Eraser deactivated!";
            }
        }

    }
}

// End of the status tab.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


