// ThePizzaPiMachine
// Author: Alyssa Bhagwandin
// Created: September 18th, 2024
// Modified: September 20th, 2024

using System.Linq.Expressions;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using static System.Net.Mime.MediaTypeNames;

// The name of the program.
namespace ThePizzaPiMachine
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        // Declarations

        // Pizza size ranges.
        const double MinimumRange = 6;
        const double SecondRange = 8;
        const double ThirdRange = 12;
        const double FourthRange = 14;
        const double FifthRange = 16;
        const double SixthRange = 20;
        const double MaximumRange = 36;

        // Pizza slices. 
        const int MinimumRangeAmount = 4;
        const int SecondRangeAmount = 6;
        const int ThirdRangeAmount = 8;
        const int FourthRangeAmount = 10;
        const int FifthRangeAmount = 12;
        const int MaximumRangeAmount = 16;

        public MainWindow()
        {
            InitializeComponent();

            // Sets focus to the text box that the users must enter data.
            userEntry.Focus();

        }

        // The function for the calculate button.
        private void calculateButton_Click(object sender, RoutedEventArgs e)
        {

            if (double.TryParse(userEntry.Text, out double diameter))
            {
                if (diameter >= MinimumRange && diameter <= MaximumRange)
                {
                    int slices = CalculatedSlices(diameter);
                    double area = CalculateArea(diameter, slices);
                    numberOfSlices.Content = $" A pizza that is {diameter}\"  is cut into {slices} slices.";
                    areaOfPizza.Content = $" Each slice has an area of {area:F2}\" squared.";
                }
                else
                {
                    MessageBox.Show("ERROR: Diameter must be between " + Convert.ToString(SecondRangeAmount) + " and " + Convert.ToString(MaximumRange)  + " inches." , "ERROR!" );
                }
            }
            else
            {
                MessageBox.Show("ERROR: Please enter a numeric diameter.", "ERROR!");
            }
        }

        // Determine the amount slices dependent on the users input.
        private int CalculatedSlices(double diameter)
        {
            if (diameter < SecondRange)
            {
                return MinimumRangeAmount;
            }
            else if (diameter < ThirdRange)
            {
                return SecondRangeAmount;
            }
            else if (diameter < FourthRange)
            {
                return ThirdRangeAmount;
            }
            else if (FourthRange < FifthRange)
            {
                return FourthRangeAmount;
            }
            else if (diameter < SixthRange) 
            {
                return FifthRangeAmount;
            }
            else 
            {
                return MaximumRangeAmount; 
            }
        }

        // Area calculation (using the area formula).
        private double CalculateArea(double diameter, int slices)
        {
            double radius = diameter / 2;
            return (Math.PI * radius * radius) / slices;
        }

        // Close the application function.
        private void exitButton_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }

        // Reset the application function.
        private void clearButton_Click(object sender, RoutedEventArgs e)
        {
            userEntry.Clear();
            numberOfSlices.Content = "Number of slices: ";
            areaOfPizza.Content = "Area of the pizza: ";    
        }
    }
}