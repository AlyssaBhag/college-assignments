   M S B A M L   `   `   `  ����D  @TicTacToe, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null%clr-namespace:TicTacToe	TicTacToe  5   	       TicTacToe.MainWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   )localclr-namespace:TicTacToe     5   	     � Title$  Tic-Tac-Toe��5   	   $	��800��6   $	��600��6*   $	��800��66   $	��600��6F    � 
ResizeMode$ NoResize=�6U    � WindowStartupLocation$ CenterScreen=�6k   .��5	      � $��0,0,0,-6q�6    � RowDefinitions 5   
   �� 5      �� 5      �� 5      �� 5      �� 5      �� 5      �� 5      �� 5       � ColumnDefinitions 5   
   �� 5      �� 5      �� 5      .+�5   
   �� -   5         ��Name$ resetButton��5      $��R_eset��6&   $��Center=�67   $��7��6T   $	��Top=�6a   $��71��6y   $	��180��6�   $��0,10,0,0q�6�   -  'System.Windows.Input.KeyboardNavigation   TabIndex$ 11��6�    � ToolTip$+ % Click this button to reset the game.��6�   6�   �� 5   
   -   5        $ 
exitButton��5      $��E_xit��6%   $��Center=�65   $��7��6R   $	��Top=�6_   $��71��6w   $	��180��6�   $��2��6�   $��0,10,0,0q�6�   $ 14��6�   $) #Click this button to exit the game.��6�   6   �� 5   
   -   5        $ startButton��5      $��_Start Game!��6&   $��Center=�6=   $��7��6Z   $	��Top=�6g   $��71��6   $	��180��6�   $��0,10,0,0q�6�   $ 13��6�   $P J Click this button to start the game once youve entered the players names!��6�   $��1��6  6/  �� 5"   
   -   5         ��Name$ 
titleLabel��5"      $��Tic-Tac-Toe��6$   $��Right=�6:   $��76��6V   $	��Top=�6b   $	��380��6z   $��Center=�6�   $��72(�6�   $��Bahnschrift Condensed)�6�   $
��Bold"�6�   $��0,-11,100,0q�6�   $��3��6  $ Welcome to Tic-Tac-Toe!��6  �� 5#   
   -   5        $ playerOneLabel��5#      $��Player 1 (X) :��6(   $��41��6A   $��
44,60,44,0q�6M   $��2��6a   $	��Top=�6r   $��24(�6�   $��5��6�   $$��Bahnschrift SemiBold Condensed)�6�   	 J� RenderTransformOrigin$	 0.619,0.445&�6�   �� 5$   
   -   5        $ playerTwoLabel��5$      $��Player 2 (O) :��6(   $��45��6A   $��
45,60,35,0q�6M   $��2��6a   $	��Top=�6r   $��24(�6�   $��2��6�   $��5��6�   $$��Bahnschrift SemiBold Condensed)�6�   �� 5%   
   -   5        $ xLabel��5%      $��X��6    $
��Left=�6,   $��60��6G   $��5��6S   $	��Top=�6`   $��32��6x   $��48(�6�   $��	12,88,0,0q�6�   $
��Bold"�6�   $��2��6�   $��1��6�   $	 0.509,0.886&�6�   $$��Bahnschrift SemiBold Condensed)�6�   �� 5&   
   -   5        $ oLabel��5&      $��O��6    $
��Left=�6,   $��60��6G   $��5��6S   $	��Top=�6`   $��34��6x   $��48(�6�   $��1��6�   $	 
5.82,0.506&�6�   $��
154,87,0,0q�6�   $
��Bold"�6�   $��2��6�   $$��Bahnschrift SemiBold Condensed)�6�   �� 5'   
   -	   5        $ tieLabel��5'      $
��Ties��6"   $��Center=�61   $��60��6N   $��5��6Z   $	��Top=�6g   $��72��6   $��48(�6�   $��1��6�   $��0,88,0,0q�6�   $
��Bold"�6�   $��2��6�   $��Bahnschrift Condensed)�6�   �� 5(   
   -
   5        $ 
scoreLabel��5(      $��Score:��6$   $��0,60,0,0q�65   $��5��6G   $��49��6T   $��92��6`   $��1��6k   $��30(�6{   $��Center=�6�   $��Center=�6�   $	��Top=�6�   $��Center=�6�   $��2��6  $$��Bahnschrift SemiBold Condensed)�6  $��Light"�6A  �� 5+   
   -   5        $ buttonRow0Coloumn0��5+      $�� ��6-   $	��139��68   $	��Top=�6E   $��35,5,0,0q�6]   $��2��6o   $��1��6�   $ 0��6�   $$��Bahnschrift SemiBold Condensed)�6�   $	��130(�6�   �� 5,   
   -   5        $ buttonRow0Coloumn1��5,      $�� ��6-   $	��139��68   $��2��6E   $	��Top=�6V   $��	18,5,17,0q�6n   $��1��6�   $��1��6�   $ 1��6�   $$��Bahnschrift SemiBold Condensed)�6�   $	��130(�6�   �� 5-   
   -   5        $ buttonRow0Coloumn2��5-      $�� ��6-   $	��139��68   $��2��6E   $	��Top=�6V   $��0,5,35,0q�6n   $��2��6�   $��1��6�   $ 2��6�   $$��Bahnschrift SemiBold Condensed)�6�   $	��130(�6�   �� 5.   
   -   5        $ buttonRow1Coloumn0��5.      $�� ��6-   $��2��68   $��2��6I   $��	35,58,0,0q�6V   $ 3��6i   $$��Bahnschrift SemiBold Condensed)�6�   $	��130(�6�   �� 5/   
   -   5        $ buttonRow1Coloumn1��5/      $�� ��6-   $��2��68   $��2��6I   $��
18,58,17,0q�6V   $��1��6j   $ 4��6z   $$��Bahnschrift SemiBold Condensed)�6�   $	��130(�6�   �� 50   
   -   5        $ buttonRow1Coloumn2��50      $�� ��6-   $��2��68   $��2��6I   $��	0,58,35,0q�6V   $��2��6i   $ 5��6y   $$��Bahnschrift SemiBold Condensed)�6�   $	��130(�6�   �� 51   
   -   5        $ buttonRow2Coloumn0��51      $�� ��6-   $	��139��68   $��2��6E   $��4��6V   $	��Top=�6c   $��35,9,0,0q�6{   $ 6��6�   $$��Bahnschrift SemiBold Condensed)�6�   $	��130(�6�   �� 52   
   -   5        $ buttonRow2Coloumn1��52      $�� ��6-   $	��139��68   $��2��6E   $��4��6V   $	��Top=�6c   $��
18,10,18,0q�6{   $��1��6�   $ 7��6�   $$��Bahnschrift SemiBold Condensed)�6�   $	��130(�6   �� 53   
   -   5        $ buttonRow2Coloumn2��53      $�� ��6-   $	��139��68   $��2��6E   $��4��6V   $	��Top=�6c   $��0,9,35,0q�6{   $��2��6�   $ 8��6�   $$��Bahnschrift SemiBold Condensed)�6�   $	��130(�6�   �� 56   
   -   5        $ oScoreLabel��56      $��6��6%   $��1��62   $$��Bahnschrift SemiBold Condensed)�6C   $* $Player 2's (O) Score will show here.��6o   $��22(�6�   $
��Left=�6�   $	��Top=�6�   $��40��6�   $��48��6�   $��
147,52,0,0q�6�   $	 0.625,0.538&�6
  �� 57   
   -   5        $ tieScoreLabel��57      $
��Left=�6'   $��6��6B   $��52��6P   $��1��6[   $	 0.565,0.118&�6l   $$��Bahnschrift SemiBold Condensed)�6�   $- 'The tied scores will be displayed here.��6�   $��22(�6�   $	��Top=�6�   $��48��6  $��	74,49,0,0q�6   �� 58   
   -   5        $ xScoreLabel��58      $��6��6%   $	 0.565,0.118&�62   $$��Bahnschrift SemiBold Condensed)�6V   $* $Player 1's (X) Score will show here.��6�   $��22(�6�   $
��Left=�6�   $	��Top=�6�   $��43��6�   $��46��6�   $��1��6	  $��	18,51,0,0q�6  �� 5;   
   -   5        
 ��Name$
 playerOneNameTextBox��5;      $��Center=�60   $��47��6M   $��0,2,0,0q�6Y   $��6��6j   $�� ��6w   $	��Top=�6   $	��180��6�   $ 9��6�   $$��Bahnschrift SemiBold Condensed)�6�   $7 1Player 1's (X) name will writen and display here.��6�   $��30(�6+  $��Center=�69  �� 5<   
   -   5        $
 playerTwoNameTextBox��5<      $��Center=�60   $��47��6M   $��0,3,0,0q�6Y   $��6��6j   $�� ��6w   $	��Top=�6   $	��178��6�   $��2��6�   $ 10��6�   $$��Bahnschrift SemiBold Condensed)�6�   $7 1Player 2's (O) name will writen and display here.��6   $��30(�6<  �� 5=   
   -   5        $ currentlyPlayingLabel��5=      $��Currently Playing: ��6/   $
��Left=�6M   $��36��6h   $��
124,65,0,0q�6t   $	��Top=�6�   $	��372��6�   $$��Bahnschrift SemiBold Condensed)�6�   $��22(�6�   $��2��6�   $	 0.5,0.5&�6�   $> 8Here will display the player who's turn it is currently.��6  $��3��6Z  $��Center=�6n  5?      5@      