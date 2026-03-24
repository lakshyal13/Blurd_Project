<?php
$servername = "localhost";   // MySQL server
$username = "root";          // MySQL username (default is root)
$password = "root";              // MySQL password (set yours here)
$dbname = "user_auth";       // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
