<?php
$servername = "localhost";
$username = "root@localhost"; // Default XAMPP username is 'root'
$password = ""; // Default XAMPP has no password
$dbname = "user_registration"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO users (firstname, lastname, username, email, phonenumber, password, profile_picture_path) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $firstname, $lastname, $username, $email, $phonenumber, $hashed_password, $profile_picture_path);

// Get form data
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$username = $_POST['username'];
$email = $_POST['email'];
$phonenumber = $_POST['phonenumber'];
$password = $_POST['password'];
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Handle file upload for 'profilepicture'
if (isset($_FILES['profilepicture']) && $_FILES['profilepicture']['error'] == 0) {
    $allowed = ['jpg', 'jpeg', 'png', 'gif']; // Allowed file types
    $filename = $_FILES['profilepicture']['name'];
    $filetype = pathinfo($filename, PATHINFO_EXTENSION);

    if (in_array(strtolower($filetype), $allowed)) {
        $temp_name = $_FILES['profilepicture']['tmp_name'];
        $new_filename = uniqid() . '.' . $filetype; // Create a unique name for the file
        $folder = "uploads/"; // Ensure this folder exists and is writable

        if (move_uploaded_file($temp_name, $folder . $new_filename)) {
            $profile_picture_path = $folder . $new_filename;
        } else {
            echo "Failed to upload profile picture.";
            exit;
        }
    } else {
        echo "Invalid file type for profile picture.";
        exit;
    }
} else {
    $profile_picture_path = ""; // Default value or path to a placeholder image
}

// Execute the prepared statement
if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
