// TicTacToe
// Author: Alyssa Bhagwandin
// Created: October 4th, 2024
// Modified: October 12th, 2024


// METHODS SHOULD BE IN PASCAL. 

// Description: A WPF application tic-tac-toe game.

using System.Reflection.Emit;
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
using static System.Formats.Asn1.AsnWriter;

namespace TicTacToe
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        // Initailize all variable to set the board up for a game.

        // Keep track of turns.
        private bool isplayerOneTurn = true;
        // Declaring the array.
        private Button[,] gameArea;
        // The maxiimum amount of turns that can be played with in one game.
        const int MaximumTurns = 9;
        // Keeps track of the number of turns.
        private int turnNumber;
        // Score variables.
        private int xScore = 0;
        private int oScore = 0;
        private int tieScore = 0;
        // An array that will save the players.
        private string[] players = { "", "" };


        public MainWindow()
        {
            InitializeComponent();
            // Shows who plays.
            displayCurrentPlayer();
            turnNumber = 0;
            // Makes sure the scores are empty.
            xScoreLabel.Content = string.Empty;
            oScoreLabel.Content = string.Empty;
            tieScoreLabel.Content = string.Empty;

            // Initializing the buttons for all the arrays.
            gameArea = new Button[3, 3]
            {
                {buttonRow0Coloumn0, buttonRow0Coloumn1, buttonRow0Coloumn2},
                {buttonRow1Coloumn0, buttonRow1Coloumn1, buttonRow1Coloumn2},
                {buttonRow2Coloumn0, buttonRow2Coloumn1, buttonRow2Coloumn2}
            };
            // Disable the board so they MUST enter players names first.
            disableBoard();
        }

        // When the buttons are clicked, assign a value to them (X or O).
        private void clickedBoard(object sender, RoutedEventArgs e)
        {
            Button buttonClicked = (Button)sender;

            if (isplayerOneTurn)
            {
                buttonClicked.Content = "X";
                buttonClicked.IsEnabled = false;
            }
            else
            {
                buttonClicked.Content = "O";
                buttonClicked.IsEnabled = false;
            }

            // Adds the amount of turns after each entry.
            turnNumber++;
            // Checks the arrays to see if there is a winner yet. 
            bool winner = checkForWinner();


            // If there is a winner, it displays the messages. 
            if (winner == true)
            {
                string winningPlayer = isplayerOneTurn ? players[0] : players[1];
                MessageBox.Show($"Hoorrrrrrray {winningPlayer} YOU WIN!", "Winner!");
                updateScore();
                resetBoard();
               
            }
            else if (turnNumber >= MaximumTurns)
            {
                MessageBox.Show("It's a tie!", "Cat Scratch");
                tieScoreLabel.Content = $"{++tieScore}";
                resetBoard();
            }
            else
            {
                isplayerOneTurn = !isplayerOneTurn;
                displayCurrentPlayer();
            }
        }

        // Flips between whos playing currently.
        private void displayCurrentPlayer()
        {
            if (isplayerOneTurn)
            {
                currentlyPlayingLabel.Content = "Currently Playing: " + players[0];
            }
            else
            {
                currentlyPlayingLabel.Content = "Currently Playing: " + players[1];
            }
        }

        // Updates the scores of who wins.
        private void updateScore()
        {
            if (isplayerOneTurn == true)
            { 
                xScore++;
            }
            else
            {
                oScore++;
            }

            xScoreLabel.Content = $"{xScore}";
            oScoreLabel.Content = $"{oScore}";
            
        }

        // This checks for the winner, and it displays a colour on the line that has won.
        private bool checkForWinner()
        {
            // Coloumn Comparisons.
            if ((gameArea[0, 0].Content == gameArea[1, 0].Content) && (gameArea[1, 0].Content == gameArea[2, 0].Content) && (gameArea[0, 0].Content != ""))
            {
                highlightWinner(gameArea[0, 0]);
                highlightWinner(gameArea[1, 0]);
                highlightWinner(gameArea[2, 0]);
                return true;
            }
            else if ((gameArea[0, 1].Content == gameArea[1, 1].Content) && (gameArea[1, 1].Content == gameArea[2, 1].Content) && (gameArea[0, 1].Content != ""))
            {
                highlightWinner(gameArea[0, 1]);
                highlightWinner(gameArea[1, 1]);
                highlightWinner(gameArea[2, 1]);
                return true;
            }

            else if ((gameArea[0, 2].Content == gameArea[1, 2].Content) && (gameArea[1, 2].Content == gameArea[2, 2].Content) && (gameArea[0, 2].Content != ""))
            {
                highlightWinner(gameArea[0, 2]);
                highlightWinner(gameArea[1, 2]);
                highlightWinner(gameArea[2, 2]);
                return true;
            }

            // Row Comparisons.
            else if ((gameArea[0, 0].Content == gameArea[0, 1].Content) && (gameArea[0, 1].Content == gameArea[0, 2].Content) && (gameArea[0, 0].Content != ""))
            {
                highlightWinner(gameArea[0, 0]);
                highlightWinner(gameArea[0, 1]);
                highlightWinner(gameArea[0, 2]);
                return true;
            }
            else if ((gameArea[1, 0].Content == gameArea[1, 1].Content) && (gameArea[1, 1].Content == gameArea[1, 2].Content) && (gameArea[1, 0].Content != ""))
            {
                highlightWinner(gameArea[1, 0]);
                highlightWinner(gameArea[1, 1]);
                highlightWinner(gameArea[1, 2]);
                return true;
            }
            else if ((gameArea[2, 0].Content == gameArea[2, 1].Content) && (gameArea[2, 1].Content == gameArea[2, 2].Content) && (gameArea[2, 0].Content != ""))
            {
                highlightWinner(gameArea[2, 0]);
                highlightWinner(gameArea[2, 1]);
                highlightWinner(gameArea[2, 2]);
                return true;
            }

            // Diagonal Comparisons.
            else if ((gameArea[0, 0].Content == gameArea[1, 1].Content) && (gameArea[1, 1].Content == gameArea[2, 2].Content) && (gameArea[0, 0].Content != ""))
            {
                highlightWinner(gameArea[0, 0]);
                highlightWinner(gameArea[1, 1]);
                highlightWinner(gameArea[2, 2]);
                return true;
            }
            else if ((gameArea[2, 0].Content == gameArea[1, 1].Content) && (gameArea[1, 1].Content == gameArea[0, 2].Content) && (gameArea[2, 0].Content != ""))
            {
                highlightWinner(gameArea[2, 0]);
                highlightWinner(gameArea[1, 1]);
                highlightWinner(gameArea[0, 2]);
                return true;
            }
            else
            {
                return false;
            }
        }

        // Resets the board.
        private void resetBoard()
        {

            turnNumber = 0;
            isplayerOneTurn = true;
            currentlyPlayingLabel.Content = ("Currently Playing: " + players[0]);
           
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    gameArea[i,j].Content = "";
                    gameArea[i,j].IsEnabled = true;
                    gameArea[i,j].Foreground = new SolidColorBrush(Colors.Gray);
                }
            }
        }

        // Disables the board.
        private void disableBoard()
        {
            //Loops through the boards.
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    gameArea[i, j].IsEnabled = false;
                }
            }
        }


        // Enable the board.
        private void enableBoard()
        {
            //Loops through the boards.
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    gameArea[i, j].IsEnabled = true;
                    gameArea[i, j].Foreground = new SolidColorBrush(Colors.Gray);
                }
            }
        }

        // Start button to make the game start once players enter their names.
        private void startButton_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(playerOneNameTextBox.Text) || string.IsNullOrWhiteSpace(playerTwoNameTextBox.Text))
            {
                MessageBox.Show("Please enter the names of both players to proceed.", "Invalid names!");
            }
            else
            {
                startButton.IsEnabled = false;
                players[0] = playerOneNameTextBox.Text;
                players[1] = playerTwoNameTextBox.Text;
                playerOneNameTextBox.IsEnabled = false;
                playerTwoNameTextBox.IsEnabled = false;
                enableBoard();
            }
        }

        // Reset the whole application.
        private void resetButton_Click(object sender, RoutedEventArgs e)
        {

            // Allow new names to be entered and put focus on entering a name.
            playerOneNameTextBox.IsEnabled = true;
            playerTwoNameTextBox.IsEnabled = true;
            // Clear all names and score.
            playerOneNameTextBox.Clear();
            playerTwoNameTextBox.Clear();
            // Reset the player names array.
            players[0] = "";
            players[1] = "";

            // Scores.
            xScore = 0;
            oScore = 0;
            tieScore = 0;
            xScoreLabel.Content = string.Empty;
            oScoreLabel.Content = string.Empty;
            tieScoreLabel.Content = string.Empty;
            // Re-enables the start button.
            startButton.IsEnabled = true;
            disableBoard();
            
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    gameArea[i, j].Content = "";
                    gameArea[i, j].Foreground = new SolidColorBrush(Colors.Gray);
                }
            }
        }

        // Highlighs the winning line function.
        private void highlightWinner(Control controlToHighlight)
        {
            controlToHighlight.Foreground = Brushes.LightGreen;
            controlToHighlight.Focus();
        }

        // Exits the application.
        private void exitButton_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}
