<?php
include 'db.php'; // connect to database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    $mobile = trim($_POST['mobile']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm-password'];

    // Basic validation
    if (empty($email) || empty($mobile) || empty($password) || empty($confirm_password)) {
        die("All fields are required.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format.");
    }

    if ($password !== $confirm_password) {
        die("Passwords do not match.");
    }

    if (strlen($password) < 8) {
        die("Password must be at least 8 characters long.");
    }

    // Hash password before storing
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert into DB (prepared statement)
    $stmt = $conn->prepare("INSERT INTO users (email, mobile, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $mobile, $hashed_password);

    if ($stmt->execute()) {
        echo "Sign up successful! 🎉";
        header("Location: index.html");

    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
