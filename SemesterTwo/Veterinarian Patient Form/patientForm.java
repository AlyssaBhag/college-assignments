/* patientForm.java
   Author: Alyssa Bhagwandin
   Created: April 10th, 2024
   Modified: April 12th, 2024
   
   Description: Creating a GUI application for a veterinarian sheet. */

package patientForm;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JLabel;
import java.awt.Font;

import javax.swing.JTextField;
import javax.swing.JSeparator;
import javax.swing.ButtonGroup;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JRadioButton;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.awt.event.ActionEvent;

public class patientForm {

	private JFrame frame;
	private JTextField patientText;
	private JTextField ownerText;
	private JTextField emailText;
	private JTextField addressText;
	private JTextField dateText;
	private JLabel messageBox;
	
	// Ensures that only one vet is selected + Buttons selected		
	private JRadioButton vetBtn1, vetBtn2;
	
	private ButtonGroup vetBtnGroup;
	
	// To find the custom icon.
	ImageIcon logo = new ImageIcon(".//res//Print.jpg");

	// Main method that runs and displays the form. 
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					patientForm window = new patientForm();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
	
	public patientForm() {
		initialize();
	}
	
	// Initialize the contents of the frame.
	private void initialize()  {
		frame = new JFrame();
		frame.setResizable(false);
		frame.setBounds(100, 100, 800, 355);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(800, 360);
		// To set the icon to 
		frame.setIconImage(logo.getImage());
		// Title.
		frame.setTitle("New Patient Record");
		// Center the frame.
		frame.setLocationRelativeTo(null);

		// Patient Name.
		JLabel patientLabel = new JLabel("Patient Name:");
		patientLabel.setFont(new Font("Baskerville Old Face", Font.PLAIN, 15));
		patientLabel.setBounds(20, 75, 154, 33);
		
		patientText = new JTextField();
		patientText.setBounds(20, 103, 234, 33);
		frame.getContentPane().add(patientText);
		patientText.setColumns(10);
		// Tool tip.
		patientText.setToolTipText("Enter your pets name here.");
		
		// Owner Name.
		JLabel ownerLable = new JLabel("Owners Name:");
		ownerLable.setFont(new Font("Baskerville Old Face", Font.PLAIN, 15));
		ownerLable.setBounds(276, 75, 129, 33);
		
		ownerText = new JTextField();
		ownerText.setColumns(10);
		ownerText.setBounds(276, 103, 234, 33);
		frame.getContentPane().add(ownerText);
		// Tool tip.
		ownerText.setToolTipText("Enter your name here.");
		
		// Email address.
		JLabel emailLabel = new JLabel("Email Address:");
		emailLabel.setFont(new Font("Baskerville Old Face", Font.PLAIN, 15));
		emailLabel.setBounds(529, 71, 94, 40);
		
		emailText = new JTextField();
		emailText.setColumns(10);
		emailText.setBounds(529, 103, 234, 33);
		frame.getContentPane().add(emailText);
		// Tool tip.
		emailText.setToolTipText("Enter a valid email address.");
		
		// Vet.
		JLabel vetLabel = new JLabel("Vet assigned to the patinet:");
		vetLabel.setFont(new Font("Baskerville Old Face", Font.PLAIN, 15));
		vetLabel.setBounds(567, 153, 169, 44);
		
		vetBtn1 = new JRadioButton("Dr.Bhagwandin");
		vetBtn1.setFont(new Font("Baskerville Old Face", Font.PLAIN, 15));
		vetBtn1.setBounds(577, 196, 119, 23);
		frame.getContentPane().add(vetBtn1);
		// Tool tip.
		vetBtn1.setToolTipText("Click on your vets name.");
		
		vetBtn2 = new JRadioButton("Dr.Cooper");
		vetBtn2.setFont(new Font("Baskerville Old Face", Font.PLAIN, 15));
		vetBtn2.setBounds(577, 222, 119, 23);
		frame.getContentPane().add(vetBtn2);
		// Tool tip.
		vetBtn2.setToolTipText("Click on your vets name.");
		
		// Button grouping to only allow one button to be clicked at one time. 
		vetBtnGroup = new ButtonGroup();
		vetBtnGroup.add(vetBtn1);
		vetBtnGroup.add(vetBtn2);
		
		// Date.
		JLabel dateLabel = new JLabel("Date:");
		dateLabel.setFont(new Font("Baskerville Old Face", Font.PLAIN, 15));
		dateLabel.setBounds(276, 153, 234, 44);
		
		dateText = new JTextField(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
		dateText.setEditable(false);
		dateText.setColumns(10);
		dateText.setBounds(276, 186, 234, 33);
		frame.getContentPane().add(dateText);
		// Tool tip.
		dateText.setToolTipText("Todays date.");
		
		// Address.
		JLabel addressLabel = new JLabel("Address:");
		addressLabel.setFont(new Font("Baskerville Old Face", Font.PLAIN, 15));
		addressLabel.setBounds(20, 159, 74, 33);
		
		addressText = new JTextField();
		addressText.setColumns(10);
		addressText.setBounds(20, 186, 234, 33);
		frame.getContentPane().add(addressText);
		// Tool tip.
		addressText.setToolTipText("Enter your address here.");
		
		//
		JLabel lblNewLabel_8 = new JLabel("New Patient Record");
		lblNewLabel_8.setBounds(285, 11, 241, 52);
		lblNewLabel_8.setFont(new Font("Baskerville Old Face", Font.PLAIN, 30));
		frame.getContentPane().setLayout(null);
		frame.getContentPane().add(patientLabel);
		frame.getContentPane().add(ownerLable);
		frame.getContentPane().add(emailLabel);
		frame.getContentPane().add(vetLabel);
		frame.getContentPane().add(dateLabel);
		frame.getContentPane().add(addressLabel);
		frame.getContentPane().add(lblNewLabel_8);

		// Decoration.
		JSeparator separator = new JSeparator();
		separator.setBounds(529, 186, 234, 8);
		frame.getContentPane().add(separator);
		
		
		// Clear button.
		JButton clearBtn = new JButton("Clear");
		clearBtn.setFont(new Font("Tahoma", Font.PLAIN, 12));
		clearBtn.setBounds(10, 11, 94, 33);
		frame.getContentPane().add(clearBtn);
		// Keyboard shortcut.
		clearBtn.setMnemonic(KeyEvent.VK_BACK_SPACE);
		// Tool tip.
		clearBtn.setToolTipText("Click here to clear the form.");
		clearBtn.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				// Called the function to clear the form.
				clearInformation();
			}
		});
		
		// Exit button.
		JButton exitBtn = new JButton("Exit");
		exitBtn.setFont(new Font("Tahoma", Font.PLAIN, 12));
		exitBtn.setBounds(680, 11, 94, 33);
		frame.getContentPane().add(exitBtn);
		// Keyboard shortcut.
		exitBtn.setMnemonic(KeyEvent.VK_ESCAPE);
		// Tool tip.
		exitBtn.setToolTipText("Click here to close the form.");
		exitBtn.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				// Closes the GUI once the button is clicked.
				frame.dispose();			
			}
		});
		
		// Register button.
		JButton registerBtn = new JButton("Register");
		registerBtn.setFont(new Font("Tahoma", Font.PLAIN, 12));
		registerBtn.setBounds(342, 277, 94, 33);
		frame.getContentPane().add(registerBtn);
		// Keyboard shortcut.
		registerBtn.setMnemonic(KeyEvent.VK_E);
		// Tool tip.
		registerBtn.setToolTipText("Click here to register the form.");
		registerBtn.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				registerPatient();
			}
		});
		
		// The message box for error and completed messages.
		messageBox = new JLabel("");
		messageBox.setFont(new Font("Baskerville Old Face", Font.PLAIN, 18));
		messageBox.setBounds(258, 235, 268, 31);
		frame.getContentPane().add(messageBox);
	}
	
	// Method to clear the form.
	private void clearInformation() {
		patientText.setText("");
		ownerText.setText("");
		emailText.setText("");
		vetBtnGroup.clearSelection();
		dateText.setText(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
		addressText.setText("");
		// Set focus back.
		patientText.requestFocus();
	}
	
	// Method register the patient.
	private void registerPatient() {
		// Get the input vlaues and validate them.
		String patientName = patientText.getText();
		String ownerName = ownerText.getText();
		String email = emailText.getText();
		String date = dateText.getText();
		String address = addressText.getText();
		String vet = "";
		if(vetBtn1.isSelected()) {
			vet = "Dr.Bhagwandin";
		} else if (vetBtn2.isSelected()) {
			vet = "Dr.Cooper";
		} else {
			messageBox.setText("Error! Please select a vet.");
			return;
		}
		
		// Validate area.
		boolean validInput = true;
		if (patientName.isEmpty()|| ownerName.isEmpty() || email.isEmpty() || address.isEmpty()) {
			messageBox.setText("Error! Please fill in all required fields.");
			validInput = false;
		} else if(!isValidEmail(email)) {
			messageBox.setText("Error! Invalid email address.");
			validInput = false;
		}
		// If input is valid, registration completes.
		if (validInput) {
			registerToDatabase(patientName, ownerName, email, vet, date, address);
		}
	}
	// Method to validate email address.
	private boolean isValidEmail(String email) {
		return email.matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");			
	}
	
	// Method to write the patients files.
	public void registerToDatabase(String patientName, String ownerName, String email, String vet, String date, String address) {
		try (BufferedWriter writer = new BufferedWriter(new FileWriter("newpatientfile.txt", true))){
			writer.write("**Patient Registration Document**");
			writer.write("     Patient Name: " + patientName + " \n");
			writer.write("Owner Name: " + ownerName + " \n");
			writer.write("Email Address: " + email + " \n");
			writer.write("Vet: " + vet + " \n");
			writer.write("Submitted Date: " + date + " \n");
			writer.write("Address: " + address + " \n");
			writer.write("---------------------------");
			messageBox.setText("Patient Registration complete");
			// Clears the form after successful registration.
			clearInformation();
			
		} catch (IOException e) {
			messageBox.setText("Error! Failed to register patient. Please try again.");

	  }	
   }	
}
	