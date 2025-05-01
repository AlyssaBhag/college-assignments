// Author: Alyssa Bhagwandin
// Created: November 19th, 2024
// Updated: November 22nd, 2024
// Description: This is a C# drawing application with WPF.

using System;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media.Imaging;
using System.Windows.Media;
using System.Windows.Shapes;
using Microsoft.Win32;
using System.Windows.Documents;
using System.Diagnostics;
using System.Windows.Ink;
using System.Collections.Generic;

namespace SketchLabs
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        // Variable to store the copied shape, can be a custom class or object
        private UIElement copiedElement = null;
        

        // Decalring stuff for the drawing application mostly given by Kyle Chapman.
        private bool isDrawing;
        private bool isErasing;
        private Point previousPoint;
        // This is the default starting point.
        private Brush colour = Brushes.Black;
        private int thickness = 2;

        private List<Line> selectedLines = new List<Line>();

        public MainWindow()
        {
            InitializeComponent();

    }

        // ---------------------------------------------------------------------------------------------------------------

        /// <summary>
        /// Alot of this code is the same as the code from my drawing function in my "learning log" appliation called "EchoJournal" with just minor changes.
        /// Some of this is taken from Kyle Chapman's github.
        /// </summary>


        /// <summary>
        /// Sets it up for "starting" the drawing.
        /// </summary>



        /// <summary>
        /// Handle the "Erase" button click.
        /// </summary>
        private void StartErasing_Click(object sender, RoutedEventArgs e)
        {
            // Disable drawing mode.
            isDrawing = false;
            // Set the mode to erasing.
            isErasing = true;
            statusState.Content = "Oops you made a mistake :(    Hover your mouse over where you want to erase!";
        }

        /// <summary>
        /// Allows for the drawing to start at the location of the cursor.
        /// </summary>
        private void BeginDrawing(object sender, MouseButtonEventArgs e)
        {
            isDrawing = true;
            previousPoint = e.GetPosition(canvasDraw); // Get starting point
            statusState.Content = "Lets Start Drawing!";
        }

        /// <summary>
        /// Stops the pen from contiuning.
        /// </summary>
        private void EndDrawing(object sender, MouseButtonEventArgs e)
        {
            isDrawing = false;
            isErasing = false;
        }

        /// <summary>
        /// When the mouse moves on the canvas, if the left mouse button is depressed, draw based on current settings.
        /// Handle mouse movement on the canvas.
        /// </summary>
        private void MouseOnCanvas(object sender, MouseEventArgs e)
        {
            if (isDrawing && e.LeftButton == MouseButtonState.Pressed)
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
            else if (isErasing)
            {
                Point erasePoint = e.GetPosition(canvasDraw);
                EraseAtPoint(erasePoint);
            }
            else
            {
                foreach (UIElement element in canvasDraw.Children)
                {
                    if (element is Line line)
                    {
                        selectedLines.Add(line); // Add to selected lines
                        line.Stroke = Brushes.Red; // Change the color to indicate selection
                    }
                }
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
            const double tolerance = 10.0;
            // Calculate the distance between the point and line segemnt.
            double distance = PointToLineDistance(point, new Point(line.X1, line.Y1), new Point(line.X2, line.Y2));
            double distanceToEnd = PointToLineDistance(point, new Point(line.X2, line.Y2), new Point(line.X1, line.Y1));
            // Return true if the distance is within tolerance.
            return distance <= tolerance || distanceToEnd <= tolerance;
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

        // End of the logic for the drawing.
        // ---------------------------------------------------------------------------------------------------------------

        /// <summary>
        /// The file tab stuff.
        /// </summary>


        /// <summary>
        /// The new file function.
        /// </summary>
        private void NewFile_Click(object sender, EventArgs e)
        {
            // Clear the canvas (remove any drawn content).
            canvasDraw.Children.Clear();
            statusState.Content = "New file made successfully!";
        }

        /// <summary>
        /// The open file function.
        /// </summary>
        private void OpenFile_Click(object sender, EventArgs e)
        {
            // Create an OpenFileDialog to select a file.
            OpenFileDialog openWindow = new OpenFileDialog();
            openWindow.Title = "Open";
            openWindow.Filter = "PNG Files (*.png)|*.png|JPEG Files (*.jpg;*.jpeg)|*.jpg;*.jpeg";  // Allow PNG and JPEG files.

            // Show the open file dialog and check if the user clicked 'Open'.
            if (openWindow.ShowDialog() == true)
            {
                // Get the file name without the path.
                string fileName = System.IO.Path.GetFileName(openWindow.FileName);

                // Check the file extension to determine how to open the file.
                string extension = System.IO.Path.GetExtension(openWindow.FileName).ToLower();

                if (extension == ".png" || extension == ".jpg" || extension == ".jpeg")
                {
                    // If it's an image file (PNG or JPEG), display it on the Canvas.
                    BitmapImage bitmapImage = new BitmapImage(new Uri(openWindow.FileName));
                    Image image = new Image();
                    image.Source = bitmapImage;

                    // Clear previous content on the canvas.
                    canvasDraw.Children.Clear();

                    // Add the image to the canvas.
                    canvasDraw.Children.Add(image);
                }

                // Update the window title with the file name (without the full path).
                this.Title = fileName;
            }
            statusState.Content = "File Opened!";
        }

        /// <summary>
        /// The save file function.
        /// </summary>
        // https://github.com/KyleChapman/CoscPaint/blob/master/MainWindow.xaml.cs
        private void SaveFile_Click(object sender, EventArgs e)
        {
            // Create a SaveFileDialog to specify the location and file name.
            SaveFileDialog saveWindow = new SaveFileDialog();
            saveWindow.Title = "Save";
            saveWindow.Filter = "PNG Files (*.png)|*.png|JPEG Files (*.jpg;*.jpeg)|*.jpg;*.jpeg";

            // Show the dialog and check if the user clicked 'Save'.
            if (saveWindow.ShowDialog() == true)
            {
                // Create a RenderTargetBitmap to capture the Canvas.
                RenderTargetBitmap renderTargetBitmap = new RenderTargetBitmap(
                    (int)canvasDraw.ActualWidth,
                    (int)canvasDraw.ActualHeight,
                    96, 96, PixelFormats.Pbgra32);

                // Render the Canvas to the RenderTargetBitmap.
                renderTargetBitmap.Render(canvasDraw);

                // Create a PngBitmapEncoder to save the image as PNG.
                PngBitmapEncoder encoder = new PngBitmapEncoder();
                encoder.Frames.Add(BitmapFrame.Create(renderTargetBitmap));

                // Create a stream to write the file.
                using (FileStream fileStream = new FileStream(saveWindow.FileName, FileMode.Create))
                {
                    encoder.Save(fileStream);
                }

                // Updates the window title with the file name.
                string fileName = System.IO.Path.GetFileName(saveWindow.FileName);
                this.Title = fileName;
            }
            statusState.Content = "File successfully Saved!";
        }

        /// <summary>
        /// This deals with the exit function.
        /// </summary>
        private void ExitFile_Click(Object sender, EventArgs e)
        {
            if (MessageBox.Show("Do you want to exit?", "Exit?",
                MessageBoxButton.YesNo) == MessageBoxResult.Yes)
            {
                Application.Current.Shutdown();
            }
            statusState.Content = "Why'd you press no Kyle...This is kinda awkward now.... please leave.";
        }


        // End of the logic for the file functions.
        // ---------------------------------------------------------------------------------------------------------------

        /// <summary>
        /// These are the functions for the edit menu.
        /// </summary>


        // <summary>
        /// The cut function.
        /// </summary>
        private void CutEdit_Click(object sender, EventArgs e)
        {
            if (canvasDraw.Children.Count > 0) 
            {
                copiedElement = canvasDraw.Children[0]; 
                canvasDraw.Children.Remove(copiedElement);
                statusState.Content = "Cut successful";
            }
        }

        // <summary>
        /// The copy function.
        /// </summary>
        private void CopyEdit_Click(object sender, EventArgs e)
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

        // <summary>
        /// The paste function.
        /// Paste the copied element back onto the canvas.
        /// </summary>
        private void PasteEdit_Click(object sender, EventArgs e)
        {
            if (Clipboard.ContainsImage())
            {
                // Get the image from the clipboard
                BitmapSource image = Clipboard.GetImage();

                if (image != null)
                {
                    // Create an Image element to display the pasted content
                    Image pastedImage = new Image
                    {
                        Source = image,
                        Width = image.PixelWidth,
                        Height = image.PixelHeight
                    };

                    // Add the image to the canvas
                    canvasDraw.Children.Add(pastedImage);
                    statusState.Content = "Pasted from clipboard!";
                }
            }
            else
            {
                statusState.Content = "No image was found in the clipboard :(";
            }



        }

        // <summary>
        /// The select function.
        /// Select all elements on the canvas by adding a border.
        /// </summary>
        private void SelectEdit_Click(object sender, EventArgs e)
        {
            //foreach (UIElement element in canvasDraw.Children)
            //{
            //    if (element is Shape shape)
            //    {
            //        shape.Stroke = Brushes.Blue;

            //    }
            //}
        }

        // <summary>
        /// The delete function.
        /// </summary>
        private void DeleteEdit_Click(object sender, EventArgs e)
        {
            if (canvasDraw.Children.Count > 0)
            {
                canvasDraw.Children.Clear();
                statusState.Content = "Drawing deleted successfully!";
            }
        }

        // End of the logic functions for the edit tab.
        // ---------------------------------------------------------------------------------------------------------------

        /// <summary>
        /// The functions for the help tab.
        /// </summary>


        /// <summary>
        /// The About function.
        /// </summary>
        private void AboutHelp_Click(object sender, EventArgs e)
        {
            MessageBox.Show(this, "Hallooooooo Kyle, Howre you! This is a application for drawing program I hope you enjoy, this was Alyssa Bhagwandin's drawing application! November 21st, 2024.");
            statusState.Content = "About Clicked.";
        }

        /// <summary>
        /// The How to draw function.
        /// </summary>
        private void HowHelp_Click(object sender, EventArgs e)
        {
            // The URL to open
            string url = "https://www.youtube.com/watch?v=hlnodEYZ71w";

            // Opens the default web browser with the specified URL
            Process.Start(new ProcessStartInfo(url) { UseShellExecute = true });
            statusState.Content = "Help was hopefully provided.";
        }


        // End of the logic functions for the help tab.
        // ---------------------------------------------------------------------------------------------------------------



        /// <summary>
        /// This function changes the brush type when the users it.
        /// </summary>
        private void Brush_Changed(object sender, SelectionChangedEventArgs e)
        {

            statusState.Content = "Pick a brush type.";

            MessageBox.Show("This actually doesnt work but i tried.");
            //case "Solid✏":
            //    currentBrush = null;
            //    break;

            //case "Dashed➖":
            //    // Means a line with 4(drawn) and a space of 2(empty).
            //    currentBrush = new DoubleCollection { 43, 21 };
            //    break;

            //case "Dotted⚫":
            //    // This means one pixle is drawn with 2 spaces.
            //    currentBrush = new DoubleCollection { 100, 22 };
            //    break;


            //if (brushComboBox.SelectedItem != null)
            //{
            //    brushType = "";
            //    string brushString = brushComboBox.SelectedItem.ToString();
            //    // Debug line:
            //    //MessageBox.Show($"{thicknessString} " + $"{thicknessString.Length}");
            //    //MessageBox.Show($"{thicknessString.Remove(0, 38)} " + $"{thicknessString.Length}");

            //    brushString = brushString.Remove(0, 38);

            //    if (brushString == "Dashed➖")
            //    {
            //        brushType = 1;
            //        statusState.Content = "You choose a dashed line!";
            //    }
            //    else if (brushString == "Dotted⚫")
            //    {
            //        brushType = 7;
            //        statusState.Content = "You choose a dotted line!";
            //    }
            //    else
            //    {
            //        brushType = 15;
            //        statusState.Content = "You choose a solid line!";
            //    }
            //}

        }

        /// <summary>
        /// This function changes the thickness when the users select it.
        /// </summary>
        private void ChooseThick(object sender, SelectionChangedEventArgs e)
        {
            if (thickComboBox.SelectedItem != null)
            {
                thickness = 2;
                string thicknessString = thickComboBox.SelectedItem.ToString();
                // Debug line:
                //MessageBox.Show($"{thicknessString} " + $"{thicknessString.Length}");
                //MessageBox.Show($"{thicknessString.Remove(0, 38)} " + $"{thicknessString.Length}");

                thicknessString = thicknessString.Remove(0, 38);

                if (thicknessString == "Thin 🖉")
                {
                    thickness = 1;
                    statusState.Content = "You choose thin!";
                }
                else if (thicknessString == "Medium ✎")
                {
                    thickness = 2;
                    statusState.Content = "You choose medium!";
                }
                else if (thicknessString == "Thick 🖍")
                {
                    thickness = 7;
                    statusState.Content = "You choose thick!";
                }
                else
                {
                    thickness = 15;
                    statusState.Content = "You choose extra thick!";
                }
            }
        }

        /// <summary>
        /// This function changes the colour when the users select it.
        /// </summary>
        private void Colour_Changed(object sender, SelectionChangedEventArgs e)
        {
            if (colourComboBox.SelectedItem != null)
            {

                colour = Brushes.Black;
                string colourString = colourComboBox.SelectedItem.ToString();

                //Debug line:
                //MessageBox.Show($"{colourString} " + $"{colourString.Length}");
                //MessageBox.Show($"{colourString.Remove(0, 38)} " + $"{colourString.Length}");


                colourString = colourString.Remove(0, 38);

                if (colourString == "❤️ Red")
                {
                    colour = Brushes.Red;
                    statusState.Content = "";
                }
                else if (colourString == "💜 Orange")
                {
                    colour = Brushes.Orange;
                    statusState.Content = "";
                }
                else if (colourString == "💜 Yellow")
                {
                    colour = Brushes.Yellow;
                    statusState.Content = "";
                }
                else if (colourString == "💚 Green")
                {
                    colour = Brushes.Green;
                    statusState.Content = "";
                }
                else if (colourString == "💙 Blue")
                {
                    colour = Brushes.Blue;
                    statusState.Content = "";
                }
                else if (colourString == "💜 Purple")
                {
                    colour = Brushes.Purple;
                    statusState.Content = "";
                }
                else if (colourString == "💜 Pink")
                {
                    colour = Brushes.Pink;
                    statusState.Content = "";
                }
                else
                {
                    colour = Brushes.Black;
                    statusState.Content = "";
                }
            }

        }

        /// <summary>
        /// This function draws the shape when the users select it.
        /// </summary>
         
        // This ended up being way harder than I thought and it will not be apart of this submittion. Maybe ill fix it in the future.
        private void Shape_Changed(object sender, SelectionChangedEventArgs e)
        {
            statusState.Content = "Pick a shape.";
            MessageBox.Show("This actually doesnt work but i tried.");
            //System.Windows.Shapes.Rectangle rect;
            //rect = new System.Windows.Shapes.Rectangle();
            //rect.Stroke = new SolidColorBrush(Colors.Black);
            //rect.Fill = new SolidColorBrush(Colors.Black);
            //rect.Width = 200;
            //rect.Height = 200;
            //Canvas.SetLeft(rect, 0);
            //Canvas.SetTop(rect, 0);
            //canvasDraw.Children.Add(rect);
        }
    }
}
